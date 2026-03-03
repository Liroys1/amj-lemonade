import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {MockScreen} from '../components/MockScreen';
import {C, headingFont} from '../components/styles';

const teamMembers = [
  {name: 'Maya Cohen', role: 'Engineer', day: 8, health: 82, phase: 'Sandbox', contribs: 5, color: '#2563eb'},
  {name: 'Ava Chen', role: 'Designer', day: 14, health: 91, phase: 'Squad Exp.', contribs: 8, color: '#9333ea'},
  {name: 'Liam Park', role: 'PM', day: 5, health: 67, phase: 'Ground', contribs: 2, color: '#d97706'},
  {name: 'Noa Levy', role: 'Engineer', day: 22, health: 95, phase: 'Ownership', contribs: 12, color: '#2563eb'},
];

const TeamDashContent: React.FC = () => (
  <div>
    <div style={{marginBottom: 20}}>
      <h2 style={{fontSize: 24, fontWeight: 700, color: C.dark}}>Team Dashboard</h2>
      <p style={{fontSize: 14, color: C.textSec}}>Monitor your direct reports' onboarding — {teamMembers.length} reports</p>
    </div>
    {/* Filter pills */}
    <div style={{display: 'flex', gap: 8, marginBottom: 18}}>
      {[{label: 'All', count: 4, active: true}, {label: 'On Track', count: 3}, {label: 'Needs Attention', count: 1}, {label: 'At Risk', count: 0}].map((f, i) => (
        <span key={i} style={{
          padding: '5px 14px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          background: f.active ? C.pink : C.white,
          color: f.active ? C.white : C.textSec,
          border: `1px solid ${f.active ? C.pink : C.border}`,
        }}>{f.label} ({f.count})</span>
      ))}
    </div>
    {/* Team cards */}
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
      {teamMembers.map((m, i) => (
        <div key={i} style={{background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16, display: 'flex', gap: 14}}>
          <div style={{width: 44, height: 44, borderRadius: '50%', background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <span style={{fontSize: 16, fontWeight: 700, color: m.color}}>{m.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div style={{flex: 1}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h4 style={{fontSize: 15, fontWeight: 700, color: C.dark}}>{m.name}</h4>
              <span style={{fontSize: 10, fontWeight: 600, color: m.role === 'Engineer' ? '#2563eb' : m.role === 'Designer' ? '#9333ea' : '#d97706', background: m.role === 'Engineer' ? '#2563eb10' : m.role === 'Designer' ? '#9333ea10' : '#d9770610', padding: '2px 8px', borderRadius: 4}}>{m.role}</span>
            </div>
            <div style={{display: 'flex', gap: 16, marginTop: 8}}>
              <span style={{fontSize: 11, color: C.textSec}}>Day <b style={{color: C.dark}}>{m.day}/30</b></span>
              <span style={{fontSize: 11, color: C.textSec}}>Health <b style={{color: m.health >= 75 ? C.green : C.amber}}>{m.health}</b></span>
              <span style={{fontSize: 11, color: C.textSec}}>{m.contribs} contributions</span>
            </div>
            <div style={{marginTop: 6, fontSize: 11, color: C.pink, fontWeight: 600}}>{m.phase}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const LeadView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const exitOpacity = frame > durationInFrames - 20 ? interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #F0F4FF 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      <div style={{position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', opacity: titleOpacity}}>
        <span style={{fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.blue, background: `${C.blue}10`, padding: '6px 20px', borderRadius: 20}}>LEAD — TEAM DASHBOARD</span>
      </div>
      <MockScreen title="Team Dashboard" role="lead" delay={10}>
        <TeamDashContent />
      </MockScreen>
    </AbsoluteFill>
  );
};
