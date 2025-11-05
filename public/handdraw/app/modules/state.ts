export interface SVGPathData {
  id: string;
  element: SVGPathElement;
  totalLength: number;
}

export interface TimelineSegment {
  id: string;
  pathId: string;
  startTime: number;
  duration: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface AppState {
  svgPaths: SVGPathData[];
  audioBuffer: AudioBuffer | null;
  audioContext: AudioContext | null;
  segments: TimelineSegment[];
  currentTime: number;
  isPlaying: boolean;
  zoom: number;
  handOffsetX: number;
  handOffsetY: number;
  handType: 'left' | 'right';
}

export const state: AppState = {
  svgPaths: [],
  audioBuffer: null,
  audioContext: null,
  segments: [],
  currentTime: 0,
  isPlaying: false,
  zoom: 1,
  handOffsetX: 20,
  handOffsetY: -30,
  handType: 'right'
};
