import React from 'react';
import {AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile} from 'remotion';
import {LogoReveal} from './scenes/LogoReveal';
import {TheAssignment} from './scenes/TheAssignment';
import {DesignPhilosophy} from './scenes/DesignPhilosophy';
import {MeetAMJ} from './scenes/MeetAMJ';
import {MakerView} from './scenes/MakerView';
import {LeadView} from './scenes/LeadView';
import {StrategyView} from './scenes/StrategyView';
import {AIIntegration} from './scenes/AIIntegration';
import {Closing} from './scenes/Closing';

// Scene timing in frames (30fps)
// Total: 120 seconds = 3600 frames
const SCENES = {
  logo:       {from: 0,    dur: 120},   // 0-4s
  assignment: {from: 120,  dur: 240},   // 4-12s
  philosophy: {from: 360,  dur: 300},   // 12-22s
  amj:        {from: 660,  dur: 180},   // 22-28s
  maker:      {from: 840,  dur: 420},   // 28-42s
  lead:       {from: 1260, dur: 300},   // 42-52s
  strategy:   {from: 1560, dur: 240},   // 52-60s
  ai:         {from: 1800, dur: 360},   // 60-72s
  closing:    {from: 2160, dur: 1440},  // 72-120s
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
      <Audio src={staticFile('music.mp3')} volume={musicVolume} loop />

      <Sequence from={SCENES.logo.from} durationInFrames={SCENES.logo.dur} name="Logo Reveal">
        <LogoReveal />
      </Sequence>

      <Sequence from={SCENES.assignment.from} durationInFrames={SCENES.assignment.dur} name="The Assignment">
        <TheAssignment />
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
