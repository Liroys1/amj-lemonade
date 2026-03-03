import React from 'react';

const defaultProps = {
  fill: 'none' as const,
  stroke: '#FF0083',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** AI / Robot — clean bot face with antenna */
export const RobotIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <circle cx="9" cy="14" r="1.5" />
    <circle cx="15" cy="14" r="1.5" />
    <line x1="12" y1="4" x2="12" y2="8" />
    <circle cx="12" cy="3" r="1" />
    <line x1="2" y1="13" x2="4" y2="13" />
    <line x1="20" y1="13" x2="22" y2="13" />
  </svg>
);

/** Chart / Analytics — simple bar chart */
export const ChartIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="5" y="12" width="3" height="8" rx="1" />
    <rect x="10.5" y="6" width="3" height="14" rx="1" />
    <rect x="16" y="9" width="3" height="11" rx="1" />
  </svg>
);

/** Document / Notes — clean document with lines */
export const DocumentIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8L14 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

/** Target — bullseye with center dot */
export const TargetIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

/** Compass — compass with directional needle */
export const CompassIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

/** Cycle / Feedback — circular arrows */
export const CycleIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

/** Growth / Seedling — small plant sprouting */
export const SeedlingIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M12 22V12" />
    <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8z" />
    <path d="M12 15c0-3 3-6 7-7-1 4-4 7-7 7z" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

/** Sandbox / Experiment — flask / beaker */
export const FlaskIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M9 3h6" />
    <path d="M10 3v7.4a2 2 0 0 1-.5 1.3L4.3 18a2 2 0 0 0 1.5 3.3h12.4a2 2 0 0 0 1.5-3.3l-5.2-6.3a2 2 0 0 1-.5-1.3V3" />
    <path d="M7.5 16h9" />
  </svg>
);

/** Squad / Team — two people side by side */
export const PeopleIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="17" cy="7" r="2.5" />
    <path d="M21 21v-1.5a3.5 3.5 0 0 0-3-3.46" />
  </svg>
);

/** Ownership / Achievement — trophy */
export const TrophyIcon: React.FC<{size?: number}> = ({size = 28}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M8 2h8v10a4 4 0 0 1-8 0V2z" />
    <path d="M8 5H5a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4" />
    <path d="M16 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4" />
    <line x1="12" y1="16" x2="12" y2="19" />
    <path d="M8 22h8" />
    <path d="M10 19h4v3h-4z" />
  </svg>
);
