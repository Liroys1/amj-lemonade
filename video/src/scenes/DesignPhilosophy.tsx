import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * DesignPhilosophy — 300 frames (10s @ 30fps)
 * Shows the 30-Day Journey timeline with 4 phases.
 * Icons redesigned to match Lemonade's clean, pink-accented visual language.
 */

// Lemonade-style inline SVG icons — all pink, clean, rounded

const LemonPhaseIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="17" rx="10" ry="9.5" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 7.5c-1-4 3-7 6-6.5s4 5 2 8" stroke={C.pink} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="13" cy="16" r="1.2" fill={C.pink} opacity="0.2"/>
    <circle cx="19" cy="16" r="1.2" fill={C.pink} opacity="0.2"/>
    <circle cx="16" cy="20" r="1.5" fill={C.pink} opacity="0.15"/>
  </svg>
);

const SandboxPhaseIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Beaker with bubbles — experimentation */}
    <path d="M12 6h8" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M13 6v7l-5 8a2.5 2.5 0 002 4h12a2.5 2.5 0 002-4l-5-8V6" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="20" r="1.2" fill={C.pink} opacity="0.25"/>
    <circle cx="18" cy="22" r="1" fill={C.pink} opacity="0.2"/>
    <circle cx="16" cy="18" r="0.8" fill={C.pink} opacity="0.15"/>
  </svg>
);

const SquadPhaseIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Three people — squad/team */}
    <circle cx="16" cy="10" r="3.5" stroke={C.pink} strokeWidth="1.8"/>
    <path d="M9 26v-2a7 7 0 0114 0v2" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="7" cy="13" r="2.5" stroke={C.pink} strokeWidth="1.4" opacity="0.5"/>
    <path d="M2 26v-1.5a4.5 4.5 0 015-4.3" stroke={C.pink} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
    <circle cx="25" cy="13" r="2.5" stroke={C.pink} strokeWidth="1.4" opacity="0.5"/>
    <path d="M30 26v-1.5a4.5 4.5 0 00-5-4.3" stroke={C.pink} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const OwnershipPhaseIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Diamond/gem — ownership & craft identity */}
    <path d="M16 4L6 14l10 14 10-14L16 4z" stroke={C.pink} strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M6 14h20" stroke={C.pink} strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M16 4l-4 10 4 14 4-14-4-10" stroke={C.pink} strokeWidth="1.2" opacity="0.4" strokeLinejoin="round"/>
  </svg>
);

const phases = [
  {week: 'Week 1', name: 'Ground Yourself', desc: 'Absorb culture, meet your squad, set up tools', Icon: LemonPhaseIcon},
  {week: 'Week 2', name: 'The Sandbox', desc: 'Make small, safe first contributions', Icon: SandboxPhaseIcon},
  {week: 'Week 3', name: 'Squad Experience', desc: 'Own a task end-to-end, present Fresh Eyes Audit', Icon: SquadPhaseIcon},
  {week: 'Week 4', name: 'Ownership', desc: 'Lead a feature, solidify your craft identity', Icon: OwnershipPhaseIcon},
];

export const DesignPhilosophy: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 30 ? interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #FFF5F9 50%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      <div style={{textAlign: 'center', marginBottom: 50, opacity: titleOpacity}}>
        <p style={{fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.pink, marginBottom: 12}}>DESIGN PHILOSOPHY</p>
        <h1 style={{fontFamily: headingFont, fontSize: 48, color: C.dark, fontWeight: 700}}>The 30-Day Journey</h1>
        <p style={{fontSize: 20, color: C.textSec, marginTop: 8}}>From Day One to Full Ownership</p>
      </div>

      {/* Timeline */}
      <div style={{display: 'flex', alignItems: 'flex-start', gap: 24, position: 'relative'}}>
        {/* Connecting line — gradient pink */}
        <div style={{
          position: 'absolute',
          top: 44,
          left: 60,
          right: 60,
          height: 3,
          background: `linear-gradient(to right, ${C.pink}40, ${C.pink}, ${C.pink}40)`,
          borderRadius: 2,
          zIndex: 0,
        }}/>

        {phases.map((phase, i) => {
          const delay = 30 + i * 25;
          const phaseEnter = spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 100}});
          const phaseScale = interpolate(phaseEnter, [0, 1], [0.5, 1]);
          const phaseY = interpolate(phaseEnter, [0, 1], [40, 0]);

          return (
            <div key={i} style={{
              width: 280,
              textAlign: 'center',
              transform: `scale(${phaseScale}) translateY(${phaseY}px)`,
              opacity: phaseEnter,
              zIndex: 1,
            }}>
              {/* Circle with icon — all Lemonade pink */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: C.white,
                border: `2.5px solid ${C.pink}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: `0 4px 20px ${C.pink}20`,
              }}>
                <phase.Icon size={36} />
              </div>

              <p style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.pink,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                marginBottom: 6,
              }}>
                {phase.week}
              </p>
              <h3 style={{fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 8}}>{phase.name}</h3>
              <p style={{fontSize: 15, color: C.textSec, lineHeight: 1.4}}>{phase.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
