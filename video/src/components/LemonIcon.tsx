import React from 'react';

export const LemonIcon: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <ellipse cx="60" cy="62" rx="38" ry="35" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M60 27c-3-12 8-22 18-20s12 16 6 24" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M56 27c-6-8-2-20 8-22" stroke="#FF0083" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="60" cy="62" rx="24" ry="22" stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="48" cy="56" r="3" fill="#FF0083" opacity="0.15"/>
    <circle cx="72" cy="56" r="3" fill="#FF0083" opacity="0.15"/>
    <circle cx="60" cy="72" r="4" fill="#FF0083" opacity="0.12"/>
  </svg>
);
