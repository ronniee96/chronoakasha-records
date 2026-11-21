'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Maximize2, Compass } from 'lucide-react';
import { TimelineEvent } from '../data/timelineEvents';
import { soundManager } from '../utils/audio';

interface KalachakraWheelProps {
  events: TimelineEvent[];
  selectedEvent: TimelineEvent | null;
  onSelectEvent: (event: TimelineEvent) => void;
  isLightMode: boolean;
  rotationAngle: number;
  onRotationChange: (angle: number) => void;
}

export function KalachakraWheel({
  events,
  selectedEvent,
  onSelectEvent,
  isLightMode,
  rotationAngle,
  onRotationChange,
}: KalachakraWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartAngle, setDragStartAngle] = useState<number>(0);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  // Wheel dimensions
  const baseSize = 820;
  const center = baseSize / 2;
  const ringRadii = [110, 165, 220, 275, 330, 385];

  // Helper to calculate angle from mouse/touch point relative to wheel center
  const getAngleFromEvent = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;
    return deg;
  }, []);

  // Mouse Drag / Touch Drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    const angle = getAngleFromEvent(e.clientX, e.clientY);
    setDragStartAngle(angle - rotationAngle);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const currentAngle = getAngleFromEvent(e.clientX, e.clientY);
    const newRotation = currentAngle - dragStartAngle;
    onRotationChange(newRotation);
  }, [isDragging, dragStartAngle, getAngleFromEvent, onRotationChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel scroll to rotate
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.15;
    onRotationChange(rotationAngle - delta);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Zoom controls (#zoom buttons measured in reference spec)
  const handleZoomIn = () => {
    soundManager.playClick();
    setZoomLevel((z) => Math.min(2.0, z + 0.15));
  };
  const handleZoomOut = () => {
    soundManager.playClick();
    setZoomLevel((z) => Math.max(0.65, z - 0.15));
  };
  const handleResetZoom = () => {
    soundManager.playClick();
    setZoomLevel(1);
    onRotationChange(0);
  };

  // Compute sequence angle for each event in the dataset
  const totalEvents = events.length;
  const eventPositions = events.map((event, index) => {
    // Sequence-based spacing with 360-degree distribution
    const sequenceAngle = (index / totalEvents) * 350 - 90; // Start at top (-90 deg)
    const effectiveAngle = sequenceAngle + rotationAngle;
    const rad = (effectiveAngle * Math.PI) / 180;
    const radius = ringRadii[event.ring - 1] || 250;
    const x = center + radius * Math.cos(rad);
    const y = center + radius * Math.sin(rad);

    return {
      event,
      index,
      sequenceAngle,
      effectiveAngle,
      radius,
      x,
      y,
    };
  });

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      className={`relative w-full h-[calc(100vh-114px)] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none transition-colors duration-300 ${
        isLightMode ? 'bg-[#86a86c]/20' : 'bg-[#08090D]'
      }`}
    >
      {/* Zoom / Navigation Float Toolbar (#zoom button 36x36px in reference) */}
      <div 
        id="zoom"
        className="absolute top-6 left-6 z-20 flex flex-col gap-1.5 p-1 rounded-full bg-[#0d0a08b3] backdrop-blur-md border border-[rgba(232,214,180,0.15)] shadow-lg"
      >
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#b5a990] hover:text-[#e8913a] hover:bg-white/10 transition-colors"
          title="Zoom In (+)"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#b5a990] hover:text-[#e8913a] hover:bg-white/10 transition-colors"
          title="Zoom Out (−)"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#b5a990] hover:text-[#e8913a] hover:bg-white/10 transition-colors"
          title="Reset Zoom & Orientation (⤢)"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Wheel Angle Guide */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d0a08b3] backdrop-blur-md border border-[rgba(232,214,180,0.15)] text-[11px] font-mono text-[#f2c47a]">
        <Compass className="w-3.5 h-3.5 text-[#e8913a] animate-spin-slow" />
        <span>Chakra Angle: {Math.round(((rotationAngle % 360) + 360) % 360)}°</span>
      </div>

      {/* Interactive SVG Wheel Canvas */}
      <div 
        style={{
          transform: `scale(${zoomLevel})`,
          transition: isDragging ? 'none' : 'transform 0.25s ease-out',
        }}
        className="relative origin-center pointer-events-auto"
      >
        <svg
          width={baseSize}
          height={baseSize}
          viewBox={`0 0 ${baseSize} ${baseSize}`}
          className="overflow-visible filter drop-shadow-[0_0_30px_rgba(232,145,58,0.15)]"
        >
          <defs>
            {/* Concentric Glow Gradients */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8913a" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#f2c47a" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#08090D" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="goldBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8913a" />
              <stop offset="50%" stopColor="#f2c47a" />
              <stop offset="100%" stopColor="#6fb0b2" />
            </linearGradient>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central Cosmic Hub Ambient Background */}
          <circle cx={center} cy={center} r={ringRadii[5] + 25} fill="url(#centerGlow)" opacity="0.6" />

          {/* Concentric Kalachakra Rings */}
          {ringRadii.map((radius, rIdx) => (
            <g key={`ring-${rIdx}`}>
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={isLightMode ? 'rgba(232,145,58,0.3)' : 'rgba(232,214,180,0.12)'}
                strokeWidth={rIdx === 0 ? '1.5' : '1'}
                strokeDasharray={rIdx % 2 === 1 ? '4,4' : 'none'}
              />
              {/* Subtle degree ticks on outer ring */}
              {rIdx === 5 && Array.from({ length: 36 }).map((_, tIdx) => {
                const tickAngle = (tIdx * 10 * Math.PI) / 180;
                const tx1 = center + (radius + 2) * Math.cos(tickAngle);
                const ty1 = center + (radius + 2) * Math.sin(tickAngle);
                const tx2 = center + (radius + (tIdx % 3 === 0 ? 12 : 6)) * Math.cos(tickAngle);
                const ty2 = center + (radius + (tIdx % 3 === 0 ? 12 : 6)) * Math.sin(tickAngle);
                return (
                  <line
                    key={`tick-${tIdx}`}
                    x1={tx1}
                    y1={ty1}
                    x2={tx2}
                    y2={ty2}
                    stroke="rgba(232,214,180,0.25)"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          ))}

          {/* Radiating Astronomical 12-Ray Solar Spokes */}
          {Array.from({ length: 12 }).map((_, i) => {
            const spokeAngle = ((i * 30 + rotationAngle) * Math.PI) / 180;
            const sx2 = center + (ringRadii[5] + 15) * Math.cos(spokeAngle);
            const sy2 = center + (ringRadii[5] + 15) * Math.sin(spokeAngle);
            return (
              <line
                key={`spoke-${i}`}
                x1={center}
                y1={center}
                x2={sx2}
                y2={sy2}
                stroke={isLightMode ? 'rgba(232,145,58,0.1)' : 'rgba(232,214,180,0.06)'}
                strokeWidth="1"
              />
            );
          })}

          {/* Central Sacred Mandala Core */}
          <g>
            <circle
              cx={center}
              cy={center}
              r={70}
              fill={isLightMode ? '#f0d9a8' : '#16110d'}
              stroke="#e8913a"
              strokeWidth="1.5"
              className="filter drop-shadow-[0_0_15px_rgba(232,145,58,0.3)]"
            />
            <circle
              cx={center}
              cy={center}
              r={45}
              fill="none"
              stroke="rgba(232,214,180,0.25)"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            {/* Center Sacred Devanagari Sanskrit Om & Hourglass */}
            <text
              x={center}
              y={center - 8}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#e8913a"
              fontSize="24"
              fontWeight="bold"
              style={{ fontFamily: 'Noto Sans Devanagari, serif' }}
            >
              ॐ
            </text>
            <text
              x={center}
              y={center + 16}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#efe6d6"
              fontSize="9"
              letterSpacing="2"
              fontWeight="600"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              कालचक्र
            </text>
            <text
              x={center}
              y={center + 29}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#b5a990"
              fontSize="7"
              letterSpacing="1"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              CHRONOĀKĀSHA
            </text>
          </g>

          {/* Interactive Event Nodes along Rings */}
          {eventPositions.map(({ event, effectiveAngle, radius, x, y }) => {
            const isSelected = selectedEvent?.id === event.id;
            const isHovered = hoveredEvent?.id === event.id;
            const isToday = event.id === 'present-day-anthropocene';
            const isKalpa = event.id === 'sveta-varaha-kalpa-begins';
            const isCycle = event.id === 'mahapralaya-yoganidra-return';

            // Distinct node styling based on era/importance
            let nodeFill = '#e8913a';
            if (isToday) nodeFill = '#f2c47a';
            else if (event.era === 'vedic') nodeFill = '#6fb0b2';
            else if (event.era === 'classical') nodeFill = '#9d93c9';
            else if (event.era === 'archaeology') nodeFill = '#86a86c';
            else if (event.era === 'kardashev') nodeFill = '#80B9E8';
            else if (event.era === 'satya' || event.era === 'medieval') nodeFill = '#d98591';

            return (
              <g
                key={event.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playChime(432 + event.ring * 36);
                  onSelectEvent(event);
                }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Connecting subtle line to center when selected or hovered */}
                {(isSelected || isHovered) && (
                  <line
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke={nodeFill}
                    strokeWidth={isSelected ? '2' : '1'}
                    strokeDasharray={isSelected ? 'none' : '2,2'}
                    opacity={isSelected ? '0.7' : '0.4'}
                  />
                )}

                {/* Outer Pulse Halo for Key Nodes */}
                {(isToday || isKalpa || isCycle || isSelected) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 18 : 12}
                    fill={nodeFill}
                    opacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Hover ring */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill="none"
                    stroke={nodeFill}
                    strokeWidth="1.5"
                    filter="url(#nodeGlow)"
                  />
                )}

                {/* Core Event Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : isHovered ? 7 : 5}
                  fill={isSelected ? '#ffffff' : nodeFill}
                  stroke={isSelected ? nodeFill : '#08090D'}
                  strokeWidth="2"
                  filter={isSelected || isHovered ? 'url(#nodeGlow)' : 'none'}
                />

                {/* Event Label (always visible for key anchors, or when hovered/selected) */}
                {(isSelected || isHovered || isToday || isKalpa || isCycle) && (
                  <g>
                    <rect
                      x={x + (x > center ? 12 : -160)}
                      y={y - 12}
                      width="150"
                      height="24"
                      rx="12"
                      fill={isLightMode ? '#f0d9a8' : '#16110d'}
                      stroke={isSelected ? '#e8913a' : 'rgba(232,214,180,0.3)'}
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <text
                      x={x + (x > center ? 20 : -85)}
                      y={y + 3}
                      fill={isSelected ? '#e8913a' : '#efe6d6'}
                      fontSize="10"
                      fontWeight={isSelected ? '600' : '500'}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {event.title.length > 20 ? `${event.title.substring(0, 19)}...` : event.title}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Instruction Hint at bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
        <p className="px-4 py-1.5 rounded-full bg-[#0d0a08b3] backdrop-blur-md border border-[rgba(232,214,180,0.12)] text-[11px] text-[#b5a990]">
          Drag wheel to rotate time • Scroll wheel to travel • Click any node to open archive
        </p>
      </div>
    </div>
  );
}
