import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {MockScreen} from '../components/MockScreen';
import {C, headingFont} from '../components/styles';

const kpis = [
  {label: 'Avg First Contribution', value: '8.3 days', trend: '↓ 2.1d vs last cohort', color: C.pink},
  {label: 'Avg Health Score', value: '79', trend: '↑ 4 pts vs W3', color: C.green},
  {label: 'Fresh Eyes in Backlog', value: '7/10', trend: '7 added this month', color: C.green},
  {label: 'Verification Rate', value: '85%', trend: '4 past Day 20', color: C.pink},
  {label: 'Avg AI Reliance', value: '32%', trend: '↓ 8% vs W1', color: C.green},
  {label: 'Near Completion', value: '3/10', trend: '3 past Day 25', color: C.blue},
];

const StratOverContent: React.FC = () => (
  <div>
    <div style={{marginBottom: 16}}>
      <h2 style={{fontSize: 22, fontWeight: 700, color: C.dark}}>Program Overview</h2>
      <p style={{fontSize: 13, color: C.textSec}}>Cross-team onboarding intelligence — 10 active makers</p>
    </div>
    {/* KPI grid */}
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18}}>
      {kpis.map((kpi, i) => (
        <div key={i} style={{background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: '14px 16px'}}>
          <p style={{fontSize: 10, color: C.textTer, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em'}}>{kpi.label}</p>
          <p style={{fontSize: 26, fontWeight: 800, color: kpi.color, marginBottom: 2}}>{kpi.value}</p>
          <p style={{fontSize: 10, color: C.textSec}}>{kpi.trend}</p>
        </div>
      ))}
    </div>
    {/* Effectiveness section header */}
    <h3 style={{fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 10}}>Program Effectiveness</h3>
    <div style={{display: 'flex', gap: 12}}>
      {[
        {label: 'Time to First Contribution', value: '8.3d', target: '<10 days', pct: 83},
        {label: 'Manager Confidence', value: '78%', target: '>75%', pct: 78},
        {label: 'Projected 6-Mo Retention', value: '92%', target: '>90%', pct: 92},
      ].map((m, i) => (
        <div key={i} style={{flex: 1, background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: '12px 14px'}}>
          <p style={{fontSize: 10, color: C.textTer, fontWeight: 600, marginBottom: 6}}>{m.label}</p>
          <p style={{fontSize: 20, fontWeight: 800, color: C.dark}}>{m.value}</p>
          <div style={{height: 4, borderRadius: 2, background: C.border, marginTop: 6}}>
            <div style={{height: '100%', borderRadius: 2, background: m.pct >= 75 ? C.green : C.amber, width: `${m.pct}%`}}/>
          </div>
          <p style={{fontSize: 9, color: C.textTer, marginTop: 4}}>Target: {m.target}</p>
        </div>
      ))}
    </div>
  </div>
);

export const StrategyView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 20 ? interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #F0FFE8 50%, #FFF5F9 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      <div style={{position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity}}>
        <span style={{fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.green, background: `${C.green}10`, padding: '6px 20px', borderRadius: 20}}>STRATEGY — OVERVIEW</span>
      </div>
      <MockScreen title="Overview" role="strategy" delay={10}>
        <StratOverContent />
      </MockScreen>
    </AbsoluteFill>
  );
};
