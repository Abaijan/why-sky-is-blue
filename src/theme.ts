export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const C = {
  bg0: "#06101f",
  bg1: "#0b2040",
  line: "#4cc9f0",
  lineDim: "rgba(76,201,240,0.25)",
  text: "#e8f4ff",
  muted: "#8fb3d1",
  blue: "#4da3ff",
  red: "#ff5a3c",
  violet: "#a56bff",
  green: "#5dd39e",
  yellow: "#ffd166",
  orange: "#ff9248",
  n2: "#5cc8ff",
  o2: "#ff7a7a",
};

export const FONT =
  '"Inter","SF Pro Display","Segoe UI","Helvetica Neue",Arial,sans-serif';
export const MONO = '"JetBrains Mono","SF Mono",Menlo,Consolas,monospace';

// Wavelength (nm) -> css rgb colour
export const wlToRgb = (w: number): [number, number, number] => {
  let r = 0,
    g = 0,
    b = 0;
  if (w >= 380 && w < 440) {
    r = -(w - 440) / 60;
    b = 1;
  } else if (w < 490) {
    g = (w - 440) / 50;
    b = 1;
  } else if (w < 510) {
    g = 1;
    b = -(w - 510) / 20;
  } else if (w < 580) {
    r = (w - 510) / 70;
    g = 1;
  } else if (w < 645) {
    r = 1;
    g = -(w - 645) / 65;
  } else if (w <= 780) {
    r = 1;
  }
  let f = 1;
  if (w < 420) f = 0.35 + (0.65 * (w - 380)) / 40;
  else if (w > 700) f = 0.35 + (0.65 * (780 - w)) / 80;
  const k = (v: number) => Math.round(255 * Math.pow(Math.max(0, v * f), 0.8));
  return [k(r), k(g), k(b)];
};

export const wl = (w: number, a = 1) => {
  const [r, g, b] = wlToRgb(w);
  return `rgba(${r},${g},${b},${a})`;
};
