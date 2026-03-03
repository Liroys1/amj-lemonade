import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence} from 'remotion';
import {C, headingFont, scriptFont} from '../components/styles';
import {LemonIcon} from '../components/LemonIcon';

const differentiators = [
  {icon: '🧭', title: 'Self-Directed', desc: 'No hand-holding. Makers own their journey from day one.'},
  {icon: '🤖', title: 'AI-Native', desc: 'AI woven into every layer — not bolted on as an afterthought.'},
  {icon: '🎯', title: 'Role-Based Intelligence', desc: 'Three distinct views. One unified system. Zero wasted motion.'},
  {icon: '🔄', title: 'Continuous Feedback', desc: 'Every contribution tracked, every signal visible, every gap addressed.'},
];

const KeyDifferentiators: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFF5F9 0%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{textAlign: 'center', marginBottom: 50, opacity: titleOpacity}}>
        <p style={{fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.pink, marginBottom: 12}}>WHAT MAKES THIS DIFFERENT</p>
        <h1 style={{fontFamily: headingFont, fontSize: 46, color: C.dark, fontWeight: 700}}>
          Not just a plan — a living system
        </h1>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, width: 1050}}>
        {differentiators.map((d, i) => {
          const delay = 25 + i * 20;
          const enter = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 90}});
          const y = interpolate(enter, [0, 1], [50, 0]);

          return (
            <div key={i} style={{
              background: C.white,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              padding: '28px 24px',
              display: 'flex',
              gap: 18,
              opacity: enter,
              transform: `translateY(${y}px)`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${C.pink}08`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                flexShrink: 0,
              }}>{d.icon}</div>
              <div>
                <h3 style={{fontSize: 19, fontWeight: 700, color: C.dark, marginBottom: 6}}>{d.title}</h3>
                <p style={{fontSize: 14, color: C.textSec, lineHeight: 1.5}}>{d.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PersonalStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const quoteEnter = spring({frame: frame - 15, fps, config: {damping: 18, stiffness: 80}});
  const quoteY = interpolate(quoteEnter, [0, 1], [30, 0]);

  const nameEnter = spring({frame: frame - 50, fps, config: {damping: 18}});

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #FFF5F9 50%, #F0F4FF 100%)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 900,
        textAlign: 'center',
        opacity: quoteEnter,
        transform: `translateY(${quoteY}px)`,
      }}>
        <div style={{fontSize: 60, color: C.pink, marginBottom: 20, opacity: 0.3}}>"</div>
        <p style={{
          fontFamily: headingFont,
          fontSize: 32,
          color: C.dark,
          lineHeight: 1.6,
          fontWeight: 500,
          fontStyle: 'italic',
        }}>
          I didn't just design an onboarding plan.{'\n'}
          I built a living system that learns, adapts,{'\n'}
          and grows with every maker who joins.
        </p>
        <div style={{fontSize: 60, color: C.pink, marginTop: 20, opacity: 0.3}}>"</div>
      </div>

      <div style={{
        marginTop: 40,
        opacity: nameEnter,
        textAlign: 'center',
      }}>
        <p style={{fontSize: 18, fontWeight: 600, color: C.dark}}>Liran Shulman</p>
        <p style={{fontSize: 14, color: C.textSec, marginTop: 4}}>L&D Designer</p>
      </div>
    </AbsoluteFill>
  );
};

const FinalFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const iconScale = spring({frame: frame - 10, fps, config: {damping: 12, stiffness: 80}});
  const textEnter = spring({frame: frame - 30, fps, config: {damping: 18}});
  const subtitleEnter = spring({frame: frame - 55, fps, config: {damping: 18}});

  const fadeOut = frame > durationInFrames - 45
    ? interpolate(frame, [durationInFrames - 45, durationInFrames], [1, 0], {extrapolateRight: 'clamp'})
    : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F9 40%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: fadeOut,
    }}>
      <div style={{
        transform: `scale(${iconScale})`,
        marginBottom: 30,
      }}>
        <LemonIcon size={100} />
      </div>

      <div style={{textAlign: 'center', opacity: textEnter}}>
        <h1 style={{
          fontFamily: headingFont,
          fontSize: 52,
          color: C.dark,
          fontWeight: 700,
          marginBottom: 8,
        }}>
          AMJ
        </h1>
        <p style={{
          fontSize: 20,
          color: C.textSec,
          letterSpacing: '0.15em',
          fontWeight: 500,
        }}>
          Autonomous Maker Journey
        </p>
      </div>

      <div style={{
        marginTop: 50,
        opacity: subtitleEnter,
        textAlign: 'center',
      }}>
        <p style={{fontSize: 15, color: C.textTer}}>
          Built with 🍋 for Lemonade
        </p>
        <p style={{fontSize: 13, color: C.textTer, marginTop: 8, opacity: 0.7}}>
          liran shulman — 2025
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // Closing scene is 1440 frames (48 seconds) total
  // Sub-scenes:
  // 0-540 (0-18s): Key Differentiators
  // 540-960 (18-32s): Personal Statement
  // 960-1440 (32-48s): Final Frame with logo

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={540} name="Key Differentiators">
        <KeyDifferentiators />
      </Sequence>

      <Sequence from={480} durationInFrames={480} name="Personal Statement">
        <PersonalStatement />
      </Sequence>

      <Sequence from={900} durationInFrames={540} name="Final Frame">
        <FinalFrame />
      </Sequence>
    </AbsoluteFill>
  );
};
