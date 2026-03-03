import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Video, staticFile} from 'remotion';
import {C, headingFont} from '../components/styles';

export const MakerView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // --- Title fade-in ---
  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleOpacity, [0, 1], [12, 0]);

  // --- Exit fade (last 30 frames) ---
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // --- Browser frame entrance ---
  const frameEntrance = spring({frame: frame - 8, fps, config: {damping: 30, stiffness: 80}});
  const frameScale = interpolate(frameEntrance, [0, 1], [0.92, 1]);
  const frameOpacity = interpolate(frameEntrance, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

  // --- Zoom / pan keyframes ---
  // Phase 1 (frames 0–89, ~0–3s): full view, slightly zoomed out
  // Phase 2 (frames 90–179, ~3–6s): zoom into left sidebar
  // Phase 3 (frames 180–269, ~6–9s): pan to center-right content
  // Phase 4 (frames 270–359, ~9–12s): zoom back out to full view
  // Phase 5 (frames 360–420, ~12–14s): hold + exit fade

  // Scale transitions
  const scalePhase1to2 = spring({
    frame: frame - 90,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });
  const scalePhase2to3 = spring({
    frame: frame - 180,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });
  const scalePhase3to4 = spring({
    frame: frame - 270,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });

  // Scale: 0.95 -> 1.15 -> 1.15 -> 0.95
  const s1 = interpolate(scalePhase1to2, [0, 1], [0.95, 1.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s2 = interpolate(scalePhase2to3, [0, 1], [s1, 1.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s3 = interpolate(scalePhase3to4, [0, 1], [s2, 0.95], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const videoScale = s3;

  // Translate X transitions (percentage-based)
  const txPhase1to2 = spring({
    frame: frame - 90,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });
  const txPhase2to3 = spring({
    frame: frame - 180,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });
  const txPhase3to4 = spring({
    frame: frame - 270,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });

  // TX: 0% -> +12% (show left sidebar) -> -8% (pan to right content) -> 0%
  const tx1 = interpolate(txPhase1to2, [0, 1], [0, 12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tx2 = interpolate(txPhase2to3, [0, 1], [tx1, -8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tx3 = interpolate(txPhase3to4, [0, 1], [tx2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const videoTx = tx3;

  // Translate Y transitions (subtle vertical movement)
  const tyPhase1to2 = spring({
    frame: frame - 90,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });
  const tyPhase2to3 = spring({
    frame: frame - 180,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });
  const tyPhase3to4 = spring({
    frame: frame - 270,
    fps,
    config: {damping: 40, stiffness: 60},
    durationInFrames: 45,
  });

  // TY: 0% -> +5% (slight down for sidebar focus) -> -3% (up for content) -> 0%
  const ty1 = interpolate(tyPhase1to2, [0, 1], [0, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ty2 = interpolate(tyPhase2to3, [0, 1], [ty1, -3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ty3 = interpolate(tyPhase3to4, [0, 1], [ty2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const videoTy = ty3;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #FAFAFA 0%, #FFF5F9 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: exitOpacity,
      }}
    >
      {/* Title label */}
      <div
        style={{
          position: 'absolute',
          top: 38,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: C.pink,
            background: `${C.pink}10`,
            padding: '6px 20px',
            borderRadius: 20,
            fontFamily: headingFont,
          }}
        >
          MAKER VIEW
        </span>
      </div>

      {/* Browser frame container */}
      <div
        style={{
          width: 960,
          height: 580,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06)',
          border: `1px solid ${C.border}`,
          background: C.white,
          marginTop: 20,
          opacity: frameOpacity,
          transform: `scale(${frameScale})`,
        }}
      >
        {/* Fake browser chrome bar */}
        <div
          style={{
            height: 36,
            background: C.headerBg,
            borderBottom: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 14,
            gap: 7,
          }}
        >
          <div style={{width: 11, height: 11, borderRadius: '50%', background: '#FF5F57'}} />
          <div style={{width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E'}} />
          <div style={{width: 11, height: 11, borderRadius: '50%', background: '#28C840'}} />
          <div
            style={{
              flex: 1,
              marginLeft: 12,
              marginRight: 14,
              height: 22,
              borderRadius: 6,
              background: C.white,
              border: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
              fontSize: 11,
              color: C.textTer,
            }}
          >
            app.lemonade.com/maker
          </div>
        </div>

        {/* Video viewport (overflow hidden clips the zoom/pan) */}
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 36px)',
            overflow: 'hidden',
            position: 'relative',
            background: '#f9f9f9',
          }}
        >
          {/* Video element with zoom/pan transforms */}
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${videoScale}) translate(${videoTx}%, ${videoTy}%)`,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <Video
              src={staticFile('screens/maker-recording.webm')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
