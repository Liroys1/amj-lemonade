import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';

const letters = [
  {letter: 'A', word: 'Autonomous', desc: 'Self-directed learning at your own pace'},
  {letter: 'M', word: 'Maker', desc: 'We don\'t have employees, we have Makers'},
  {letter: 'J', word: 'Journey', desc: 'A continuous path from Day 1 to ownership'},
];

export const MeetAMJ: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const exitOpacity = frame > durationInFrames - 20 ? interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFF5F9 0%, #FFFFFF 50%, #FFF0F6 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      <div style={{textAlign: 'center', marginBottom: 48}}>
        <p style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.textTer,
          marginBottom: 16,
          opacity: spring({frame, fps, config: {damping: 200}}),
        }}>MEET</p>
      </div>

      <div style={{display: 'flex', gap: 60, alignItems: 'flex-start'}}>
        {letters.map((item, i) => {
          const delay = 15 + i * 20;
          const enter = spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 80}});
          const scale = interpolate(enter, [0, 1], [0.3, 1]);
          const y = interpolate(enter, [0, 1], [60, 0]);

          return (
            <div key={i} style={{
              textAlign: 'center',
              transform: `scale(${scale}) translateY(${y}px)`,
              opacity: enter,
            }}>
              <div style={{
                width: 140,
                height: 140,
                borderRadius: 28,
                background: `linear-gradient(135deg, ${C.pink}, ${C.pinkDark})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 12px 40px rgba(255,0,131,0.3)',
              }}>
                <span style={{fontSize: 72, fontWeight: 900, color: C.white}}>{item.letter}</span>
              </div>
              <h2 style={{fontSize: 32, fontWeight: 800, color: C.dark, marginBottom: 8}}>{item.word}</h2>
              <p style={{fontSize: 16, color: C.textSec, maxWidth: 220}}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
