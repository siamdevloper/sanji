import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, Crown, Gem, Flower2 } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface SvgParticle {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'sparkle' | 'star' | 'crown' | 'gem' | 'flower';
  size: number;
  rotation: number;
  color: string;
  tx: number; // translation X for burst spread
  ty: number; // translation Y for burst float up
}

const PARTICLE_TYPES: SvgParticle['type'][] = ['heart', 'sparkle', 'star', 'crown', 'gem', 'flower'];
const PARTICLE_COLORS = ['#ff3388', '#00f0ff', '#ffffff', '#fb71a4', '#ffe600', '#c084fc'];

export const FloatingHeartsClick: React.FC = () => {
  const [particles, setParticles] = useState<SvgParticle[]>([]);

  useEffect(() => {
    const handleSpawn = (clientX: number, clientY: number) => {
      audioSynth.playHeartPop();

      // Create 3-4 small subtle vector particles
      const burstCount = Math.floor(Math.random() * 2) + 3;
      const now = Date.now();
      const newParticles: SvgParticle[] = [];

      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() * 0.4 - 0.2);
        const distance = Math.random() * 24 + 12;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 35; // gently float upward

        newParticles.push({
          id: now + i + Math.random(),
          x: clientX,
          y: clientY,
          type: PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)],
          size: Math.floor(Math.random() * 4) + 14, // Smaller size: 14px to 18px max
          rotation: Math.floor(Math.random() * 40) - 20,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          tx,
          ty,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove after exactly 1 second (1000ms)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 1000);
    };

    const handleClick = (e: MouseEvent) => {
      handleSpawn(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleSpawn(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  const renderIcon = (type: SvgParticle['type'], size: number, color: string) => {
    const props = {
      style: { width: `${size}px`, height: `${size}px`, color },
      className: 'filter drop-shadow-[0_0_6px_currentColor]',
    };

    switch (type) {
      case 'heart':
        return <Heart {...props} fill={color} />;
      case 'sparkle':
        return <Sparkles {...props} />;
      case 'star':
        return <Star {...props} fill={color} />;
      case 'crown':
        return <Crown {...props} fill={color} />;
      case 'gem':
        return <Gem {...props} />;
      case 'flower':
        return <Flower2 {...props} />;
      default:
        return <Heart {...props} fill={color} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(${p.tx}px, ${p.ty}px) rotate(${p.rotation}deg)`,
          }}
        >
          <div
            style={{
              animation: 'particleFade 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {renderIcon(p.type, p.size, p.color)}
          </div>
        </div>
      ))}
    </div>
  );
};
