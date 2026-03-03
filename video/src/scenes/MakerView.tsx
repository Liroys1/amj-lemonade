import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile} from 'remotion';
import {C, headingFont} from '../components/styles';

/**
 * MakerView — 420 frames (14s @ 30fps)
 * Showcases the Maker (New Employee) view with 4 screenshots,
 * Ken Burns zoom, cross-fades, and text callout cards.
 */

const FEATURES = [
  {
    start: 0,
    image: 'screens/maker-welcome.png',
    title: 'Journey Map',
    subtitle: '4 phases from Day 1 to Ownership',
    // center-bottom: drift down and slightly toward center
    tx: 0,
    ty: -3,
  },
  {
    start: 105,
    image: 'screens/maker-dashboard.png',
    title: 'Live Health Score',
    subtitle: '5-factor tracking updated daily',
    // upper-left: drift toward upper-left
    tx: 4,
    ty: 3,
  },
  {
    start: 210,
    image: 'screens/maker-skills.png',
    title: 'Skills & Growth',
    subtitle: 'Visual competency radar mapping',
    // center: drift toward center (minimal translate)
    tx: 0,
    ty: 0,
  },
  {
    start: 315,
    image: 'screens/maker-lemi.png',
    title: 'AI Companion',
    subtitle: 'Context-aware guidance anytime',
    // right side: drift toward right
    tx: -3,
    ty: -1,
  },
] as const;

const FEATURE_DURATION = 105;
const CROSSFADE_FRAMES = 15;
const CARD_DELAY = 20;

export const MakerView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // --- Title fade-in ---
  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleOpacity, [0, 1], [12, 0]);

  // --- Browser frame entrance ---
  const frameEntry = spring({frame: frame - 8, fps, config: {damping: 30, stiffness: 80}});
  const frameScale = interpolate(frameEntry, [0, 1], [0.92, 1]);
  const frameOpacity = interpolate(frameEntry, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

  // --- Exit fade (last 30 frames) ---
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

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
          width: 980,
          height: 580,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06)',
          border: `1px solid ${C.border}`,
          background: C.white,
          marginTop: 20,
          opacity: frameOpacity,
          transform: `scale(${frameScale})`,
          display: 'flex',
          flexDirection: 'column' as const,
          position: 'relative' as const,
        }}
      >
        {/* macOS browser chrome bar */}
        <div
          style={{
            height: 36,
            background: C.headerBg,
            borderBottom: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 14,
            gap: 7,
            flexShrink: 0,
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
              fontWeight: 500,
            }}
          >
            app.lemonade.com/maker
          </div>
        </div>

        {/* Screenshot viewport */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative' as const,
            background: '#f9f9f9',
          }}
        >
          {FEATURES.map((feature, i) => {
            const localFrame = frame - feature.start;

            // --- Cross-fade opacity ---
            // Fade in over the first CROSSFADE_FRAMES
            const fadeIn = interpolate(
              localFrame,
              [0, CROSSFADE_FRAMES],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );

            // Fade out over the last CROSSFADE_FRAMES
            const fadeOut = interpolate(
              localFrame,
              [FEATURE_DURATION - CROSSFADE_FRAMES, FEATURE_DURATION],
              [1, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );

            const imgOpacity = Math.min(fadeIn, fadeOut);

            // Clamp: only render during this feature's range (with small buffer for crossfade)
            if (localFrame < -CROSSFADE_FRAMES || localFrame > FEATURE_DURATION + CROSSFADE_FRAMES) {
              return null;
            }

            // --- Ken Burns zoom: scale 1.0 -> 1.08, subtle drift ---
            const progress = Math.max(0, Math.min(1, localFrame / FEATURE_DURATION));
            const kenBurnsScale = 1.0 + 0.08 * progress;
            const kenBurnsTx = feature.tx * progress;
            const kenBurnsTy = feature.ty * progress;

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
                    transform: `scale(${kenBurnsScale}) translate(${kenBurnsTx}%, ${kenBurnsTy}%)`,
                    transformOrigin: 'center center',
                    willChange: 'transform',
                  }}
                >
                  <img
                    src={staticFile(feature.image)}
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

      {/* Text callout cards */}
      {FEATURES.map((feature, i) => {
        const localFrame = frame - feature.start;
        const cardLocalFrame = localFrame - CARD_DELAY;

        // Only show during this feature's window
        if (localFrame < 0 || localFrame > FEATURE_DURATION) {
          return null;
        }

        // Card entrance via spring
        const cardSpring = spring({
          frame: cardLocalFrame,
          fps,
          config: {damping: 14, stiffness: 100, mass: 0.8},
        });
        const cardY = interpolate(cardSpring, [0, 1], [30, 0]);
        const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

        // Card exit: fade out in last 15 frames of the feature
        const cardExitOpacity = interpolate(
          localFrame,
          [FEATURE_DURATION - CROSSFADE_FRAMES, FEATURE_DURATION],
          [1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );

        return (
          <div
            key={`card-${i}`}
            style={{
              position: 'absolute' as const,
              bottom: 44,
              left: '50%',
              transform: `translateX(-50%) translateY(${cardY}px)`,
              opacity: Math.min(cardOpacity, cardExitOpacity),
              zIndex: 20,
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 16,
                padding: '16px 24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.05)',
                border: `1px solid rgba(255,255,255,0.6)`,
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                gap: 4,
                minWidth: 240,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                {/* Pink dot */}
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: C.pink,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.dark,
                    fontFamily: headingFont,
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  {feature.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: C.textSec,
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {feature.subtitle}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
