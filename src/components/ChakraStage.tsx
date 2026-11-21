'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { WikiImage } from './WikiImage';
import { Plus, Minus, Maximize2, ShieldCheck, Flame, MapPin, Compass, ChevronLeft, ChevronRight, Copy, Check, Filter, PanelRightOpen, PanelRightClose, Atom, Zap, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { usePresentationMode } from '../context/PresentationModeContext';
import tryambakData from '../data/tryambakEvents.json';

export interface TryambakEvent {
  id: string;
  index: number;
  title: string;
  yearFormatted: string;
  numericYear: number;
  yearType: string;
  description: string;
  region: string;
  categoryCode: string;
  categoryName: string;
  categoryColor: string;
  tags: string[];
  wikiImageTitle: string;
  eraIndex: number;
  eraName: string;
  eraDesc: string;
  gitaQuote?: {
    verse: string;
    transliteration: string;
    translation: string;
    chapter: string;
    source: string;
  } | null;
  trustedSource: string;
}

interface ChakraStageProps {
  events: TryambakEvent[];
  selectedEvent: TryambakEvent;
  onSelectEvent: (event: TryambakEvent) => void;
  isLightMode: boolean;
  onTagClick?: (tag: string) => void;
  onOpenEvolution?: () => void;
}

const TAU = Math.PI * 2;
const GAP = 0.035;
const SPAN = TAU * (1 - GAP);
const ORDER = 'YCSDAPTJKWRGF';
const ROW = 54;
const ZMAX = 8;

const CAT_MAP: Record<string, [string, string]> = {
  Y: ['Itihāsa & Purāṇa tradition', '#e3b55b'],
  C: ['Civilization & archaeology', '#a8876a'],
  S: ['Scriptures & texts', '#e8913a'],
  D: ['Darśana & philosophy', '#9d93c9'],
  A: ['Ācāryas, saints & seers', '#d98591'],
  P: ['Sampradāyas & institutions', '#c9643e'],
  T: ['Temples & tīrthas', '#f0d9a8'],
  J: ['Arts, sciences & letters', '#6fb0b2'],
  K: ['Kingdoms & rulers', '#86a86c'],
  W: ['Wars, invasions & resistance', '#c0463c'],
  R: ['Reform, law & nation', '#b8b062'],
  G: ['Beyond Bhārata', '#7590c0'],
  F: ['Foretold & scheduled', '#8c8478']
};

const ERAS = tryambakData.eras as [number, string, string][];

export function ChakraStage({
  events,
  selectedEvent,
  onSelectEvent,
  isLightMode,
  onTagClick,
  onOpenEvolution,
}: ChakraStageProps) {
  const { mode: presentationMode, isCinematic, isResearch, isReading } = usePresentationMode();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [cur, setCurState] = useState<number>(selectedEvent ? selectedEvent.index : 0);
  const [zoom, setZoomState] = useState<number>(1);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; year: string; cat: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [soloCategories, setSoloCategories] = useState<Set<string>>(new Set());
  
  // Expanded side view mode: transforms the wheel into an elegant semicircle dial
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isExpandedRef = useRef<boolean>(false);
  isExpandedRef.current = isExpanded;

  // References for continuous 60fps loop and kinetic physics
  const curRef = useRef<number>(cur);
  curRef.current = cur;

  const ztRef = useRef<number>(1);
  const zoomRef = useRef<number>(1);
  const dirtyRef = useRef<boolean>(true);
  const hoverRef = useRef<number>(-1);
  const spinRef = useRef<number>(0);
  const animRef = useRef<{ step: (now: number) => void } | null>(null);
  const settleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fRef = useRef<number>(selectedEvent ? Math.max(0, events.findIndex(e => e.id === selectedEvent.id)) : 0);
  const ignoreScrollUntilRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const prevSelectedIdRef = useRef<string | null>(selectedEvent ? selectedEvent.id : null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const lastPadRef = useRef<number>(-1);

  // Dragging state
  const dragRef = useRef<{ a: number; f: number; x: number; y: number; moved: boolean } | null>(null);

  const N = events.length;

  // Precompute tag map for instant related moments calculation
  const tagIndex = useMemo(() => {
    const map = new Map<string, number[]>();
    events.forEach((ev, i) => {
      ev.tags.forEach((tag) => {
        const list = map.get(tag) || [];
        list.push(i);
        map.set(tag, list);
      });
    });
    return map;
  }, [events]);

  // Exact Tryambak related moments formula
  const relatedMoments = useMemo(() => {
    if (!events[cur]) return [];
    const e = events[cur];
    const scoreMap = new Map<number, number>();

    e.tags.forEach((tag, gi) => {
      const list = tagIndex.get(tag);
      if (!list) return;
      const weight = 3 + Math.max(0, 2 - gi) + Math.min(4, 40 / list.length);
      list.forEach((j) => {
        if (j !== cur) {
          scoreMap.set(j, (scoreMap.get(j) || 0) + weight);
        }
      });
    });

    return Array.from(scoreMap.entries())
      .map(([j, s]) => ({ index: j, score: s - Math.min(2, Math.abs(j - cur) / 400) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => events[x.index])
      .filter(Boolean)
      .sort((a, b) => a.index - b.index);
  }, [cur, events, tagIndex]);

  // Precompute eraStart indices
  const eraStart = useRef<number[]>([]).current;
  useEffect(() => {
    eraStart.length = 0;
    events.forEach((e, idx) => {
      if (eraStart[e.eraIndex] === undefined) {
        eraStart[e.eraIndex] = idx;
      }
    });
  }, [events, eraStart]);

  const TODAY = Math.max(0, events.findIndex((e) => e.numericYear >= 2024));

  // Geometry computation matching Tryambak (with Semicircle Dial support when expanded)
  const geom = useCallback((W: number, H: number, z: number, expanded: boolean = false) => {
    if (expanded) {
      // Semicircle Mode: Center placed at left boundary so the right half forms a semicircle
      const R0 = Math.max(140, Math.min(W * 0.9, (H - 40) * 0.48));
      const R = R0 * z;
      return { R, R0, X: 18, Y: H * 0.5 };
    }
    const R0 = Math.max(120, Math.min((W - 80) * 0.44, (H - 40) * 0.46));
    const R = R0 * z;
    const zf = Math.min(1, (z - 1) / 1.5);
    const px = (W * 0.5 + 0.735 * R0) * (1 - zf) + W * 0.56 * zf;
    return { R, R0, X: px - 0.735 * R, Y: H * 0.5 };
  }, []);

  const laneR = (l: number, R: number) => R * (0.5 + 0.47 * (l + 0.5) / ORDER.length);
  const ang = (i: number) => (i / Math.max(1, N)) * SPAN;

  // Stop kinetic animation
  const stopAnim = useCallback(() => {
    if (animRef.current) {
      animRef.current = null;
      if (railRef.current) railRef.current.classList.remove('anim');
    }
  }, []);

  // Update current active index with sound tick
  const setCur = useCallback((i: number, playSound: boolean = true) => {
    if (i < 0 || i >= N) return;
    if (i === curRef.current) return;
    if (playSound) {
      soundManager.tick();
    }
    curRef.current = i;
    setCurState(i);
    dirtyRef.current = true;
  }, [N]);

  // Set zoom with boundary clamp
  const setZoom = useCallback((z: number) => {
    ztRef.current = Math.max(1, Math.min(ZMAX, z));
    dirtyRef.current = true;
  }, []);

  // Kinetic smooth scrolling function (matching Tryambak 'go')
  const go = useCallback((i: number, instant: boolean = false) => {
    stopAnim();
    const targetIdx = Math.max(0, Math.min(N - 1, i));
    const fromF = fRef.current;
    const diff = Math.abs(targetIdx - fromF);

    if (instant || diff < 0.04) {
      fRef.current = targetIdx;
      isProgrammaticScrollRef.current = true;
      ignoreScrollUntilRef.current = performance.now() + 600;
      if (railRef.current) {
        railRef.current.scrollTop = targetIdx * ROW;
      }
      setCur(targetIdx, false);
      if (events[targetIdx] && events[targetIdx].id !== selectedEvent?.id) {
        prevSelectedIdRef.current = events[targetIdx].id;
        onSelectEvent(events[targetIdx]);
      }
      dirtyRef.current = true;
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 600);
      return;
    }

    const dur = Math.min(1200, 260 + Math.sqrt(diff * ROW) * 6);
    const t0 = performance.now();
    isProgrammaticScrollRef.current = true;
    ignoreScrollUntilRef.current = t0 + dur + 600;
    if (railRef.current) railRef.current.classList.add('anim');

    animRef.current = {
      step(now: number) {
        const k = Math.min(1, (now - t0) / dur);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        fRef.current = fromF + (targetIdx - fromF) * e;
        if (railRef.current) {
          railRef.current.scrollTop = fRef.current * ROW;
        }
        dirtyRef.current = true;

        if (k >= 1) {
          animRef.current = null;
          fRef.current = targetIdx;
          ignoreScrollUntilRef.current = performance.now() + 600;
          if (railRef.current) {
            railRef.current.classList.remove('anim');
            railRef.current.scrollTop = targetIdx * ROW;
          }
          setCur(targetIdx, true);
          prevSelectedIdRef.current = events[targetIdx]?.id || null;
          if (events[targetIdx] && events[targetIdx].id !== selectedEvent?.id) {
            onSelectEvent(events[targetIdx]);
          }
          setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, 600);
        }
      }
    };
  }, [N, events, selectedEvent?.id, onSelectEvent, setCur, stopAnim]);

  // Update rail list vertical padding to keep active item vertically centered
  const pad = useCallback(() => {
    const rail = railRef.current;
    const list = listRef.current;
    if (!rail || !list) return;
    const p = Math.max(0, Math.round(rail.clientHeight / 2 - ROW / 2));
    if (p !== lastPadRef.current) {
      lastPadRef.current = p;
      ignoreScrollUntilRef.current = performance.now() + 300;
      list.style.padding = `${p}px 0`;
      rail.scrollTop = fRef.current * ROW;
    }
  }, []);

  // Synchronize when external selectedEvent changes (ignoring echo updates from internal scrolling)
  useEffect(() => {
    if (!selectedEvent) return;
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollTop = 0;
    }
    if (selectedEvent.id === prevSelectedIdRef.current) return;
    prevSelectedIdRef.current = selectedEvent.id;

    const targetIdx = events.findIndex(e => e.id === selectedEvent.id);
    if (targetIdx !== -1 && targetIdx !== curRef.current) {
      go(targetIdx);
    }
  }, [selectedEvent?.id, events, go]);

  // Handle stage and canvas resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const handleResize = () => {
      const b = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(b.width);
      const h = Math.round(b.height);
      if (w > 0 && h > 0) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      pad();
      dirtyRef.current = true;
    };

    handleResize();
    let n = 0;
    const iv = setInterval(() => {
      handleResize();
      dirtyRef.current = true;
      if (++n > 25) clearInterval(iv);
    }, 50);

    const observer = new ResizeObserver(handleResize);
    observer.observe(stage);
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(iv);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [pad, isExpanded]);

  // Hit testing for wheel dots
  const hitTest = useCallback((mx: number, my: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const { R, X, Y } = geom(W, H, zoomRef.current, isExpandedRef.current);
    const dx = mx - X;
    const dy = my - Y;
    const rr = Math.hypot(dx, dy);

    if (rr > R + 14 || rr < R * 0.46) return -1;
    const f = fRef.current;
    const rot = -ang(f) + spinRef.current;

    let a = Math.atan2(dy, dx) - rot;
    a = ((a % TAU) + TAU) % TAU;
    if (a > SPAN) return -1;

    const ic = Math.round((a / SPAN) * N);
    let best = -1;
    let bd = 16;

    for (let j = Math.max(0, ic - 14); j <= Math.min(N - 1, ic + 14); j++) {
      const e = events[j];
      if (!e) continue;
      if (soloCategories.size > 0 && !soloCategories.has(e.categoryCode)) continue;
      const aa = ang(j) + rot;
      const lane = ORDER.indexOf(e.categoryCode);
      const r = laneR(lane >= 0 ? lane : 0, R);
      const d = Math.hypot(mx - (X + Math.cos(aa) * r), my - (Y + Math.sin(aa) * r));
      if (d < bd) {
        bd = d;
        best = j;
      }
    }
    return best;
  }, [N, events, geom, soloCategories]);

  // Continuous 60fps render loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    let startupFrames = 0;

    const render = (now: number) => {
      try {
        const stage = stageRef.current;
        if (stage && canvas) {
          const b = stage.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = Math.round(b.width);
          const h = Math.round(b.height);
          if (w > 0 && h > 0 && (canvas.width !== w * dpr || canvas.height !== h * dpr)) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            dirtyRef.current = true;
          }
        }

        if (startupFrames < 20) {
          startupFrames++;
          dirtyRef.current = true;
        }

        if (animRef.current) {
          animRef.current.step(now);
        }

        if (Math.abs(ztRef.current - zoomRef.current) > 0.002) {
          zoomRef.current += (ztRef.current - zoomRef.current) * 0.2;
          setZoomState(zoomRef.current);
          dirtyRef.current = true;
        } else {
          zoomRef.current = ztRef.current;
        }

        if (dirtyRef.current) {
          dirtyRef.current = false;

          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const W = Math.round(canvas.width / dpr) || canvas.clientWidth || 600;
          const H = Math.round(canvas.height / dpr) || canvas.clientHeight || 600;
          const { R, R0, X, Y } = geom(W, H, zoomRef.current, isExpandedRef.current);
          const f = fRef.current;
          const currentActive = curRef.current;
          const rot = -ang(f) + spinRef.current;
          const ds = Math.min(2.2, 1 + (zoomRef.current - 1) * 0.28);

          cx.setTransform(dpr, 0, 0, dpr, 0, 0);
          cx.clearRect(0, 0, W, H);

        // A. 16-Petal Sacred Lotus Core
        cx.save();
        cx.translate(X, Y);
        cx.strokeStyle = isLightMode ? 'rgba(180, 110, 30, 0.25)' : 'rgba(232, 145, 58, 0.14)';
        cx.lineWidth = 1;
        const pr = R * 0.4;
        for (let p = 0; p < 16; p++) {
          cx.rotate(TAU / 16);
          cx.beginPath();
          cx.moveTo(0, pr * 0.18);
          cx.quadraticCurveTo(pr * 0.17, pr * 0.6, 0, pr);
          cx.quadraticCurveTo(-pr * 0.17, pr * 0.6, 0, pr * 0.18);
          cx.stroke();
        }
        cx.beginPath();
        cx.arc(0, 0, pr * 1.07, 0, TAU);
        cx.stroke();
        cx.restore();

        // B. Radial Glow & Concentric Category Rings
        const gr = cx.createRadialGradient(X, Y, R * 0.2, X, Y, R * 1.15);
        gr.addColorStop(0, isLightMode ? 'rgba(232, 145, 58, 0.12)' : 'rgba(232, 145, 58, 0.08)');
        gr.addColorStop(1, 'rgba(232, 145, 58, 0)');
        cx.fillStyle = gr;
        cx.beginPath();
        cx.arc(X, Y, R * 1.15, 0, TAU);
        cx.fill();

        cx.lineWidth = 1;
        for (let l = 0; l < ORDER.length; l++) {
          const code = ORDER[l];
          const isDim = soloCategories.size > 0 && !soloCategories.has(code);
          cx.strokeStyle = isDim 
            ? 'rgba(232, 214, 180, 0.015)' 
            : (isLightMode ? 'rgba(0, 0, 0, 0.06)' : 'rgba(232, 214, 180, 0.04)');
          cx.beginPath();
          cx.arc(X, Y, laneR(l, R), 0, TAU);
          cx.stroke();
        }

        // Perimeter Outer Arc
        cx.strokeStyle = isLightMode ? 'rgba(195, 115, 30, 0.85)' : 'rgba(232, 145, 58, 0.85)';
        cx.lineWidth = 1.4;
        cx.beginPath();
        cx.arc(X, Y, R, rot, rot + SPAN);
        cx.stroke();

        // C. Era Ticks & Rotated Inscribed Labels
        cx.font = '600 10.5px Manrope, sans-serif';
        cx.textBaseline = 'middle';
        const curEra = events[currentActive]?.eraIndex ?? 0;

        for (let k = 0; k < ERAS.length; k++) {
          const s = eraStart[k];
          if (s === undefined || isNaN(s)) continue;
          const a = ang(s - 0.5) + rot;

          cx.strokeStyle = 'rgba(232, 145, 58, 0.85)';
          cx.lineWidth = 1.2;
          cx.beginPath();
          cx.moveTo(X + Math.cos(a) * R, Y + Math.sin(a) * R);
          cx.lineTo(X + Math.cos(a) * (R + 9), Y + Math.sin(a) * (R + 9));
          cx.stroke();

          let nx = N;
          for (let j = k + 1; j < ERAS.length; j++) {
            if (eraStart[j] !== undefined && !isNaN(eraStart[j])) {
              nx = eraStart[j];
              break;
            }
          }
          const am = ang((s + nx) / 2) + rot;
          if (!Number.isFinite(am) || !Number.isFinite(X) || !Number.isFinite(Y) || !Number.isFinite(R)) continue;
          const arc = ((nx - s) / N) * SPAN * R;
          const name = ERAS[k]?.[1] as string || '';
          if (!name) continue;

          if (k !== curEra && arc < cx.measureText(name).width * 1.1) continue;

          const flip = Math.cos(am) < 0;
          cx.save();
          cx.translate(X + Math.cos(am) * (R + 16), Y + Math.sin(am) * (R + 16));
          cx.rotate(am + (flip ? Math.PI : 0));
          cx.textAlign = flip ? 'right' : 'left';
          cx.fillStyle = k === curEra ? '#e8913a' : (isLightMode ? 'rgba(60, 40, 20, 0.4)' : 'rgba(181, 169, 144, 0.35)');
          cx.fillText(name, 0, 0);
          cx.restore();
        }

        // Cycle Closure Seam '↻'
        {
          const a = rot + SPAN + (TAU - SPAN) / 2;
          cx.save();
          cx.translate(X + Math.cos(a) * R, Y + Math.sin(a) * R);
          cx.rotate(a + Math.PI / 2);
          cx.fillStyle = 'rgba(232, 145, 58, 0.9)';
          cx.font = '14px serif';
          cx.textAlign = 'center';
          cx.fillText('↻', 0, 0);
          cx.restore();
        }

        // Window Coverage Arc
        const vis = railRef.current ? railRef.current.clientHeight / ROW / 2 : 5;
        cx.strokeStyle = 'rgba(232, 145, 58, 0.12)';
        cx.lineWidth = R * 0.47;
        cx.beginPath();
        cx.arc(X, Y, R * 0.735, -ang(vis), ang(vis));
        cx.stroke();

        // D. Event Milestone Dots
        for (let i = 0; i < N; i++) {
          const e = events[i];
          const isDim = soloCategories.size > 0 && !soloCategories.has(e.categoryCode);
          if (isDim) continue;

          const a = ang(i) + rot;
          const lane = ORDER.indexOf(e.categoryCode);
          const r = laneR(lane >= 0 ? lane : 0, R);
          const x = X + Math.cos(a) * r;
          const y = Y + Math.sin(a) * r;

          cx.fillStyle = e.categoryColor;
          const near = Math.abs(i - f) < vis;
          const isHov = i === hoverRef.current;
          cx.beginPath();
          cx.arc(x, y, (isHov ? 4.5 : near ? 2.4 : 1.6) * ds, 0, TAU);
          cx.fill();
        }

        // E. Horizontal Pointer Ray & Selected Event Indicator
        const activeEvt = events[currentActive];
        if (activeEvt) {
          const lane = ORDER.indexOf(activeEvt.categoryCode);
          const r = laneR(lane >= 0 ? lane : 0, R);
          const fx = X + Math.cos(ang(currentActive) + rot) * r;
          const fy = Y + Math.sin(ang(currentActive) + rot) * r;

          // Horizontal Dashed Pointer Ray extending to rail edge
          cx.strokeStyle = 'rgba(232, 145, 58, 0.9)';
          cx.lineWidth = 1.2;
          cx.setLineDash([3, 4]);
          cx.beginPath();
          cx.moveTo(Math.max(0, X + R * 0.4), Y);
          cx.lineTo(W, Y);
          cx.stroke();
          cx.setLineDash([]);

          // White center dot with golden temple halo
          cx.fillStyle = '#ffffff';
          cx.beginPath();
          cx.arc(fx, fy, 4.2, 0, TAU);
          cx.fill();

          cx.strokeStyle = '#e8913a';
          cx.lineWidth = 2;
          cx.beginPath();
          cx.arc(fx, fy, 9, 0, TAU);
          cx.stroke();
        }

        // Central Wheel Hub (Year, Era, Index)
        const out = X < R0 * 0.55;
        const hx = out ? 24 : X;
        const hy = out ? 58 : Y;
        cx.textAlign = out ? 'left' : 'center';
        cx.fillStyle = '#e8913a';
        cx.font = `400 ${Math.round(R0 * (out ? 0.085 : 0.105))}px Lora, Georgia, serif`;
        cx.fillText(activeEvt ? activeEvt.yearFormatted : '', hx, hy - R0 * 0.03);

        cx.fillStyle = isLightMode ? 'rgba(40, 20, 10, 0.85)' : 'rgba(181, 169, 144, 0.95)';
        cx.font = `500 ${Math.max(11, Math.round(R0 * 0.04))}px Manrope, sans-serif`;
        cx.fillText(activeEvt ? activeEvt.eraName : '', hx, hy + R0 * 0.075);

        cx.fillStyle = isLightMode ? 'rgba(70, 40, 20, 0.7)' : 'rgba(127, 116, 100, 0.9)';
        cx.font = '500 11px Manrope, sans-serif';
        cx.fillText(`${currentActive + 1} of ${N}`, hx, hy + R0 * 0.15);
      }
    } catch (err) {
      console.error('Chakra render loop caught error:', err);
    } finally {
      animId = requestAnimationFrame(render);
    }
  };

  animId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(animId);
}, [N, events, geom, isLightMode, TODAY, soloCategories]);

  // Pointer drag on canvas (1:1 Tryambak formula)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    stopAnim();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { X, Y } = geom(canvas.clientWidth, canvas.clientHeight, zoomRef.current, isExpandedRef.current);

    dragRef.current = {
      a: Math.atan2(y - Y, x - X),
      f: fRef.current,
      x,
      y,
      moved: false,
    };
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const drag = dragRef.current;

    if (drag) {
      const { X, Y } = geom(canvas.clientWidth, canvas.clientHeight, zoomRef.current, isExpandedRef.current);
      if (Math.hypot(x - drag.x, y - drag.y) > 4) {
        drag.moved = true;
        setTooltip(null);
      }
      if (drag.moved) {
        let da = Math.atan2(y - Y, x - X) - drag.a;
        da = Math.atan2(Math.sin(da), Math.cos(da));
        drag.a += da;
        drag.f -= (da / SPAN) * N;
        drag.f = Math.max(0, Math.min(N - 1, drag.f));
        fRef.current = drag.f;
        if (railRef.current) {
          railRef.current.scrollTop = drag.f * ROW;
        }
        const newCur = Math.round(drag.f);
        if (newCur !== curRef.current) {
          soundManager.tick();
          setCur(newCur, false);
        }
        dirtyRef.current = true;
      }
      return;
    }

    // Hover hit test
    const h = hitTest(x, y);
    if (h !== hoverRef.current) {
      hoverRef.current = h;
      dirtyRef.current = true;
    }
    if (h >= 0 && events[h]) {
      setTooltip({
        x: Math.min(window.innerWidth - 320, e.clientX + 16),
        y: e.clientY + 16,
        title: events[h].title,
        year: events[h].yearFormatted,
        cat: events[h].categoryName,
      });
      canvas.style.cursor = 'pointer';
    } else {
      setTooltip(null);
      canvas.style.cursor = '';
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d) return;

    if (d.moved) {
      go(Math.round(fRef.current));
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const h = hitTest(x, y);
        if (h >= 0) {
          go(h);
        } else {
          // Check if clicking central Om hub or disc
          const { X, Y, R } = geom(canvas.clientWidth, canvas.clientHeight, zoomRef.current, isExpandedRef.current);
          const dCenter = Math.hypot(x - X, y - Y);
          if (dCenter <= R * 0.46) {
            handleToggleExpand();
          }
        }
      }
    }
  };

  const handlePointerLeave = () => {
    hoverRef.current = -1;
    setTooltip(null);
    dirtyRef.current = true;
  };

  // Wheel listener directly on canvas for smooth trackpad/mouse wheel scrolling & pinching
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        setZoom(ztRef.current * Math.exp(-e.deltaY * 0.012));
        return;
      }
      stopAnim();
      const d = e.deltaMode === 1 ? e.deltaY * 18 : e.deltaY;
      const delta = Math.abs(e.deltaX) > Math.abs(d) ? e.deltaX : d;
      const deltaF = delta / ROW;
      fRef.current = Math.max(0, Math.min(N - 1, fRef.current + deltaF));
      if (railRef.current) {
        railRef.current.scrollTop = fRef.current * ROW;
      }
      const newCur = Math.round(fRef.current);
      if (newCur !== curRef.current) {
        soundManager.tick();
        setCur(newCur, false);
      }
      dirtyRef.current = true;

      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = setTimeout(() => {
        if (!animRef.current && events[curRef.current]) {
          onSelectEvent(events[curRef.current]);
        }
      }, 140);
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [setZoom, stopAnim, N, events, onSelectEvent, setCur]);

  // Rail scroll listener with continuous sync
  const handleRailScroll = () => {
    if (animRef.current || isProgrammaticScrollRef.current) return;
    if (performance.now() < ignoreScrollUntilRef.current) return;
    const rail = railRef.current;
    if (!rail) return;
    const f = Math.max(0, Math.min(N - 1, rail.scrollTop / ROW));
    fRef.current = f;
    const newCur = Math.round(f);

    if (newCur !== curRef.current) {
      soundManager.tick();
      setCur(newCur, false);
    }
    dirtyRef.current = true;

    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = setTimeout(() => {
      if (!animRef.current && !isProgrammaticScrollRef.current && events[curRef.current]) {
        prevSelectedIdRef.current = events[curRef.current].id;
        onSelectEvent(events[curRef.current]);
      }
    }, 180);
  };

  const toggleSoloCategory = (code: string) => {
    setSoloCategories((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      if (next.size === ORDER.length) next.clear();
      return next;
    });
    dirtyRef.current = true;
  };

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Toggle Semicircle Expansion mode
  const handleToggleExpand = () => {
    soundManager.bell(1046.5, 0.15, 1.2);
    setIsExpanded(!isExpanded);
    dirtyRef.current = true;
  };

  return (
    <div className={`w-full h-full grid transition-all duration-500 ease-in-out overflow-hidden ${
      isExpanded 
        ? 'grid-cols-[240px_220px_1fr] sm:grid-cols-[280px_240px_1fr] lg:grid-cols-[320px_280px_1fr]' 
        : 'grid-cols-[1fr_340px] md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_280px_380px] xl:grid-cols-[1fr_330px_430px]'
    } ${isLightMode ? 'bg-[#f4ebd9]' : 'bg-[#0d0a08]'}`}>
      
      {/* ---------------- COLUMN 1: KALACHAKRA WHEEL CANVAS (#stage) ---------------- */}
      <section 
        ref={stageRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden select-none transition-all duration-700"
      >
        <canvas
          id="kalachakra-canvas"
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onDoubleClick={() => setZoom(ztRef.current >= ZMAX - 0.1 ? 1 : ztRef.current * 1.8)}
          className="w-full h-full touch-none block"
        />

        {/* Zoom Controls Overlay (Top Left) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-[#120d09cc] border border-[rgba(232,145,58,0.3)] backdrop-blur-md shadow-lg">
          <button
            onClick={() => setZoom(ztRef.current * 1.6)}
            aria-label="Zoom In (+)"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#e8913a] hover:bg-white/10 hover:text-white transition-all text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(ztRef.current / 1.6)}
            aria-label="Zoom Out (-)"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#e8913a] hover:bg-white/10 hover:text-white transition-all text-xs"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            disabled={zoom <= 1.01}
            aria-label="Reset Zoom (0)"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              zoom > 1.01 ? 'text-[#e8913a] hover:bg-white/10' : 'text-gray-600 opacity-40 cursor-not-allowed'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Semicircle Expansion Toggle Button */}
          <button
            onClick={handleToggleExpand}
            aria-label={isExpanded ? "Collapse to full wheel" : "Expand side view & semicircle dial"}
            className="h-7 px-2.5 rounded-full flex items-center gap-1 text-[10.5px] font-serif font-bold text-[#e8913a] bg-[#e8913a]/15 hover:bg-[#e8913a]/30 border border-[#e8913a]/40 transition-all ml-1"
          >
            {isExpanded ? <PanelRightClose className="w-3 h-3" /> : <PanelRightOpen className="w-3 h-3" />}
            <span className="hidden sm:inline">{isExpanded ? "Full Wheel" : "Semicircle"}</span>
          </button>

          {/* Scientific Evolution & 11D Spacetime Matrix Trigger */}
          {onOpenEvolution && (
            <button
              onClick={() => {
                soundManager.bell(880, 0.2, 1.8);
                onOpenEvolution();
              }}
              aria-label="Scientific Evolution & 11D Spacetime"
              className="h-7 px-2.5 rounded-full flex items-center gap-1 text-[10.5px] font-serif font-bold text-[#6fb0b2] bg-[#6fb0b2]/15 hover:bg-[#6fb0b2]/30 border border-[#6fb0b2]/40 transition-all ml-1 shadow-sm"
            >
              <Atom className="w-3 h-3 text-[#a5f3fc]" />
              <span className="hidden sm:inline">Evolution & 11D</span>
            </button>
          )}
        </div>

        {/* Bottom Left: Filter Kinds Toggle Button */}
        <div className="absolute bottom-3 left-4 z-20 flex flex-col gap-2 items-start">
          {isLegendOpen && (
            <div className="flex flex-wrap gap-1.5 p-2 rounded-[12px] bg-[#120d09f5] border border-[rgba(232,145,58,0.35)] backdrop-blur-xl shadow-2xl max-w-[420px]">
              <button
                onClick={() => {
                  setSoloCategories(new Set());
                  dirtyRef.current = true;
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1.5 ${
                  soloCategories.size === 0 
                    ? 'border border-[#e8913a] bg-[#e8913a]/20 text-[#efe6d6]' 
                    : 'border border-white/10 text-[#b5a990] hover:text-[#efe6d6]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#e8913a] to-[#7fb6a4]" />
                All kinds
              </button>
              {ORDER.split('').map((c) => {
                const [catName, color] = CAT_MAP[c] || [c, '#e8913a'];
                const isSelected = soloCategories.has(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleSoloCategory(c)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'border border-[#e8913a] bg-[#e8913a]/25 text-[#ffffff]'
                        : 'border border-white/10 text-[#b5a990] hover:text-[#efe6d6]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    {catName}
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="h-8 px-3 rounded-full text-[11.5px] font-serif font-medium bg-[#120d09cc] border border-[rgba(232,145,58,0.3)] text-[#b5a990] hover:text-[#ffffff] hover:border-[#e8913a] transition-all flex items-center gap-1.5 backdrop-blur-md shadow-lg"
          >
            <Filter className="w-3.5 h-3.5 text-[#e8913a]" />
            <span>{isLegendOpen ? 'Hide filters' : soloCategories.size ? `Filter (${soloCategories.size})` : 'Filters'}</span>
          </button>
        </div>

        {/* Floating Tooltip */}
        {tooltip && (
          <div
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            className="fixed z-50 pointer-events-none p-3 rounded-[8px] bg-[#120d09f0] border border-[rgba(232,145,58,0.5)] shadow-2xl backdrop-blur-lg max-w-[280px]"
          >
            <div className="text-[13px] font-serif font-bold text-[#efe6d6] leading-snug">
              {tooltip.title}
            </div>
            <div className="text-[11px] font-mono text-[#e8913a] mt-1">
              {tooltip.year} · <span className="text-[#b5a990]">{tooltip.cat}</span>
            </div>
          </div>
        )}

        {/* Helpful Hint banner */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block">
          <p className="px-4 py-1.5 rounded-full bg-[#120d09cc] backdrop-blur-md border border-[rgba(232,145,58,0.3)] text-[11px] font-serif text-[#e8913a]">
            {isExpanded ? "Semicircle Dial active • Click Full Wheel to reset" : "Drag wheel to rotate • Click Semicircle to expand view"}
          </p>
        </div>
      </section>

      {/* ---------------- COLUMN 2: VERTICAL CHRONOLOGICAL RAIL (#railwrap) ---------------- */}
      <section 
        className={`relative h-full border-l border-r border-[rgba(232,145,58,0.22)] bg-gradient-to-b from-[#120c07] via-[#0d0905] to-[#16100a] backdrop-blur-md overflow-hidden ${
          isExpanded ? 'hidden md:block' : 'hidden lg:block'
        }`}
      >
        {/* Signature Central Focus Band (#band) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[54px] border-t border-b border-[#e8913a]/55 bg-gradient-to-r from-[#e8913a]/13 via-[#e8913a]/3 to-transparent pointer-events-none z-10">
          <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-l-[7px] border-l-[#e8913a]" />
        </div>

        {/* Vignette Gradients */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0d0a08] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d0a08] to-transparent pointer-events-none z-10" />

        <div 
          ref={railRef}
          onScroll={handleRailScroll}
          className="h-full overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          <ol ref={listRef} className="list-none p-0 m-0">
            {events.map((ev, i) => {
              const isSelected = i === cur;
              const isDim = soloCategories.size > 0 && !soloCategories.has(ev.categoryCode);
              return (
                <li key={ev.id} style={{ height: `${ROW}px` }} className="px-2.5 flex items-center">
                  <button
                    onClick={() => {
                      soundManager.bell(880, 0.18, 1.6);
                      go(i);
                    }}
                    className={`w-full h-[46px] flex items-center gap-3 px-3 rounded-[8px] text-left transition-all duration-150 border ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#e8913a]/25 via-[#e8913a]/15 to-transparent text-[#ffffff] border-[#e8913a] shadow-[0_0_12px_rgba(232,145,58,0.3)] opacity-100' 
                        : isDim
                        ? 'border-transparent opacity-20 hover:opacity-40 text-[#b5a990]'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:bg-white/5 text-[#b5a990]'
                    }`}
                  >
                    <span 
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform ${isSelected ? 'scale-125 shadow-[0_0_8px_currentColor]' : ''}`}
                      style={{ backgroundColor: ev.categoryColor }}
                    />
                    <div className="overflow-hidden min-w-0 flex-1">
                      <div className="text-[10.5px] font-mono font-bold text-[#e8913a] leading-none mb-1">
                        {ev.yearFormatted}
                      </div>
                      <div className={`text-[12.5px] font-serif truncate leading-tight ${isSelected ? 'font-bold text-[#efe6d6] text-[13.5px]' : ''}`}>
                        {ev.title}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-[#e8913a] shrink-0 font-serif">✦</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------- COLUMN 3: EVENT DETAIL PANEL (#panel) ---------------- */}
      <section 
        className="h-full flex flex-col min-h-0 bg-gradient-to-b from-[#140e09]/95 via-[#0d0905]/95 to-[#1a120c]/95 backdrop-blur-2xl border-l border-[rgba(232,145,58,0.22)] shadow-2xl transition-all duration-700 overflow-hidden"
      >
        {/* Fixed Pinned Header Bar — Never scrolls away, never overlaps content */}
        <div className="shrink-0 px-6 md:px-8 py-3.5 bg-[#140e09] border-b border-[rgba(232,145,58,0.25)] flex items-center justify-between shadow-md z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span 
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: selectedEvent.categoryColor }}
            />
            <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#e8913a] truncate max-w-[180px] sm:max-w-[240px]">
              {selectedEvent.categoryName}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-[#fde047] font-bold px-2.5 py-0.5 rounded-[6px] bg-[#e8913a]/15 border border-[#e8913a]/30 whitespace-nowrap">
              {selectedEvent.yearFormatted}
            </span>
            <button
              onClick={handleToggleExpand}
              className="p-1 rounded-[6px] text-[#b5a990] hover:text-[#e8913a] hover:bg-white/10 transition-all"
              aria-label={isExpanded ? "Collapse to standard view" : "Expand to widescreen view"}
            >
              {isExpanded ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scrollable Event Content Area */}
        <div 
          ref={detailPanelRef}
          className="flex-1 overflow-y-auto px-6 md:px-8 py-5 pb-16 space-y-6 overscroll-contain"
        >
          {/* Attestation Seal Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[11px] font-serif font-medium bg-[#1e293b]/60 text-[#6fb0b2] border border-[#6fb0b2]/40 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6fb0b2]" />
            <span>प्रमाणित स्रोत • {selectedEvent.trustedSource}</span>
          </div>

          {/* Title Stack with Lora Serif */}
          <h1 className="text-2xl md:text-3xl font-display text-[#efe6d6] leading-tight pb-1 break-words relative z-10" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            {selectedEvent.title}
          </h1>

        {/* Wikipedia Picture Loader Component with 1:1 Tryambak Engine & 0ms Cache */}
        <WikiImage 
          key={selectedEvent.id}
          wikiImageTitle={selectedEvent.wikiImageTitle}
          tags={selectedEvent.tags}
          categoryCode={selectedEvent.categoryCode}
          caption={selectedEvent.title}
          isLightMode={isLightMode}
          isExpanded={isExpanded}
        />

        {/* Bhagavad Gita Verse Card */}
        {selectedEvent.gitaQuote && (
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#26170d] to-[#170e08] border border-[rgba(232,145,58,0.4)] shadow-xl space-y-2.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-serif font-bold text-[#e8913a] uppercase tracking-wider border-b border-[rgba(232,145,58,0.2)] pb-1.5">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#e8913a]" />
                <span>श्रीमद्भगवद्गीता • {selectedEvent.gitaQuote.chapter}</span>
              </div>
              <span className="text-[#efe6d6] opacity-80">॥ श्रीः ॥</span>
            </div>
            <p className="text-sm font-semibold text-[#fde047] leading-relaxed text-center" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
              {selectedEvent.gitaQuote.verse}
            </p>
            <p className="text-xs italic text-[#b5a990] leading-relaxed font-serif text-center">
              &quot;{selectedEvent.gitaQuote.transliteration}&quot;
            </p>
            <p className="text-xs text-[#e9dfcc] pt-2 border-t border-[rgba(232,145,58,0.18)] leading-relaxed text-center">
              {selectedEvent.gitaQuote.translation}
            </p>
            <p className="text-[10px] text-[#e8913a] opacity-80 text-right pt-0.5 font-serif">
              स्रोत: {selectedEvent.gitaQuote.source}
            </p>
          </div>
        )}

        {/* Description Body - Adaptive to Presentation Mode */}
        {isCinematic ? (
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Key Takeaway • मुख्य सूत्र</span>
            </div>
            <p className="text-base font-serif font-bold text-white leading-snug">
              {selectedEvent.description.split('.')[0]}.
            </p>
            <div className="text-xs text-amber-200/90 font-sans pt-1">
              ⭐ <b>Core Meaning:</b> {selectedEvent.categoryName} milestone in {selectedEvent.region}.
            </div>
          </div>
        ) : isReading ? (
          <div className="text-base leading-loose text-[#efe6d6] space-y-4 font-serif">
            {selectedEvent.description.split('¶').map((para, pIdx) => (
              <p key={pIdx} className="leading-loose">
                {para.trim()}
              </p>
            ))}
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-[#e9dfcc] space-y-3 font-serif">
            <div className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Historical & Philological Evidence:</span>
            </div>
            {selectedEvent.description.split('¶').map((para, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        {/* Scientific Evolution & Multidimensional Spacetime Matrix Callout Banner */}
        {onOpenEvolution && (
          <div className="p-3.5 rounded-[10px] bg-gradient-to-r from-[#101b1b] via-[#152323] to-[#0c1515] border border-[#6fb0b2]/45 space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-[#a5f3fc] flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-[#a5f3fc] animate-spin" style={{ animationDuration: '14s' }} />
                मानव विकास, भौतिकी एवं बहुआयामी कालचक्र
              </span>
              <span className="text-[9px] font-mono text-[#6fb0b2]">4D • 5D • 11D • Satya Yuga</span>
            </div>
            <p className="text-xs text-[#cfe8e8] font-serif leading-relaxed">
              Explore the complete 15-epoch scientific trajectory: from chimpanzee LCA to Homo sapiens, controlled fire, industry, 4D Einstein relativity, 5D Kaluza-Klein, 11D M-Theory, to Sri Vishnu in Yoganidrā and the rebirth of Satya Yuga.
            </p>
            <button
              onClick={() => {
                soundManager.bell(880, 0.2, 1.8);
                onOpenEvolution();
              }}
              className="w-full h-8 rounded-[6px] text-xs font-serif font-bold uppercase tracking-wider bg-gradient-to-r from-[#6fb0b2] to-[#39787a] text-[#0d0a08] hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow"
            >
              <span>Open Scientific Matrix & Equations</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Era Context Note */}
        <div className="p-3.5 rounded-[10px] bg-[#1a120b] border border-[rgba(232,145,58,0.25)] space-y-1">
          <span className="text-[11px] font-serif font-bold text-[#e8913a] uppercase tracking-wider block">
            कालखण्ड • The Age: {selectedEvent.eraName}
          </span>
          <p className="text-xs text-[#b5a990] leading-relaxed font-serif">
            {selectedEvent.eraDesc}
          </p>
        </div>

        {/* Geography & Position Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#b5a990] pt-2 border-t border-[rgba(232,145,58,0.15)] font-serif">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#6fb0b2]" />
            <span>स्थान: <strong className="text-[#efe6d6]">{selectedEvent.region}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#e8913a]" />
            <span>क्रमांक: <strong className="text-[#efe6d6]">{selectedEvent.index + 1} of {N}</strong></span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {selectedEvent.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className="px-2.5 py-1 rounded-[6px] text-[11px] font-serif bg-[#1a120b] hover:bg-[#e8913a]/20 text-[#e8913a] hover:text-[#ffffff] border border-[rgba(232,145,58,0.3)] transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Related Moments Section (#rel) */}
        {relatedMoments.length > 0 && (
          <div className="pt-4 border-t border-[rgba(232,145,58,0.18)] space-y-2">
            <h3 className="text-[11.5px] font-serif font-bold tracking-wider uppercase text-[#b5a990]">
              Travel onward to related moments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {relatedMoments.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => {
                    soundManager.bell(880, 0.18, 1.6);
                    go(rel.index);
                  }}
                  className="flex items-baseline gap-2.5 p-2 rounded-[6px] hover:bg-white/5 border border-transparent hover:border-[#e8913a]/30 text-left transition-all group"
                >
                  <span className="text-[11px] font-mono font-bold text-[#e8913a] shrink-0">
                    {rel.yearFormatted}
                  </span>
                  <span className="text-[13px] font-serif text-[#e9dfcc] group-hover:text-white truncate">
                    {rel.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="pt-4 border-t border-[rgba(232,145,58,0.2)] flex items-center justify-between gap-2.5">
          <button
            onClick={() => {
              const prevIdx = (cur - 1 + N) % N;
              soundManager.bell(720, 0.18, 1.4);
              go(prevIdx);
            }}
            className="flex-1 h-[40px] px-3 rounded-[8px] text-xs font-serif font-bold uppercase tracking-wider border border-[rgba(232,145,58,0.35)] bg-gradient-to-b from-[#21160e] to-[#0f0b07] hover:border-[#e8913a] hover:text-[#ffffff] text-[#e8913a] transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Earlier</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className="h-[40px] px-3.5 rounded-[8px] text-xs font-serif font-medium border border-[rgba(232,145,58,0.3)] bg-[#1a120b] hover:bg-[#e8913a]/20 text-[#b5a990] hover:text-white transition-all flex items-center justify-center gap-1.5"
            aria-label="Copy link to current milestone"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#e8913a]" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => {
              const nextIdx = (cur + 1) % N;
              soundManager.bell(880, 0.18, 1.6);
              go(nextIdx);
            }}
            className="flex-1 h-[40px] px-3 rounded-[8px] text-xs font-serif font-extrabold uppercase tracking-wider bg-gradient-to-b from-[#e8913a] via-[#c57922] to-[#994710] text-[#0d0a08] border border-[#fde047] hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(232,145,58,0.4)]"
          >
            <span>{cur === N - 1 ? '↻ आदि Begin' : 'Later'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        </div>
      </section>
    </div>
  );
}
