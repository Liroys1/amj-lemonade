import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {MockScreen} from '../components/MockScreen';
import {LemonIcon} from '../components/LemonIcon';
import {C, headingFont} from '../components/styles';

// Two sub-screens: Welcome (first half) and Dashboard (second half)
const WelcomeContent: React.FC = () => (
  <div style={{textAlign: 'center', paddingTop: 8}}>
    <LemonIcon size={80}/>
    <h2 style={{fontFamily: headingFont, fontSize: 32, color: C.dark, margin: '12px 0 8px', fontWeight: 700}}>Welcome to Lemonade, Maya!</h2>
    <p style={{fontSize: 15, color: C.textSec, marginBottom: 20}}>You're joining ~1,300 Lemonade Makers on a mission to turn insurance into a social good.</p>
    <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20}}>
      {[
        {title: 'Be a Maker', desc: 'Think like a founder, ship like a startup', color: C.pink},
        {title: 'Giveback', desc: '$2.1M to 45 nonprofits in 2025', color: '#f472b6'},
        {title: 'AI-Native', desc: 'AI isn\'t a tool — it\'s how we think', color: '#ec4899'},
      ].map((card, i) => (
        <div key={i} style={{width: 200, background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: '20px 16px', textAlign: 'center'}}>
          <h4 style={{fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 6}}>{card.title}</h4>
          <p style={{fontSize: 12, color: C.textSec}}>{card.desc}</p>
        </div>
      ))}
    </div>
    <div style={{display: 'flex', gap: 12, justifyContent: 'center'}}>
      {['Ground Yourself', 'Sandbox', 'Squad Experience', 'Ownership'].map((p, i) => (
        <div key={i} style={{background: i === 0 ? `${C.pink}15` : C.white, border: `1px solid ${i === 0 ? C.pink : C.border}`, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, color: i === 0 ? C.pink : C.textSec}}>
          W{i+1}: {p}
        </div>
      ))}
    </div>
  </div>
);

const DashboardContent: React.FC = () => (
  <div>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20}}>
      <LemonIcon size={40}/>
      <div>
        <h2 style={{fontSize: 24, fontWeight: 700, color: C.dark}}>Good morning, Maya!</h2>
        <p style={{fontSize: 13, color: C.textSec}}>Here's your onboarding snapshot</p>
      </div>
    </div>
    {/* Stat cards */}
    <div style={{display: 'flex', gap: 14, marginBottom: 20}}>
      {[
        {label: 'Day', value: '8/30', sub: 'Phase 2: Sandbox', color: C.pink},
        {label: 'Health', value: '82', sub: 'On track', color: C.green},
        {label: 'Contributions', value: '5', sub: '3 shipped', color: C.blue},
        {label: 'Avg AI %', value: '34%', sub: 'Good balance', color: C.green},
      ].map((stat, i) => (
        <div key={i} style={{flex: 1, background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: '16px 14px'}}>
          <p style={{fontSize: 11, color: C.textTer, fontWeight: 600, marginBottom: 4}}>{stat.label}</p>
          <p style={{fontSize: 28, fontWeight: 800, color: stat.color}}>{stat.value}</p>
          <p style={{fontSize: 11, color: C.textSec}}>{stat.sub}</p>
        </div>
      ))}
    </div>
    {/* Cards row */}
    <div style={{display: 'flex', gap: 14}}>
      <div style={{flex: 1, background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16}}>
        <h4 style={{fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 10}}>Today's Schedule</h4>
        {['9:00 — Squad Standup', '11:00 — Buddy Check-in', '14:00 — Culture Workshop'].map((item, i) => (
          <p key={i} style={{fontSize: 12, color: C.textSec, padding: '6px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none'}}>{item}</p>
        ))}
      </div>
      <div style={{flex: 1, background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16}}>
        <h4 style={{fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 10}}>Open Work</h4>
        {[{title: 'PR: Fix checkout flow', status: 'In Review', color: C.amber}, {title: 'Audit: Search UX', status: 'Draft', color: C.textTer}].map((item, i) => (
          <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 1 ? `1px solid ${C.border}` : 'none'}}>
            <span style={{fontSize: 12, color: C.dark}}>{item.title}</span>
            <span style={{fontSize: 10, fontWeight: 600, color: item.color}}>{item.status}</span>
          </div>
        ))}
      </div>
      <div style={{flex: 1, background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16}}>
        <h4 style={{fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 10}}>Recent Activity</h4>
        {['Shipped PR #142', 'Completed Culture Quiz', 'Logged AI usage (28%)'].map((item, i) => (
          <p key={i} style={{fontSize: 12, color: C.textSec, padding: '6px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none'}}>{item}</p>
        ))}
      </div>
    </div>
  </div>
);

export const MakerView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const showDash = frame > durationInFrames / 2;
  const crossfade = showDash ? spring({frame: frame - durationInFrames / 2, fps, config: {damping: 200}, durationInFrames: 30}) : 0;
  const exitOpacity = frame > durationInFrames - 20 ? interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {extrapolateRight: 'clamp'}) : 1;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #FFF5F9 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      {/* Label */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: titleOpacity,
      }}>
        <span style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.pink,
          background: `${C.pink}10`,
          padding: '6px 20px',
          borderRadius: 20,
        }}>{showDash ? 'MAKER — DASHBOARD' : 'MAKER — WELCOME'}</span>
      </div>

      {/* Welcome screen */}
      <div style={{
        position: 'absolute',
        opacity: 1 - crossfade,
        transform: `scale(${1 - crossfade * 0.05})`,
      }}>
        <MockScreen title="Welcome" role="maker" delay={10}>
          <WelcomeContent />
        </MockScreen>
      </div>

      {/* Dashboard screen */}
      {showDash && (
        <div style={{
          position: 'absolute',
          opacity: crossfade,
          transform: `scale(${0.95 + crossfade * 0.05})`,
        }}>
          <MockScreen title="Dashboard" role="maker" delay={0}>
            <DashboardContent />
          </MockScreen>
        </div>
      )}
    </AbsoluteFill>
  );
};
