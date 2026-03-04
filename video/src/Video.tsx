import React from 'react';
import {AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile} from 'remotion';
import {LogoReveal} from './scenes/LogoReveal';
import {TheAssignment} from './scenes/TheAssignment';
import {CoreConcept} from './scenes/CoreConcept';
import {DesignPhilosophy} from './scenes/DesignPhilosophy';
import {MeetAMJ} from './scenes/MeetAMJ';
import {MakerView} from './scenes/MakerView';
import {LeadView} from './scenes/LeadView';
import {StrategyView} from './scenes/StrategyView';
import {AIIntegration} from './scenes/AIIntegration';
import {Closing} from './scenes/Closing';

// Scene timing in frames (30fps)
// Total: ~104 seconds = 3120 frames
const SCENES = {
  logo:       {from: 0,    dur: 120},   // 0-4s
  assignment: {from: 120,  dur: 240},   // 4-12s
  concept:    {from: 360,  dur: 300},   // 12-22s  (NEW: core design principles)
  philosophy: {from: 660,  dur: 300},   // 22-32s  (30-day journey timeline)
  amj:        {from: 960,  dur: 180},   // 32-38s
  maker:      {from: 1140, dur: 420},   // 38-52s
  lead:       {from: 1560, dur: 300},   // 52-62s
  strategy:   {from: 1860, dur: 240},   // 62-70s
  ai:         {from: 2100, dur: 360},   // 70-82s
  closing:    {from: 2460, dur: 660},   // 82-104s
};

// Global background with subtle gradient
const BG: React.CSSProperties = {
  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F9 40%, #FAFAFA 100%)',
  fontFamily: "'Lato', system-ui, sans-serif",
};

export const AMJShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // Fade music out in last 3 seconds
  const musicVolume = interpolate(
    frame,
    [0, 30, durationInFrames - 90, durationInFrames],
    [0, 0.35, 0.35, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill style={BG}>
      {/* Background music - ambient corporate, low volume */}
      {/* @ts-ignore - Remotion 4 type issue with React 18 */}
      <Audio src={staticFile('music.mp3')} volume={musicVolume} loop={true} />

      <Sequence from={SCENES.logo.from} durationInFrames={SCENES.logo.dur} name="Logo Reveal">
        <LogoReveal />
      </Sequence>

      <Sequence from={SCENES.assignment.from} durationInFrames={SCENES.assignment.dur} name="The Assignment">
        <TheAssignment />
      </Sequence>

      <Sequence from={SCENES.concept.from} durationInFrames={SCENES.concept.dur} name="Core Concept">
        <CoreConcept />
      </Sequence>

      <Sequence from={SCENES.philosophy.from} durationInFrames={SCENES.philosophy.dur} name="Design Philosophy">
        <DesignPhilosophy />
      </Sequence>

      <Sequence from={SCENES.amj.from} durationInFrames={SCENES.amj.dur} name="Meet AMJ">
        <MeetAMJ />
      </Sequence>

      <Sequence from={SCENES.maker.from} durationInFrames={SCENES.maker.dur} name="Maker View">
        <MakerView />
      </Sequence>

      <Sequence from={SCENES.lead.from} durationInFrames={SCENES.lead.dur} name="Lead View">
        <LeadView />
      </Sequence>

      <Sequence from={SCENES.strategy.from} durationInFrames={SCENES.strategy.dur} name="Strategy View">
        <StrategyView />
      </Sequence>

      <Sequence from={SCENES.ai.from} durationInFrames={SCENES.ai.dur} name="AI Integration">
        <AIIntegration />
      </Sequence>

      <Sequence from={SCENES.closing.from} durationInFrames={SCENES.closing.dur} name="Closing">
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
