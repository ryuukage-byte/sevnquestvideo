import {TOKENS} from '../styles/tokens';
import {RAW_TIMESTAMPS, RawTimestamp} from './timestamps';

export interface SceneData extends RawTimestamp {
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}

const FPS = TOKENS.video.fps;

export const SCENES: SceneData[] = RAW_TIMESTAMPS.map((raw) => {
  const startFrame = Math.round((raw.startMs * FPS) / 1000);
  const endFrame = Math.round((raw.endMs * FPS) / 1000);
  const durationInFrames = Math.max(1, endFrame - startFrame);

  return {
    ...raw,
    startFrame,
    endFrame,
    durationInFrames,
  };
});

export const TOTAL_VIDEO_FRAMES = Math.round((TOKENS.video.totalDurationMs * FPS) / 1000); // 13349

export const getSceneById = (id: string): SceneData | undefined => {
  return SCENES.find((s) => s.id === id);
};

export const getSceneByIndex = (index: number): SceneData | undefined => {
  return SCENES.find((s) => s.index === index);
};

export const getScenesByAct = (act: number): SceneData[] => {
  return SCENES.filter((s) => s.act === act);
};
