import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';
import {SeedlingIcon, FlaskIcon, PeopleIcon, TrophyIcon} from '../components/Icons';

const phases = [
  {week: 'Week 1', name: 'Ground Yourself', desc: 'Absorb culture, meet your squad, set up tools', color: '#10b981', Icon: SeedlingIcon},
  {week: 'Week 2', name: 'The Sandbox', desc: 'Make small, safe first contributions', color: '#3b82f6', Icon: FlaskIcon},
  {week: 'Week 3', name: 'Squad Experience', desc: 'Own a task end-to-end, present Fresh Eyes Audit', color: '#9333ea', Icon: PeopleIcon},
  {week: 'Week 4', name: 'Ownership', desc: 'Lead a feature, solidify your craft identity', color: '#FF0083', Icon: TrophyIcon},
];

export const DesignPhilosophy: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 30 ? interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #F0F4FF 50%, #FFF5F9 100%)',
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
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          top: 50,
          left: 60,
          right: 60,
          height: 3,
          background: C.border,
          zIndex: 0,
        }}/>

        {phases.map((phase, i) => {
          const delay = 30 + i * 25;
          const phaseEnter = spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 100}});
          const phaseScale = interpolate(phaseEnter, [0, 1], [0.5, 1]);
          const phaseY = interpolate(phaseEnter, [0, 1], [40, 0]);

          // Progress line fill
          const lineProgress = spring({frame: frame - delay - 10, fps, config: {damping: 200}, durationInFrames: 30});

          return (
            <div key={i} style={{
              width: 280,
              textAlign: 'center',
              transform: `scale(${phaseScale}) translateY(${phaseY}px)`,
              opacity: phaseEnter,
              zIndex: 1,
            }}>
              {/* Circle */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: C.white,
                border: `3px solid ${phase.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 32,
                boxShadow: `0 4px 20px ${phase.color}30`,
              }}><phase.Icon size={32} /></div>

              <p style={{fontSize: 11, fontWeight: 700, color: phase.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6}}>{phase.week}</p>
              <h3 style={{fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 8}}>{phase.name}</h3>
              <p style={{fontSize: 15, color: C.textSec, lineHeight: 1.4}}>{phase.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
