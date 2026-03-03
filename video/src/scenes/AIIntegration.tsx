import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C, headingFont} from '../components/styles';

const features = [
  {icon: '🤖', title: 'Lemi — AI Companion', desc: 'Context-aware assistant that knows your role, phase, and progress. Ask anything about your onboarding.'},
  {icon: '📊', title: 'AI Usage Tracking', desc: 'Every contribution logs its AI percentage. Not to judge — to learn. Healthy balance around 20-40%.'},
  {icon: '📝', title: 'Contribution Logging', desc: 'Every PR, design, brief, and audit is tracked with quality signals and AI disclosure.'},
  {icon: '🎯', title: 'Smart Nudges', desc: 'Context-aware alerts when something needs attention — stuck work, skill gaps, or low engagement.'},
];

export const AIIntegration: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 30 ? interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FFF5F9 0%, #F0F4FF 50%, #FAFAFA 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      <div style={{textAlign: 'center', marginBottom: 48, opacity: titleOpacity}}>
        <p style={{fontSize: 14, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.pink, marginBottom: 12}}>AI-NATIVE DESIGN</p>
        <h1 style={{fontFamily: headingFont, fontSize: 48, color: C.dark, fontWeight: 700, marginBottom: 8}}>
          AI isn't a tool — it's how we think
        </h1>
        <p style={{fontSize: 20, color: C.textSec}}>Every layer of AMJ is infused with intelligent automation</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 1100}}>
        {features.map((feat, i) => {
          const delay = 30 + i * 18;
          const enter = spring({frame: frame - delay, fps, config: {damping: 15, stiffness: 100}});
          const y = interpolate(enter, [0, 1], [40, 0]);

          return (
            <div key={i} style={{
              background: C.white,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              padding: '32px 28px',
              display: 'flex',
              gap: 20,
              opacity: enter,
              transform: `translateY(${y}px)`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: `${C.pink}08`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                flexShrink: 0,
              }}>{feat.icon}</div>
              <div>
                <h3 style={{fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 8}}>{feat.title}</h3>
                <p style={{fontSize: 15, color: C.textSec, lineHeight: 1.5}}>{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat bubble from Lemi */}
      {frame > 90 && (
        <div style={{
          position: 'absolute',
          bottom: 80,
          right: 120,
          opacity: spring({frame: frame - 90, fps, config: {damping: 15}}),
          transform: `scale(${spring({frame: frame - 90, fps, config: {damping: 12, stiffness: 100}})})`,
        }}>
          <div style={{
            background: C.white,
            borderRadius: '20px 20px 4px 20px',
            padding: '14px 20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            border: `1px solid ${C.border}`,
            maxWidth: 280,
          }}>
            <p style={{fontSize: 13, color: C.textSec}}>
              <span style={{color: C.pink, fontWeight: 700}}>Lemi:</span> "Hey Maya! Your Fresh Eyes Audit is due in 3 days. Want me to help you structure it?"
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
