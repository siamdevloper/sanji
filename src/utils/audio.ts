// Ultra-Rich Web Audio API synthesizer for Birthday Music Box & Sound FX

class BirthdayAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlayingBgm: boolean = false;
  private bgmTimeout: number | null = null;
  private currentNoteIndex: number = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single sweet music box chime tone
  public playTone(freq: number, duration: number = 0.35, type: OscillatorType = 'sine', gainVal: number = 0.15) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Add harmonic overtone for music box feel
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + duration);
      oscHarmonic.stop(now + duration);
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  // Sound effect: Sparkle / Star cascade
  public playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playTone(note, 0.3, 'sine', 0.1);
      }, i * 50);
    });
  }

  // Sound effect: Candle blow / Wind whoosh
  public playBlowSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // fallback
    }
  }

  // Sound effect: Celebration Fanfare / Unbox
  public playFanfare() {
    const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    melody.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.4, 'triangle', 0.18);
      }, i * 80);
    });
  }

  // Sound effect: Envelope Unseal Stamp Break
  public playWaxSeal() {
    this.playTone(440, 0.1, 'square', 0.08);
    setTimeout(() => {
      this.playTone(880, 0.25, 'sine', 0.15);
    }, 80);
  }

  // Sound effect: Cute pop on heart tap
  public playHeartPop() {
    const tones = [587.33, 659.25, 739.99, 880, 987.77, 1046.50];
    const pick = tones[Math.floor(Math.random() * tones.length)];
    this.playTone(pick, 0.2, 'sine', 0.20);
  }

  // Music Box Happy Birthday Melody sequence
  private melodyNotes: { note: number; dur: number }[] = [
    { note: 261.63, dur: 360 }, // Happy
    { note: 261.63, dur: 360 }, // Birth-
    { note: 293.66, dur: 720 }, // -day
    { note: 261.63, dur: 720 }, // to
    { note: 349.23, dur: 720 }, // you
    { note: 329.63, dur: 1200 }, // ~

    { note: 261.63, dur: 360 }, // Happy
    { note: 261.63, dur: 360 }, // Birth-
    { note: 293.66, dur: 720 }, // -day
    { note: 261.63, dur: 720 }, // to
    { note: 392.00, dur: 720 }, // you
    { note: 349.23, dur: 1200 }, // ~

    { note: 261.63, dur: 360 }, // Happy
    { note: 261.63, dur: 360 }, // Birth-
    { note: 523.25, dur: 720 }, // -day
    { note: 440.00, dur: 720 }, // dear
    { note: 349.23, dur: 720 }, // Shamsunnahar
    { note: 329.63, dur: 720 }, // SANJI
    { note: 293.66, dur: 1200 }, // SHIMPANJI

    { note: 466.16, dur: 360 }, // Happy
    { note: 466.16, dur: 360 }, // Birth-
    { note: 440.00, dur: 720 }, // -day
    { note: 349.23, dur: 720 }, // to
    { note: 392.00, dur: 720 }, // you
    { note: 349.23, dur: 1600 }, // ~
  ];

  public toggleBgm(callback?: (playing: boolean) => void) {
    if (this.isPlayingBgm) {
      this.stopBgm();
      if (callback) callback(false);
    } else {
      this.startBgm();
      if (callback) callback(true);
    }
  }

  public startBgm() {
    this.initCtx();
    this.isPlayingBgm = true;
    this.currentNoteIndex = 0;
    this.playNextBgmNote();
  }

  private playNextBgmNote() {
    if (!this.isPlayingBgm) return;

    const item = this.melodyNotes[this.currentNoteIndex];
    this.playTone(item.note, item.dur / 1000 * 0.95, 'sine', 0.1);

    // Warm bass chord support
    if (this.currentNoteIndex % 4 === 0) {
      this.playTone(item.note * 0.5, 1.4, 'triangle', 0.06);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
    
    // Add brief pause between loops
    const delay = this.currentNoteIndex === 0 ? item.dur + 1200 : item.dur;
    this.bgmTimeout = window.setTimeout(() => {
      this.playNextBgmNote();
    }, delay);
  }

  public stopBgm() {
    this.isPlayingBgm = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingBgm;
  }
}

export const audioSynth = new BirthdayAudioSynth();
