import { useEffect, useRef } from 'react';
import { usePreferences } from '../../preferences';
import { drawContours } from '../../utils/contours';
import styles from './TopoBackground.module.scss';

interface TopoBackgroundProps {
  seed: number;
  peakX: number;
  peakY: number;
}

const TopoBackground = ({ seed, peakX, peakY }: TopoBackgroundProps): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme: themeMode } = usePreferences();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;
    let lastWidth = 0;
    let lastHeight = 0;

    // Colors come from the theme tokens, read at draw time so a theme switch repaints correctly
    const draw = (): void => {
      const tokens = getComputedStyle(document.documentElement);
      drawContours(canvas, {
        seed,
        peakX,
        peakY,
        minorColor: tokens.getPropertyValue('--color-contour').trim(),
        indexColor: tokens.getPropertyValue('--color-contour-index').trim(),
      });
    };

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (Math.abs(width - lastWidth) < 2 && Math.abs(height - lastHeight) < 2) return;
      lastWidth = width;
      lastHeight = height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [seed, peakX, peakY, themeMode]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default TopoBackground;
