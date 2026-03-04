import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * StrategyView — 240 frames (8s @ 30fps)
 * Showcases the Strategy (L&D) view with 3 screenshots + text callouts.
 * Each feature gets ~80 frames with cross-fade transitions and Ken Burns zoom.
 */

const FEATURES = [
  {
    startFrame: 0,
    screenshot: 'screens/strategy-overview.png',
    title: 'Program KPIs',
    subtitle: 'Real-time cohort health metrics',
    // Ken Burns: drift toward upper area (KPI cards)
    zoomOrigin: '50% 30%',
    tx: 0,
    ty: -8,
  },
  {
    startFrame: 80,
    screenshot: 'screens/strategy-skillgap.png',
    title: 'Skill Gap Intelligence',
    subtitle: 'Role \u00D7 Category competency map',
    // Ken Burns: drift toward center (heatmap grid)
    zoomOrigin: '50% 50%',
    tx: 0,
    ty: 0,
  },
  {
    startFrame: 160,
    screenshot: 'screens/strategy-attrition.png',
    title: 'Attrition Risk Model',
    subtitle: '2D engagement \u00D7 progress matrix',
    // Ken Burns: drift toward center (quadrant chart)
    zoomOrigin: '50% 50%',
    tx: -2,
    ty: 2,
  },
] as const;

const FEATURE_DURATION = 80;
const FADE_IN_FRAMES = 12;
const FADE_OUT_FRAMES = 12;
const CALLOUT_DELAY = 15;

export const StrategyView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // ---- Title fade-in via spring ----
  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleOpacity, [0, 1], [-20, 0]);

  // ---- Browser frame entrance ----
  const frameIn = spring({
    frame: frame - 5,
    fps,
    config: {damping: 30, stiffness: 80},
  });
  const frameScale = interpolate(frameIn, [0, 1], [0.92, 1]);
  const frameOpacity = interpolate(frameIn, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ---- Exit fade (last 30 frames) ----
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(135deg, #FAFAFA 0%, #F0FFE8 50%, #FFF5F9 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: exitOpacity,
      }}
    >
      {/* ---- Title ---- */}
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
            fontFamily: headingFont,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: C.white,
            background: C.pink,
            padding: '10px 32px',
            borderRadius: 28,
            boxShadow: '0 4px 16px rgba(255,0,131,0.25)',
          }}
        >
          📊 STRATEGY VIEW
        </span>
        <div style={{fontSize: 13, color: C.textSec, marginTop: 8, fontWeight: 500}}>
          L&D Analytics
        </div>
      </div>

      {/* ---- Browser-like frame ---- */}
      <div
        style={{
          width: 980,
          height: 580,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow:
            '0 8px 40px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.06)',
          border: `1px solid ${C.border}`,
          background: C.white,
          opacity: frameOpacity,
          transform: `scale(${frameScale})`,
          display: 'flex',
          flexDirection: 'column' as const,
          position: 'relative' as const,
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            height: 36,
            background: C.headerBg,
            borderBottom: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 7,
            flexShrink: 0,
          }}
        >
          {['#FF5F57', '#FFBD2E', '#28CA41'].map((col) => (
            <div
              key={col}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: col,
              }}
            />
          ))}
          <div
            style={{
              marginLeft: 14,
              flex: 1,
              height: 22,
              borderRadius: 6,
              background: C.white,
              border: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
            }}
          >
            <span
              style={{fontSize: 11, color: C.textTer, fontWeight: 500}}
            >
              app.lemonade.com/strategy
            </span>
          </div>
        </div>

        {/* Screenshot viewport with Ken Burns + cross-fade */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative' as const,
            background: '#f8f8f8',
          }}
        >
          {FEATURES.map((feature, i) => {
            const localFrame = frame - feature.startFrame;
            const isFirst = i === 0;
            const isLast = i === FEATURES.length - 1;

            // Only render when roughly in range (with some buffer)
            if (localFrame < -FADE_IN_FRAMES || localFrame > FEATURE_DURATION + FADE_OUT_FRAMES) {
              return null;
            }

            // Cross-fade opacity: overlap to prevent white flash at transitions
            const fadeIn = isFirst
              ? interpolate(localFrame, [0, FADE_IN_FRAMES], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
              : interpolate(localFrame, [-FADE_IN_FRAMES, 0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            // For the last feature, let exit fade handle disappearance
            const fadeOut = isLast
              ? 1
              : interpolate(localFrame, [FEATURE_DURATION - FADE_OUT_FRAMES, FEATURE_DURATION], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const imgOpacity = Math.min(fadeIn, fadeOut);

            // Ken Burns: scale 1.0 -> 1.06 over the feature duration
            const kenBurnsProgress = interpolate(
              localFrame,
              [0, FEATURE_DURATION],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );
            const kenBurnsScale = 1.0 + kenBurnsProgress * 0.06;
            const kenBurnsTx = kenBurnsProgress * feature.tx;
            const kenBurnsTy = kenBurnsProgress * feature.ty;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute' as const,
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: imgOpacity,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `scale(${kenBurnsScale}) translate(${kenBurnsTx}px, ${kenBurnsTy}px)`,
                    transformOrigin: feature.zoomOrigin,
                  }}
                >
                  <img
                    src={staticFile(feature.screenshot)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover' as const,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Text callout cards ---- */}
      {FEATURES.map((feature, i) => {
        const localFrame = frame - feature.startFrame;
        const calloutLocalFrame = localFrame - CALLOUT_DELAY;

        // Strict guard: don't mount DOM until well past delay (prevents backdrop-filter flicker)
        if (calloutLocalFrame < 2 || localFrame > FEATURE_DURATION - 2) {
          return null;
        }

        // Callout appears with a spring, delayed by CALLOUT_DELAY after image fades in
        const calloutSpring = spring({
          frame: calloutLocalFrame,
          fps,
          config: {damping: 18, stiffness: 120, mass: 0.8},
        });
        const calloutY = interpolate(calloutSpring, [0, 1], [30, 0]);
        const calloutOpacity = interpolate(calloutSpring, [0, 1], [0, 1], {
          extrapolateRight: 'clamp',
        });

        // Fade out callout near the end of the feature
        const calloutFadeOut = interpolate(
          localFrame,
          [FEATURE_DURATION - FADE_OUT_FRAMES, FEATURE_DURATION],
          [1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        // For the last feature, let exit fade handle disappearance
        const isLast = i === FEATURES.length - 1;
        const rawOpacity = isLast
          ? calloutOpacity
          : calloutOpacity * calloutFadeOut;

        // Hard clamp: ensure zero opacity in first few spring frames
        const safeOpacity = calloutLocalFrame < 3 ? 0 : rawOpacity;

        return (
          <div
            key={`callout-${i}`}
            style={{
              position: 'absolute' as const,
              bottom: 52,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 20,
              opacity: safeOpacity,
              transform: `translateY(${calloutY}px)`,
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 16,
                padding: '16px 24px',
                boxShadow:
                  '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                border: `1px solid rgba(0,0,0,0.06)`,
              }}
            >
              {/* Pink dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: C.pink,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${C.pink}40`,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.dark,
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.textSec,
                    marginTop: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {feature.subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
