import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {LemonIcon} from '../components/LemonIcon';
import {C, headingFont, scriptFont} from '../components/styles';

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const iconScale = spring({frame, fps, config: {damping: 12, stiffness: 100}});
  const titleOpacity = spring({frame: frame - 20, fps, config: {damping: 200}});
  const subtitleOpacity = spring({frame: frame - 40, fps, config: {damping: 200}});
  const lineWidth = spring({frame: frame - 30, fps, config: {damping: 20, stiffness: 80}});

  // Exit fade
  const exitOpacity = frame > 90 ? interpolate(frame, [90, 120], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F9 40%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      <div style={{textAlign: 'center'}}>
        <div style={{transform: `scale(${iconScale})`, marginBottom: 24}}>
          <LemonIcon size={160} />
        </div>

        <div style={{opacity: titleOpacity, marginBottom: 12}}>
          <span style={{
            fontFamily: scriptFont,
            fontSize: 64,
            color: C.pink,
          }}>Lemonade</span>
        </div>

        <div style={{
          width: interpolate(lineWidth, [0, 1], [0, 200]),
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.pink}, transparent)`,
          margin: '0 auto 20px',
        }}/>

        <div style={{opacity: subtitleOpacity}}>
          <p style={{
            fontSize: 20,
            color: C.textSec,
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>Onboarding Reimagined</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
