import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * LeadView — 300 frames (10s @ 30fps)
 * Showcases the Lead (Manager) view with 3 screenshot features,
 * cross-fading between them with Ken Burns zoom and text callout cards.
 */

interface Feature {
  startFrame: number;
  screenshot: string;
  title: string;
  subtitle: string;
  zoomOrigin: string;
  zoomTx: number;
  zoomTy: number;
}

const FEATURES: Feature[] = [
  {
    startFrame: 0,
    screenshot: 'screens/lead-team.png',
    title: 'Team Health Dashboard',
    subtitle: 'Every maker\u2019s progress at a glance',
    zoomOrigin: 'center center',
    zoomTx: 0,
    zoomTy: 0,
  },
  {
    startFrame: 100,
    screenshot: 'screens/lead-1on1.png',
    title: '1:1 Coaching Prep',
    subtitle: 'AI-generated talking points',
    zoomOrigin: 'left center',
    zoomTx: 2,
    zoomTy: 0,
  },
  {
    startFrame: 200,
    screenshot: 'screens/lead-alerts.png',
    title: 'Smart Alert Center',
    subtitle: 'Early warnings before problems escalate',
    zoomOrigin: 'center center',
    zoomTx: 0,
    zoomTy: -1,
  },
];

const FEATURE_DURATION = 100;
const FADE_IN_FRAMES = 15;
const FADE_OUT_FRAMES = 15;
const CALLOUT_DELAY = 20;

export const LeadView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // --- Title fade-in ---
  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleOpacity, [0, 1], [-20, 0]);

  // --- Exit fade (last 30 frames) ---
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // --- Browser frame entrance ---
  const frameEntry = spring({frame: frame - 5, fps, config: {damping: 30, stiffness: 80}});
  const frameScale = interpolate(frameEntry, [0, 1], [0.92, 1]);
  const frameOpacity = interpolate(frameEntry, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #F0F4FF 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: exitOpacity,
    }}>
      {/* Title label */}
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
        }}>
          👥 LEAD VIEW
        </span>
        <div style={{fontSize: 13, color: C.textSec, marginTop: 8, fontWeight: 500}}>
          Manager Dashboard
        </div>
      </div>

      {/* Browser frame */}
      <div style={{
        width: 980,
        height: 580,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.06)',
        border: `1px solid ${C.border}`,
        background: C.white,
        transform: `scale(${frameScale})`,
        opacity: frameOpacity,
        display: 'flex',
        flexDirection: 'column' as const,
        position: 'relative' as const,
      }}>
        {/* macOS browser toolbar */}
        <div style={{
          height: 38,
          background: C.headerBg,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 7,
          flexShrink: 0,
        }}>
          <div style={{width: 11, height: 11, borderRadius: '50%', background: '#FF5F57'}} />
          <div style={{width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E'}} />
          <div style={{width: 11, height: 11, borderRadius: '50%', background: '#28C840'}} />
          <div style={{
            marginLeft: 16,
            flex: 1,
            height: 24,
            borderRadius: 6,
            background: C.white,
            border: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
            <span style={{fontSize: 11, color: C.textTer, fontWeight: 500}}>
              app.lemonade.com/lead
            </span>
          </div>
        </div>

        {/* Screenshot viewport */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative' as const,
          background: '#f8f8f8',
        }}>
          {FEATURES.map((feature, idx) => {
            const localFrame = frame - feature.startFrame;
            const isFirst = idx === 0;
            const isLast = idx === FEATURES.length - 1;

            // Only render when approximately visible
            if (localFrame < -FADE_IN_FRAMES || localFrame > FEATURE_DURATION + FADE_OUT_FRAMES) return null;

            // Image opacity: cross-fade overlap to prevent white flash
            const fadeIn = isFirst
              ? interpolate(localFrame, [0, FADE_IN_FRAMES], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
              : interpolate(localFrame, [-FADE_IN_FRAMES, 0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            // Last feature: don't fade out (the exit fade handles it)
            const fadeOut = isLast
              ? 1
              : interpolate(localFrame, [FEATURE_DURATION - FADE_OUT_FRAMES, FEATURE_DURATION], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const imgOpacity = Math.min(fadeIn, fadeOut);

            // Ken Burns: scale 1.0 -> 1.08 over the feature duration
            const kenBurnsScale = interpolate(
              localFrame,
              [0, FEATURE_DURATION],
              [1.0, 1.08],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );

            // Subtle translate drift toward feature area
            const kenBurnsTx = interpolate(
              localFrame,
              [0, FEATURE_DURATION],
              [0, feature.zoomTx],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );
            const kenBurnsTy = interpolate(
              localFrame,
              [0, FEATURE_DURATION],
              [0, feature.zoomTy],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: imgOpacity,
                }}
              >
                <img
                  src={staticFile(feature.screenshot)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' as const,
                    transform: `scale(${kenBurnsScale}) translate(${kenBurnsTx}%, ${kenBurnsTy}%)`,
                    transformOrigin: feature.zoomOrigin,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Text callout cards */}
      {FEATURES.map((feature, idx) => {
        const localFrame = frame - feature.startFrame;
        const calloutLocalFrame = localFrame - CALLOUT_DELAY;

        // Strict guard: don't mount DOM until well past delay (prevents backdrop-filter flicker)
        if (calloutLocalFrame < 2 || localFrame > FEATURE_DURATION - 2) return null;

        // Callout appears with a spring ~20 frames after the image fades in
        const calloutSpring = spring({
          frame: calloutLocalFrame,
          fps,
          config: {damping: 18, stiffness: 120, mass: 0.8},
        });
        const calloutOpacity = interpolate(calloutSpring, [0, 1], [0, 1], {extrapolateRight: 'clamp'});
        const calloutY = interpolate(calloutSpring, [0, 1], [20, 0]);

        // Callout fades out with the image (last 15 frames of the feature)
        const calloutFadeOut = idx === FEATURES.length - 1
          ? 1 // last feature: exit fade handles it
          : interpolate(
              localFrame,
              [FEATURE_DURATION - FADE_OUT_FRAMES, FEATURE_DURATION],
              [1, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );

        // Hard clamp: ensure zero opacity in first few spring frames
        const rawOpacity = Math.min(calloutOpacity, calloutFadeOut);
        const safeOpacity = calloutLocalFrame < 3 ? 0 : rawOpacity;

        return (
          <div
            key={`callout-${idx}`}
            style={{
              position: 'absolute',
              bottom: 52,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 20,
              opacity: safeOpacity,
              transform: `translateY(${calloutY}px)`,
              pointerEvents: 'none' as const,
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 16,
              padding: '16px 24px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.04)',
              border: `1px solid rgba(0,0,0,0.06)`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              maxWidth: 420,
            }}>
              {/* Pink accent dot */}
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: C.pink,
                flexShrink: 0,
                boxShadow: `0 0 8px ${C.pink}40`,
              }} />
              <div>
                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.dark,
                  fontFamily: headingFont,
                  lineHeight: 1.3,
                }}>
                  {feature.title}
                </div>
                <div style={{
                  fontSize: 13,
                  color: C.textSec,
                  marginTop: 2,
                  lineHeight: 1.4,
                }}>
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
