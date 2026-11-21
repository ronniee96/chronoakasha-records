'use client';

/**
 * CHRONOAKASHA RITUALISTIC SOUND & SYNTHESIS ENGINE
 * 1:1 Port of Tryambak Temple Audio Engine & Indian Classical Acoustics:
 * - bell(f, v, d): Bronze Temple Bell with 6 harmonic partials
 * - tick(force): Tactile Wooden Tick / Damaru haptic on every milestone scroll
 * - awe(): Sacred Tanpura Drone (Sa-Pa-Sa) + Sub-bass Swell + Rising Noise + Bhairav Raga Shimmer
 * - om(): Resonant 136.1 Hz Sacred Earth Year Om sweep with multi-octave sawtooth harmonics
 * - Continuous ambient drone and dynamic mode retuning
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false; // Enabled by default as requested!
  private isUnlocked: boolean = false;
  private lastTickTime: number = 0;

  // Drone Nodes for continuous background ambiance
  private droneGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneFilter: BiquadFilterNode | null = null;
  private currentMode: 'chakra' | 'voyage3d' | 'cinematic' | 'today' = 'chakra';

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (!this.isUnlocked) {
          this.init();
          this.isUnlocked = true;
          if (!this.isMuted) {
            this.awe();
            this.startDrone();
          }
          window.removeEventListener('click', unlockAudio);
          window.removeEventListener('keydown', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
          window.removeEventListener('pointerdown', unlockAudio);
          window.removeEventListener('wheel', unlockAudio);
        }
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('wheel', unlockAudio, { passive: true });
    }
  }

  public init(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopDrone();
    } else {
      this.tick(true);
      this.bell(880, 0.18, 1.6);
      this.startDrone();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * EXACT TRYAMBAK TICK: Triangle wave (1500Hz -> 700Hz in 30ms) through 1100Hz bandpass filter
   * Throttled to 45ms to ensure ultra-smooth audio during rapid wheel drag or rail scroll
   */
  public tick(force?: boolean) {
    if (this.isMuted) return;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (!force && now - this.lastTickTime < 45) return;
    this.lastTickTime = now;

    const c = this.init();
    if (!c) return;

    try {
      const t = c.currentTime;
      const o = c.createOscillator();
      const g = c.createGain();
      const fl = c.createBiquadFilter();

      o.type = 'triangle';
      o.frequency.setValueAtTime(1500, t);
      o.frequency.exponentialRampToValueAtTime(700, t + 0.03);

      fl.type = 'bandpass';
      fl.frequency.value = 1100;

      g.gain.setValueAtTime(0.012, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      o.connect(fl).connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + 0.05);
    } catch {
      // Audio node cleanup
    }
  }

  /**
   * EXACT TRYAMBAK TEMPLE BELL: 6 Harmonic Bronze Partials
   * [[1, 1], [2.01, .5], [2.76, .32], [5.4, .16], [8.93, .07], [.5, .22]]
   */
  public bell(freq: number = 880, volume: number = 0.18, decay: number = 1.6) {
    if (this.isMuted) return;
    const c = this.init();
    if (!c) return;

    try {
      const t = c.currentTime;
      const partials: [number, number][] = [
        [1, 1],
        [2.01, 0.5],
        [2.76, 0.32],
        [5.4, 0.16],
        [8.93, 0.07],
        [0.5, 0.22],
      ];

      partials.forEach(([m, a]) => {
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = 'sine';
        o.frequency.value = freq * m;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(volume * a * 0.22, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + decay * (1 / Math.sqrt(m)));
        o.connect(g).connect(c.destination);
        o.start(t);
        o.stop(t + decay + 0.1);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * EXACT TRYAMBAK AWE():
   * - Delay feedback line (420ms delay, 45% feedback)
   * - Sub-bass swell (36Hz -> 49Hz)
   * - Tanpura Drone Sa-Pa-Sa (130.8, 196, 261.6, 130.8 Hz) with dynamic bandpass jivari buzz
   * - Rising filtered noise sweep (200Hz -> 5000Hz)
   * - Shimmering Bhairav Raga phrase [523.3, 554.4, 659.3, 784, 830.6, 1046.5]
   */
  public awe() {
    if (this.isMuted) return;
    const c = this.init();
    if (!c) return;

    try {
      const t = c.currentTime + 0.05;
      const M = c.createGain();
      M.gain.value = 0.32;
      M.connect(c.destination);

      const dl = c.createDelay(1.5);
      const fb = c.createGain();
      const wet = c.createGain();
      dl.delayTime.value = 0.42;
      fb.gain.value = 0.45;
      wet.gain.value = 0.5;
      dl.connect(fb).connect(dl);
      dl.connect(wet).connect(M);

      const env = (g: GainNode, a: number, pk: number, h: number, r: number) => {
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(pk, t + a);
        g.gain.setValueAtTime(pk, t + a + h);
        g.gain.exponentialRampToValueAtTime(0.0001, t + a + h + r);
      };

      // 1. Sub Swell
      {
        const o = c.createOscillator();
        const g = c.createGain();
        o.frequency.setValueAtTime(36, t);
        o.frequency.linearRampToValueAtTime(49, t + 3);
        env(g, 2.2, 0.5, 1, 3.5);
        o.connect(g).connect(M);
        o.start(t);
        o.stop(t + 7);
      }

      // 2. Tanpura drone Sa-Pa-Sa with jivari buzz
      const droneNotes: [number, number][] = [
        [130.8, 0],
        [196, 0.6],
        [261.6, 1.2],
        [130.8, 1.8],
      ];
      droneNotes.forEach(([fq, d]) => {
        const o = c.createOscillator();
        const bp = c.createBiquadFilter();
        const g = c.createGain();
        o.type = 'sawtooth';
        o.frequency.value = fq;
        bp.type = 'bandpass';
        bp.Q.value = 6;
        bp.frequency.setValueAtTime(fq * 3, t + d);
        bp.frequency.exponentialRampToValueAtTime(fq * 9, t + d + 1.8);
        bp.frequency.exponentialRampToValueAtTime(fq * 2, t + d + 5);
        g.gain.setValueAtTime(0, t + d);
        g.gain.linearRampToValueAtTime(0.07, t + d + 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d + 5.5);
        o.connect(bp).connect(g);
        g.connect(M);
        g.connect(dl);
        o.start(t + d);
        o.stop(t + d + 5.6);
      });

      // 3. Rising noise sweep
      {
        const n = c.createBufferSource();
        const b = c.createBuffer(1, c.sampleRate * 3, c.sampleRate);
        const data = b.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        n.buffer = b;
        const bp = c.createBiquadFilter();
        const g = c.createGain();
        bp.type = 'bandpass';
        bp.Q.value = 3;
        bp.frequency.setValueAtTime(200, t);
        bp.frequency.exponentialRampToValueAtTime(5000, t + 2.4);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.05, t + 2.2);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.9);
        n.connect(bp).connect(g).connect(M);
        n.start(t);
      }

      // 4. Shimmering raga phrase (Bhairav: Sa re Ga Pa dha Sa')
      const bhairavNotes = [523.3, 554.4, 659.3, 784, 830.6, 1046.5];
      bhairavNotes.forEach((fq, k) => {
        const tt = t + 2.3 + k * 0.16;
        const o = c.createOscillator();
        const o2 = c.createOscillator();
        const g = c.createGain();
        o.type = 'sine';
        o2.type = 'sine';
        o.frequency.value = fq;
        o2.frequency.value = fq * 2.003;
        g.gain.setValueAtTime(0, tt);
        g.gain.linearRampToValueAtTime(0.035, tt + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, tt + 2.2);
        o.connect(g);
        o2.connect(g);
        g.connect(M);
        g.connect(dl);
        o.start(tt);
        o2.start(tt);
        o.stop(tt + 2.3);
        o2.stop(tt + 2.3);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * EXACT TRYAMBAK OM():
   * Sacred 136.1 Hz + harmonics (68.05Hz sub, 272.2Hz octave, detuned sawtooth)
   * Swept through resonant lowpass filter (260Hz -> 900Hz -> 240Hz)
   */
  public om() {
    if (this.isMuted) return;
    const c = this.init();
    if (!c) return;

    try {
      const t = c.currentTime + 0.02;
      const g = c.createGain();
      const lp = c.createBiquadFilter();

      lp.type = 'lowpass';
      lp.Q.value = 4;
      lp.frequency.setValueAtTime(260, t);
      lp.frequency.linearRampToValueAtTime(900, t + 1.1);
      lp.frequency.linearRampToValueAtTime(240, t + 3.4);

      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.16, t + 0.9);
      g.gain.setValueAtTime(0.16, t + 2);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 4.6);

      lp.connect(g).connect(c.destination);

      const harmonics: [number, OscillatorType, number][] = [
        [136.1, 'sawtooth', 0.35],
        [136.1 * 1.003, 'sawtooth', 0.3],
        [68.05, 'sine', 0.8],
        [272.2, 'sine', 0.15],
      ];

      harmonics.forEach(([fq, ty, a]) => {
        const o = c.createOscillator();
        const h = c.createGain();
        o.type = ty;
        o.frequency.value = fq;
        h.gain.value = a;
        o.connect(h).connect(lp);
        o.start(t);
        o.stop(t + 4.7);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Continuous ritualistic background drone
   */
  private startDrone() {
    if (this.isMuted || this.droneGain) return;
    const c = this.init();
    if (!c) return;

    try {
      const baseFreq = this.getModeBaseFreq();
      this.droneGain = c.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, c.currentTime);
      this.droneGain.gain.linearRampToValueAtTime(0.045, c.currentTime + 3);

      this.droneFilter = c.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(450, c.currentTime);

      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(c.destination);

      const freqs = [baseFreq * 0.5, baseFreq, baseFreq * 1.5, baseFreq * 2];
      this.droneOscs = freqs.map((f, i) => {
        const osc = c.createOscillator();
        osc.type = i === 1 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(f + (Math.random() - 0.5) * 0.5, c.currentTime);
        osc.connect(this.droneFilter!);
        osc.start();
        return osc;
      });
    } catch {
      // Ignore
    }
  }

  private stopDrone() {
    if (!this.droneGain) return;
    try {
      const now = this.ctx ? this.ctx.currentTime : 0;
      if (this.droneGain && this.ctx) {
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      }
      setTimeout(() => {
        this.droneOscs.forEach(o => {
          try { o.stop(); o.disconnect(); } catch {}
        });
        this.droneOscs = [];
        this.droneGain = null;
        this.droneFilter = null;
      }, 900);
    } catch {
      this.droneOscs = [];
      this.droneGain = null;
    }
  }

  private getModeBaseFreq(): number {
    switch (this.currentMode) {
      case 'chakra':
        return 136.1; // OM / Sa
      case 'voyage3d':
        return 163.3; // Gandhara (Solar Golden Scale)
      case 'cinematic':
        return 108.0; // Deep Meditative Cosmic Bhairav Harmonic
      case 'today':
        return 194.18; // Synodic Day / Earth Orbital Frequency
      default:
        return 136.1;
    }
  }

  public setMode(mode: 'chakra' | 'voyage3d' | 'cinematic' | 'today') {
    try {
      if (this.currentMode === mode) return;
      this.currentMode = mode;
      this.init();

      if (!this.isMuted) {
        this.bell(this.getModeBaseFreq() * 2, 0.22, 2.0);
        this.om();

        if (this.ctx && this.droneOscs.length > 0) {
          const now = this.ctx.currentTime;
          const base = this.getModeBaseFreq();
          const freqs = [base * 0.5, base, base * 1.5, base * 2];
          this.droneOscs.forEach((osc, idx) => {
            try {
              if (freqs[idx] && osc) {
                osc.frequency.cancelScheduledValues(now);
                osc.frequency.setValueAtTime(osc.frequency.value || base, now);
                osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqs[idx]), now + 2.5);
              }
            } catch {}
          });
        }
      }
    } catch {
      // Audio fallback safe
    }
  }

  // Aliases for compatibility
  public playTempleBell(freq: number = 880) {
    this.bell(freq, 0.18, 1.6);
  }

  public playWheelSpinTick(velocity: number = 1) {
    this.tick(velocity > 2);
  }

  public playRailScrollTick() {
    this.tick();
  }

  public playClick() {
    this.bell(1200, 0.08, 0.4);
  }

  public playChime(freq: number = 432) {
    this.bell(freq, 0.18, 1.6);
  }
}

export const soundManager = new SoundController();
