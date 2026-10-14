// Draws topographic contour lines: smooth value noise sampled on a grid,
// then traced at evenly spaced heights with marching squares.

export interface ContourOptions {
  seed: number;
  // Position of an extra "hill" as a fraction of width/height, so each section gets its own terrain
  peakX: number;
  peakY: number;
  minorColor: string;
  indexColor: string;
}

const CELL = 10;
const LEVEL_STEP = 0.04;
const INDEX_EVERY = 5;
const MARK_SPACING = 140;

const hash = (x: number, y: number, seed: number): number => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const valueNoise = (x: number, y: number, seed: number): number => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const top = hash(xi, yi, seed) * (1 - u) + hash(xi + 1, yi, seed) * u;
  const bottom = hash(xi, yi + 1, seed) * (1 - u) + hash(xi + 1, yi + 1, seed) * u;
  return top * (1 - v) + bottom * v;
};

const terrain = (x: number, y: number, seed: number): number =>
  0.55 * valueNoise(x, y, seed) +
  0.3 * valueNoise(x * 2.03 + 5.2, y * 2.03 + 1.3, seed) +
  0.15 * valueNoise(x * 4.1 + 9.7, y * 4.1 + 3.1, seed);

export const drawContours = (canvas: HTMLCanvasElement, options: ContourOptions): void => {
  const { seed, peakX, peakY, minorColor, indexColor } = options;
  const width = Math.max(1, Math.round(canvas.clientWidth));
  const height = Math.max(1, Math.round(canvas.clientHeight));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const cols = Math.ceil(width / CELL) + 1;
  const rows = Math.ceil(height / CELL) + 1;
  const field = new Float32Array(cols * rows);
  const hillX = width * peakX;
  const hillY = height * peakY;
  const spreadX = Math.max(width * 0.26, 160);
  const spreadY = Math.max(height * 0.3, 160);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = i * CELL;
      const y = j * CELL;
      const hill = 0.22 * Math.exp(-(((x - hillX) / spreadX) ** 2 + ((y - hillY) / spreadY) ** 2));
      field[j * cols + i] = terrain(x / 280, y / 280, seed) + hill;
    }
  }

  let levelIndex = 0;
  for (let level = 0.2; level < 1.1; level += LEVEL_STEP, levelIndex++) {
    const isIndex = levelIndex % INDEX_EVERY === 0;
    ctx.beginPath();
    ctx.strokeStyle = isIndex ? indexColor : minorColor;
    ctx.lineWidth = isIndex ? 1.1 : 0.8;

    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const a = field[j * cols + i];
        const b = field[j * cols + i + 1];
        const c = field[(j + 1) * cols + i + 1];
        const d = field[(j + 1) * cols + i];
        const state = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
        if (state === 0 || state === 15) continue;

        const x0 = i * CELL;
        const y0 = j * CELL;
        const topX = x0 + (CELL * (level - a)) / (b - a);
        const rightY = y0 + (CELL * (level - b)) / (c - b);
        const bottomX = x0 + (CELL * (level - d)) / (c - d);
        const leftY = y0 + (CELL * (level - a)) / (d - a);

        const segment = (x1: number, y1: number, x2: number, y2: number): void => {
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        };

        switch (state) {
          case 1:
          case 14:
            segment(x0, leftY, bottomX, y0 + CELL);
            break;
          case 2:
          case 13:
            segment(bottomX, y0 + CELL, x0 + CELL, rightY);
            break;
          case 3:
          case 12:
            segment(x0, leftY, x0 + CELL, rightY);
            break;
          case 4:
          case 11:
            segment(topX, y0, x0 + CELL, rightY);
            break;
          case 6:
          case 9:
            segment(topX, y0, bottomX, y0 + CELL);
            break;
          case 7:
          case 8:
            segment(x0, leftY, topX, y0);
            break;
          case 5:
            segment(x0, leftY, topX, y0);
            segment(bottomX, y0 + CELL, x0 + CELL, rightY);
            break;
          case 10:
            segment(topX, y0, x0 + CELL, rightY);
            segment(x0, leftY, bottomX, y0 + CELL);
            break;
        }
      }
    }
    ctx.stroke();
  }

  // Survey crosshairs on a fixed grid
  ctx.beginPath();
  ctx.strokeStyle = indexColor;
  ctx.lineWidth = 1;
  for (let y = MARK_SPACING; y < height; y += MARK_SPACING) {
    for (let x = MARK_SPACING; x < width; x += MARK_SPACING) {
      ctx.moveTo(x - 4, y);
      ctx.lineTo(x + 4, y);
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x, y + 4);
    }
  }
  ctx.stroke();
};
