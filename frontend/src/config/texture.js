const TEXTURE_WIDTH = 8;
const TEXTRUE_HEIGHT = 9;
const MOTION = {
  IDLE: { idx: 8, frame: 2 },
  WALK: { idx: 6, frame: 4 },
  DASH: { idx: 5, frame: 8 },
  DEAD: { idx: 1, frame: 8 },
};
const FPS = 10;

export { TEXTURE_WIDTH, TEXTRUE_HEIGHT, MOTION, FPS }