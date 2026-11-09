import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, H, MONO, W } from "./theme";

const TimelineTransform = createContext<(time: number) => number>((time) => time);

/** Current time inside the scene, in seconds. */
export const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return useContext(TimelineTransform)(f / fps);
};

export const TimeCut: React.FC<{
  from: number;
  to: number;
  duration: number;
  children: React.ReactNode;
}> = ({ from, to, duration, children }) => {
  const parentTransform = useContext(TimelineTransform);
  const transform = (time: number) => {
    const parentTime = parentTransform(time);
    return parentTime < from ? parentTime : Math.min(parentTime + to - from, duration);
  };

  return <TimelineTransform.Provider value={transform}>{children}</TimelineTransform.Provider>;
};

export const TimeScale: React.FC<{
  sourceDuration: number;
  targetDuration: number;
  children: React.ReactNode;
}> = ({ sourceDuration, targetDuration, children }) => {
  const parentTransform = useContext(TimelineTransform);
  const transform = (time: number) =>
    parentTransform(time) * (sourceDuration / targetDuration);

  return <TimelineTransform.Provider value={transform}>{children}</TimelineTransform.Provider>;
};

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export const eOut = Easing.out(Easing.cubic);
export const eInOut = Easing.inOut(Easing.cubic);
export const eBack = Easing.out(Easing.back(1.4));

/** Progress 0..1 between t0 and t1 (seconds) with easing. */
export const pr = (
  t: number,
  t0: number,
  t1: number,
  ease: (x: number) => number = eOut
) => ease(clamp01((t - t0) / (t1 - t0)));

/** Opacity window: fades in at a, out at b. */
export const win = (t: number, a: number, b: number, f = 0.7) =>
  clamp01((t - a) / f) * clamp01((b - t) / f);

export const mapRange = (
  t: number,
  inR: [number, number],
  outR: [number, number],
  ease: (x: number) => number = eInOut
) =>
  interpolate(t, inR, outR, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const rnd = (seed: string | number) => random(String(seed));

/* ------------------------------------------------------------------ */
/* Blueprint background                                               */
/* ------------------------------------------------------------------ */
export const Blueprint: React.FC<{ dim?: number }> = ({ dim = 1 }) => {
  const t = useT();
  const drift = (t * 6) % 60;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 35%, ${C.bg1} 0%, ${C.bg0} 75%)`,
      }}
    >
      <svg width={W} height={H} style={{ position: "absolute", opacity: dim }}>
        <defs>
          <pattern
            id="g-small"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${drift} ${drift * 0.4})`}
          >
            <path d="M60 0H0V60" fill="none" stroke="rgba(76,201,240,0.10)" strokeWidth="1" />
          </pattern>
          <pattern
            id="g-big"
            width="300"
            height="300"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${drift} ${drift * 0.4})`}
          >
            <path d="M300 0H0V300" fill="none" stroke="rgba(76,201,240,0.18)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#g-small)" />
        <rect width={W} height={H} fill="url(#g-big)" />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Scene chrome                                                       */
/* ------------------------------------------------------------------ */
export const SceneFrame: React.FC<{
  id: string;
  title: string;
  duration: number;
  paras: string[];
  bg?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, title, duration, paras, bg, children }) => {
  const t = useT();
  const fade = clamp01(t / 0.6) * clamp01((duration - t) / 0.6);
  return (
    <AbsoluteFill style={{ background: C.bg0, fontFamily: FONT }}>
      <AbsoluteFill style={{ opacity: fade }}>
        {bg ?? <Blueprint />}
        {children}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 48,
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: 3,
            color: C.line,
            opacity: 0.85 * pr(t, 0.3, 1.2),
            textTransform: "uppercase",
          }}
        >
          <span style={{ opacity: 0.6 }}>{id}</span> · {title}
        </div>
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 48,
            fontFamily: MONO,
            fontSize: 20,
            letterSpacing: 3,
            color: C.muted,
            opacity: 0.7,
          }}
        >
          UNDER THE HOOD LAB
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Small reusable SVG pieces                                          */
/* ------------------------------------------------------------------ */
export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  weight?: number;
  mono?: boolean;
}> = ({ x, y, children, size = 28, color = C.text, anchor = "middle", opacity = 1, weight = 600, mono }) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontSize={size}
    fontFamily={mono ? MONO : FONT}
    fontWeight={weight}
    textAnchor={anchor}
    opacity={opacity}
  >
    {children}
  </text>
);

export const Glow: React.FC<{ id: string; std?: number }> = ({ id, std = 8 }) => (
  <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation={std} result="b" />
    <feMerge>
      <feMergeNode in="b" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

/** Sine wave path across [x0,x1] centred on y. */
export const wavePath = (
  x0: number,
  x1: number,
  y: number,
  amp: number,
  lambda: number,
  phase: number,
  step = 4
) => {
  let d = "";
  for (let x = x0; x <= x1; x += step) {
    const yy = y + amp * Math.sin(((x - x0) / lambda) * Math.PI * 2 - phase);
    d += (x === x0 ? "M" : "L") + x.toFixed(1) + " " + yy.toFixed(1);
  }
  return d;
};

export const Eye: React.FC<{ x: number; y: number; s?: number; look?: number }> = ({
  x,
  y,
  s = 1,
  look = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-60 0 Q0 -50 60 0 Q0 50 -60 0Z" fill="#eaf6ff" stroke={C.line} strokeWidth={3} />
    <circle cx={look * 14} cy={0} r={22} fill="#2a8cff" />
    <circle cx={look * 14} cy={0} r={10} fill="#04101f" />
    <circle cx={look * 14 - 6} cy={-6} r={4} fill="#fff" />
  </g>
);

export const BigText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 96, color = C.text, style }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      color,
      letterSpacing: -1,
      ...style,
    }}
  >
    {children}
  </div>
);
