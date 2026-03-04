import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * TheAssignment — 240 frames (8s @ 30fps)
 * Beautiful serif typography — no box/card. Just elegant text that appears line by line.
 */

export const TheAssignment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enterOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 30
    ? interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateRight: 'clamp'})
    : 1;

  // Label entrance
  const labelOpacity = spring({frame: frame - 5, fps, config: {damping: 200}});

  // Line-by-line text reveal
  const lines = [
    {text: 'I was asked to build', bold: true, delay: 15},
    {text: 'a 30-day onboarding program', bold: true, delay: 30},
    {text: 'for Lemonade\u2019s new hires.', bold: true, delay: 45},
    {text: '', bold: false, delay: 0}, // spacer
    {text: 'Make it role-specific, AI-native,', bold: false, delay: 70},
    {text: 'and measurable from Day 1.', bold: false, delay: 85},
  ];

  // Decorative accent line
  const accentWidth = interpolate(
    spring({frame: frame - 100, fps, config: {damping: 20, stiffness: 80}}),
    [0, 1],
    [0, 120],
  );

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F6 50%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: enterOpacity * exitOpacity,
    }}>
      {/* Label */}
      <div style={{
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: labelOpacity,
      }}>
        <span style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase' as const,
          color: C.pink,
        }}>
          THE ASSIGNMENT
        </span>
      </div>

      {/* Main text — elegant serif */}
      <div style={{
        textAlign: 'center',
        maxWidth: 950,
        padding: '0 40px',
      }}>
        {lines.map((line, i) => {
          if (line.text === '') return <div key={i} style={{height: 28}} />;

          const lineSpring = spring({
            frame: frame - line.delay,
            fps,
            config: {damping: 200},
          });
          const lineY = interpolate(
            spring({frame: frame - line.delay, fps, config: {damping: 20, stiffness: 100}}),
            [0, 1],
            [20, 0],
          );

          return (
            <p key={i} style={{
              fontFamily: headingFont,
              fontSize: line.bold ? 48 : 38,
              lineHeight: 1.5,
              color: line.bold ? C.dark : C.textSec,
              fontWeight: line.bold ? 600 : 400,
              fontStyle: line.bold ? 'normal' : 'italic',
              opacity: lineSpring,
              transform: `translateY(${lineY}px)`,
              margin: 0,
              padding: 0,
            }}>
              {line.text}
            </p>
          );
        })}

        {/* Pink accent line under text */}
        <div style={{
          width: accentWidth,
          height: 3,
          background: C.pink,
          borderRadius: 2,
          margin: '30px auto 0',
          opacity: 0.6,
        }} />
      </div>
    </AbsoluteFill>
  );
};
