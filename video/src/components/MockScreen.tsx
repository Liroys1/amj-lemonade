import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {C} from './styles';

interface MockScreenProps {
  title: string;
  role: 'maker' | 'lead' | 'strategy';
  children: React.ReactNode;
  delay?: number;
}

const navItems: Record<string, string[]> = {
  maker: ['Onboarding', 'Day 1 Tasks', 'Dashboard', 'Weekly Goals', 'My Skills', 'Contributions', 'Review Prep', 'AI Log'],
  lead: ['Onboarding', 'Team Dashboard', 'Employee Progress', 'Team Pulse', '1:1 Prep', 'Alert Center'],
  strategy: ['Onboarding', 'Overview', 'Cohort Analytics', 'Skill Gap Map', 'Attrition Risk', 'Content Intel'],
};

export const MockScreen: React.FC<MockScreenProps> = ({title, role, children, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({frame: frame - delay, fps, config: {damping: 20, stiffness: 120}});
  const scale = interpolate(enter, [0, 1], [0.92, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div style={{
      width: 1400,
      height: 820,
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 25px 80px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)',
      border: `1px solid ${C.border}`,
      display: 'flex',
      transform: `scale(${scale})`,
      opacity,
      background: C.white,
    }}>
      {/* Header */}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 52, background: C.headerBg, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', paddingLeft: 20, paddingRight: 20, zIndex: 2}}>
        <span style={{fontFamily: "'Pacifico', cursive", fontSize: 18, color: C.pink}}>Lemonade</span>
        <span style={{fontSize: 8, fontWeight: 600, letterSpacing: '0.15em', border: `1px solid ${C.pink}60`, color: C.pink, borderRadius: 3, padding: '2px 6px', marginLeft: 8, textTransform: 'uppercase'}}>Internal</span>
        <div style={{flex: 1}}/>
        <div style={{display: 'flex', gap: 4, background: '#F3F4F6', borderRadius: 8, padding: 3}}>
          {(['Maker','Lead','Strategy'] as const).map(r => (
            <span key={r} style={{
              padding: '4px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              background: r.toLowerCase() === role ? C.white : 'transparent',
              color: r.toLowerCase() === role ? C.dark : C.textTer,
              boxShadow: r.toLowerCase() === role ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              borderBottom: r.toLowerCase() === role ? `2px solid ${C.pink}` : 'none',
            }}>{r}</span>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{width: 200, background: C.headerBg, borderRight: `1px solid ${C.border}`, paddingTop: 64, display: 'flex', flexDirection: 'column'}}>
        <p style={{fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', color: C.textTer, padding: '0 16px', marginBottom: 8, textTransform: 'uppercase'}}>
          {role === 'maker' ? 'Maker View' : role === 'lead' ? 'Lead View' : 'Strategy View'}
        </p>
        {navItems[role].map((item, i) => (
          <div key={item} style={{
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: i === 0 ? 600 : 500,
            color: i === 0 ? C.dark : C.textSec,
            background: i === 0 ? 'rgba(255,0,131,0.06)' : 'transparent',
            borderLeft: i === 0 ? `3px solid ${C.pink}` : '3px solid transparent',
            borderRadius: i === 0 ? '0 8px 8px 0' : 0,
          }}>{item}</div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{flex: 1, paddingTop: 52, overflow: 'hidden'}}>
        <div style={{padding: 28, height: '100%', overflow: 'hidden', background: C.bg}}>
          {children}
        </div>
      </div>
    </div>
  );
};
