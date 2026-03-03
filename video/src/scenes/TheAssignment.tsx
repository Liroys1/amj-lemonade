import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';

export const TheAssignment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enterOpacity = spring({frame, fps, config: {damping: 200}});
  const cardScale = spring({frame: frame - 15, fps, config: {damping: 15, stiffness: 100}});
  const exitOpacity = frame > durationInFrames - 30 ? interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  const lines = [
    'Design a 30-day onboarding program',
    'for Lemonade\'s new hires.',
    '',
    'Make it role-specific, AI-native,',
    'and measurable from Day 1.',
  ];

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F6 50%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: enterOpacity * exitOpacity,
    }}>
      <div style={{textAlign: 'center', marginBottom: 40}}>
        <p style={{
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.pink,
          marginBottom: 16,
        }}>THE ASSIGNMENT</p>
        <h1 style={{
          fontFamily: headingFont,
          fontSize: 52,
          color: C.dark,
          fontWeight: 700,
        }}>I was asked to build something</h1>
      </div>

      {/* Document card */}
      <div style={{
        transform: `scale(${cardScale})`,
        width: 700,
        background: C.white,
        borderRadius: 20,
        border: `1px solid ${C.border}`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        padding: '48px 56px',
        position: 'relative',
      }}>
        {/* Document icon top-left */}
        <div style={{
          position: 'absolute',
          top: -20,
          left: 30,
          width: 40,
          height: 40,
          borderRadius: 10,
          background: C.pink,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(255,0,131,0.3)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>

        {lines.map((line, i) => {
          const lineDelay = 30 + i * 12;
          const lineOpacity = spring({frame: frame - lineDelay, fps, config: {damping: 200}});
          const lineX = interpolate(
            spring({frame: frame - lineDelay, fps, config: {damping: 20, stiffness: 120}}),
            [0, 1], [30, 0]
          );

          if (line === '') return <div key={i} style={{height: 16}}/>;
          return (
            <p key={i} style={{
              fontSize: 28,
              lineHeight: 1.6,
              color: i < 2 ? C.dark : C.textSec,
              fontWeight: i < 2 ? 600 : 400,
              opacity: lineOpacity,
              transform: `translateX(${lineX}px)`,
            }}>{line}</p>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
