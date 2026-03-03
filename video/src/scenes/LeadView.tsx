import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Video, staticFile} from 'remotion';
import {C, headingFont} from '../components/styles';

export const LeadView: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // Title fade-in with spring
  const titleOpacity = spring({frame, fps, config: {damping: 200}});
  const titleY = interpolate(titleOpacity, [0, 1], [-20, 0]);

  // Exit fade in last 30 frames
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // Browser frame entrance
  const frameEntry = spring({frame: frame - 5, fps, config: {damping: 30, stiffness: 80}});
  const frameScale = interpolate(frameEntry, [0, 1], [0.92, 1]);
  const frameOpacity = interpolate(frameEntry, [0, 1], [0, 1], {extrapolateRight: 'clamp'});

  // --- Zoom/Pan keyframes ---
  // Phase 1: 0-90 frames (0-3s) — full view at scale 1.0
  // Phase 2: 90-180 frames (3-6s) — zoom to 1.2x, focus on team cards (translate toward center)
  // Phase 3: 180-240 frames (6-8s) — pan down-left to sidebar nav
  // Phase 4: 240-300 frames (8-10s) — zoom back out to full view

  const zoomIn = spring({frame: frame - 90, fps, config: {damping: 40, stiffness: 60}});
  const panSidebar = spring({frame: frame - 180, fps, config: {damping: 40, stiffness: 60}});
  const zoomOut = spring({frame: frame - 240, fps, config: {damping: 35, stiffness: 50}});

  // Scale: 1.0 -> 1.2 (zoom in) -> 1.2 (hold during pan) -> 1.0 (zoom out)
  const scaleZoomIn = interpolate(zoomIn, [0, 1], [1.0, 1.2]);
  const scaleZoomOut = interpolate(zoomOut, [0, 1], [0, -0.2]);
  const scale = scaleZoomIn + scaleZoomOut;

  // TranslateX: 0 -> -30px (zoom to cards) -> -80px (pan to sidebar) -> 0 (reset)
  const txZoomIn = interpolate(zoomIn, [0, 1], [0, -30]);
  const txPan = interpolate(panSidebar, [0, 1], [0, -50]);
  const txReset = interpolate(zoomOut, [0, 1], [0, 80]);
  const translateX = txZoomIn + txPan + txReset;

  // TranslateY: 0 -> -20px (zoom to cards) -> 40px (pan down to sidebar) -> 0 (reset)
  const tyZoomIn = interpolate(zoomIn, [0, 1], [0, -20]);
  const tyPan = interpolate(panSidebar, [0, 1], [0, 60]);
  const tyReset = interpolate(zoomOut, [0, 1], [0, -40]);
  const translateY = tyZoomIn + tyPan + tyReset;

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
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
          color: C.pink,
          background: `${C.pink}12`,
          padding: '7px 24px',
          borderRadius: 22,
        }}>
          LEAD VIEW
        </span>
      </div>

      {/* Browser frame with video */}
      <div style={{
        width: 920,
        height: 560,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.06)',
        border: `1px solid ${C.border}`,
        background: C.white,
        transform: `scale(${frameScale})`,
        opacity: frameOpacity,
        display: 'flex',
        flexDirection: 'column' as const,
      }}>
        {/* Browser toolbar */}
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
            <span style={{fontSize: 11, color: C.textTer, fontFamily: 'monospace'}}>
              app.lemonade.com/lead/dashboard
            </span>
          </div>
        </div>

        {/* Video viewport with zoom/pan */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative' as const,
          background: '#f8f8f8',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            transformOrigin: 'center center',
          }}>
            <Video
              src={staticFile('screens/lead-recording.webm')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover' as const,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
