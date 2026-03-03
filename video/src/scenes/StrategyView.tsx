import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Video, staticFile} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * StrategyView — 240 frames (8s @ 30fps)
 * Plays a real screen recording with zoom/pan key-frames to spotlight
 * different regions of the app, giving a dynamic "walkthrough" feel.
 */

// Zoom / pan key-frame definitions (times in seconds)
const KEYFRAMES = [
  {timeSec: 0,   scale: 0.95, tx: 0,    ty: 0   },  // full overview
  {timeSec: 2,   scale: 1.15, tx: -12,  ty: -10 },  // KPI / metrics area (upper-right)
  {timeSec: 5,   scale: 1.25, tx: -5,   ty: 15  },  // charts area (lower centre)
  {timeSec: 7,   scale: 1.0,  tx: 0,    ty: 0   },  // ease back to full view
];

export const StrategyView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // ---- title fade-in via spring ----
  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleOpacity, [0, 1], [12, 0]);

  // ---- browser frame entrance ----
  const frameIn = spring({frame: frame - 6, fps, config: {damping: 18, stiffness: 120, mass: 0.8}});
  const frameScale = interpolate(frameIn, [0, 1], [0.92, 1], {extrapolateRight: 'clamp'});
  const frameOpacity = interpolate(frameIn, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

  // ---- exit fade (last 30 frames) ----
  const exitStart = durationInFrames - 30;
  const exitOpacity = frame > exitStart
    ? interpolate(frame, [exitStart, durationInFrames], [1, 0], {extrapolateRight: 'clamp'})
    : 1;

  // ---- zoom / pan interpolation ----
  const keyFrames = KEYFRAMES.map((kf) => kf.timeSec * fps);
  const scales   = KEYFRAMES.map((kf) => kf.scale);
  const txValues = KEYFRAMES.map((kf) => kf.tx);
  const tyValues = KEYFRAMES.map((kf) => kf.ty);

  // Combine linear keyframe interpolation with a subtle spring bounce
  const rawScale = interpolate(frame, keyFrames, scales, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rawTx    = interpolate(frame, keyFrames, txValues, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rawTy    = interpolate(frame, keyFrames, tyValues, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Slight spring overshoot on scale for a lively feel
  const scaleSpring = spring({
    frame,
    fps,
    config: {damping: 28, stiffness: 50, mass: 0.6},
    durationInFrames: durationInFrames,
  });
  const springInfluence = interpolate(scaleSpring, [0, 1], [0.97, 1]);
  const finalScale = rawScale * springInfluence;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #F0FFE8 50%, #FFF5F9 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      {/* ---- Title ---- */}
      <div style={{
        position: 'absolute',
        top: 38,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        zIndex: 10,
      }}>
        <span style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
          color: C.pink,
          background: `${C.pink}12`,
          padding: '6px 22px',
          borderRadius: 20,
          fontFamily: headingFont,
        }}>
          STRATEGY VIEW
        </span>
      </div>

      {/* ---- Browser-like frame ---- */}
      <div style={{
        width: 980,
        height: 580,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.06)',
        border: `1px solid ${C.border}`,
        background: C.white,
        opacity: frameOpacity,
        transform: `scale(${frameScale})`,
        display: 'flex',
        flexDirection: 'column' as const,
      }}>
        {/* browser chrome bar */}
        <div style={{
          height: 36,
          background: C.headerBg,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 7,
          flexShrink: 0,
        }}>
          {['#FF5F57', '#FFBD2E', '#28CA41'].map((col) => (
            <div key={col} style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: col,
            }} />
          ))}
          <div style={{
            marginLeft: 14,
            flex: 1,
            height: 22,
            borderRadius: 6,
            background: C.white,
            border: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
            <span style={{fontSize: 11, color: C.textTer, fontWeight: 500}}>
              app.lemonade.com/strategy
            </span>
          </div>
        </div>

        {/* video viewport — overflow hidden for zoom/pan */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            transform: `scale(${finalScale}) translate(${rawTx}%, ${rawTy}%)`,
            transformOrigin: 'center center',
            transition: 'transform 0.05s linear',
          }}>
            <Video
              src={staticFile('screens/strategy-recording.webm')}
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
