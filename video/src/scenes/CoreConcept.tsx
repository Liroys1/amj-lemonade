import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * CoreConcept — 300 frames (10s @ 30fps)
 * Shows the 2-3 key design principles from the onboarding document
 * before diving into the 30-day journey and app views.
 * Uses animated infographic-style elements drawn progressively.
 */

// Inline icon components — Lemonade pink style
const RealWorkIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 26V14l8-8 8 8v12" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 26v-7h6v7" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 14l12-10 12 10" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const JudgmentIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    {/* Scale/balance — judgment */}
    <line x1="16" y1="4" x2="16" y2="26" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M6 12l10-4 10 4" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12l-2 8h8l-2-8" stroke={C.pink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 12l-2 8h8l-2-8" stroke={C.pink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="10" y1="26" x2="22" y2="26" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const FeedbackIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    {/* Circular arrows — continuous feedback */}
    <path d="M27 6v7h-7" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 26v-7h7" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 11A11 11 0 0127 13" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M24.5 21A11 11 0 015 19" stroke={C.pink} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const principles = [
  {
    Icon: RealWorkIcon,
    title: 'Every Task is Real Work',
    desc: 'No training exercises. From Day 1, everything ships.',
  },
  {
    Icon: JudgmentIcon,
    title: 'AI Accelerates. Review Builds Judgment.',
    desc: 'The review is where understanding is built.',
  },
  {
    Icon: FeedbackIcon,
    title: 'Continuous Feedback Loop',
    desc: 'Every contribution reviewed, reflected on, improved.',
  },
];

// 4-phase progression model
const phases = [
  {name: 'Observer', days: 'Days 1-3', desc: 'Explore, ask, shadow'},
  {name: 'Apprentice', days: 'Days 4-10', desc: 'Small, reviewed contributions'},
  {name: 'Practitioner', days: 'Days 11-18', desc: 'Own a slice, present findings'},
  {name: 'Junior Peer', days: 'Days 19-30', desc: 'Full velocity, give feedback'},
];

export const CoreConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 30
    ? interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateRight: 'clamp'})
    : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F9 40%, #F0F4FF 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      {/* Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: 44,
        opacity: titleOpacity,
      }}>
        <p style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase' as const,
          color: C.pink,
          marginBottom: 12,
        }}>
          CORE DESIGN PRINCIPLES
        </p>
        <h1 style={{
          fontFamily: headingFont,
          fontSize: 46,
          color: C.dark,
          fontWeight: 700,
        }}>
          Build While You Learn
        </h1>
      </div>

      {/* 3 Principle cards in a row */}
      <div style={{
        display: 'flex',
        gap: 28,
        marginBottom: 48,
      }}>
        {principles.map((p, i) => {
          const delay = 25 + i * 22;
          const enter = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 90}});
          const y = interpolate(enter, [0, 1], [40, 0]);

          return (
            <div key={i} style={{
              width: 310,
              background: C.white,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              padding: '28px 24px',
              textAlign: 'center',
              opacity: enter,
              transform: `translateY(${y}px)`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `${C.pink}08`,
                border: `1.5px solid ${C.pink}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <p.Icon />
              </div>
              <h3 style={{
                fontSize: 17,
                fontWeight: 700,
                color: C.dark,
                marginBottom: 8,
                lineHeight: 1.3,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: C.textSec,
                lineHeight: 1.4,
              }}>
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 4-Phase progression bar */}
      {(() => {
        const barDelay = 100;
        const barEnter = spring({frame: frame - barDelay, fps, config: {damping: 20, stiffness: 60}});
        const barWidth = interpolate(barEnter, [0, 1], [0, 100]);

        return (
          <div style={{
            opacity: interpolate(barEnter, [0, 0.1, 1], [0, 1, 1]),
            width: 1000,
          }}>
            {/* Section label */}
            <div style={{
              textAlign: 'center',
              marginBottom: 20,
              opacity: barEnter,
            }}>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: C.textTer,
              }}>
                THE PROGRESSION MODEL
              </span>
            </div>

            {/* Progress bar background */}
            <div style={{
              height: 4,
              background: C.border,
              borderRadius: 2,
              position: 'relative' as const,
              marginBottom: 8,
            }}>
              {/* Animated pink fill */}
              <div style={{
                height: '100%',
                width: `${barWidth}%`,
                background: `linear-gradient(to right, ${C.pink}60, ${C.pink})`,
                borderRadius: 2,
              }} />
            </div>

            {/* Phase labels */}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {phases.map((phase, i) => {
                const phaseDelay = barDelay + 20 + i * 15;
                const phaseEnter = spring({frame: frame - phaseDelay, fps, config: {damping: 18}});

                return (
                  <div key={i} style={{
                    textAlign: 'center',
                    width: '25%',
                    opacity: phaseEnter,
                  }}>
                    {/* Dot on the bar */}
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: C.pink,
                      margin: '-11px auto 10px',
                      boxShadow: `0 0 8px ${C.pink}40`,
                    }} />
                    <p style={{fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 2}}>
                      {phase.name}
                    </p>
                    <p style={{fontSize: 11, color: C.pink, fontWeight: 600, marginBottom: 4}}>
                      {phase.days}
                    </p>
                    <p style={{fontSize: 12, color: C.textSec}}>
                      {phase.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
