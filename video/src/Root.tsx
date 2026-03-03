import React from 'react';
import {Composition} from 'remotion';
import {AMJShowcase} from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AMJShowcase"
        component={AMJShowcase}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
