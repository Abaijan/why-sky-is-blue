import React from "react";
import { AbsoluteFill, interpolateColors } from "remotion";
import { Glow, Label, SceneFrame, TimeCut, lerp, mapRange, pr, useT, win, eInOut, eOut, eBack } from "../lib";
import { C, FONT, H, MONO, W } from "../theme";
import type { SceneMeta } from "../narration";

const SkyTimelapse: React.FC = () => {
  const t = useT();
  const p = pr(t, 0.4, 14, eInOut);
  const top = interpolateColors(p, [0, 0.55, 0.8, 1], ["#1565d8", "#2a78e0", "#3a3f9a", "#150f3d"]);
  const mid = interpolateColors(p, [0, 0.55, 0.8, 1], ["#4f9bf0", "#6fb0f2", "#b0508a", "#7a2a5a"]);
  const hor = interpolateColors(p, [0, 0.55, 0.8, 1], ["#bfe1ff", "#d3e9ff", "#ff9a3c", "#ff4a1e"]);
  const th = lerp(Math.PI * 0.5, Math.PI * 0.03, p);
  const sx = 960 + 960 * Math.cos(th);
  const sy = 800 - 700 * Math.sin(th);
  const sunCol = interpolateColors(p, [0, 0.6, 0.85, 1], ["#ffffff", "#fff6d8", "#ffb347", "#ff4a1e"]);
  const glowR = lerp(240, 520, p);
  const hours = 12 + p * 7.6;
  const hh = Math.floor(hours);
  const mm = Math.floor((hours - hh) * 60);
  const op = 1 - pr(t, 14, 17, eInOut);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <svg width={W} height={H}>
        <defs>
          <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={top} />
            <stop offset="0.6" stopColor={mid} />
            <stop offset="1" stopColor={hor} />
          </linearGradient>
          <radialGradient id="sunGlow1">
            <stop offset="0" stopColor={sunCol} stopOpacity="0.95" />
            <stop offset="0.25" stopColor={sunCol} stopOpacity="0.45" />
            <stop offset="1" stopColor={sunCol} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#sky1)" />
        <circle cx={sx} cy={sy} r={glowR} fill="url(#sunGlow1)" />
        <circle cx={sx} cy={sy} r={46} fill={sunCol} />
        <path
          d="M0 880 Q260 800 520 860 T1040 850 T1560 830 T1920 860 V1080 H0Z"
          fill="#07101c"
        />
        <path
          d="M0 940 Q300 890 640 930 T1300 920 T1920 940 V1080 H0Z"
          fill="#030a14"
        />
        <Label x={90} y={1040} size={34} color="#fff" anchor="start" opacity={win(t, 1, 5.5) * 0.9} mono>
          NOON · deep blue
        </Label>
        <Label x={90} y={1040} size={34} color="#fff" anchor="start" opacity={win(t, 11, 15.5) * 0.9} mono>
          SUNSET · burning red
        </Label>
        <Label x={1840} y={1040} size={34} color="#fff" anchor="end" opacity={0.85} mono>
          {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}
        </Label>
      </svg>
    </AbsoluteFill>
  );
};

const QSwatch: React.FC<{ x: number; color: string; label: string; at: number }> = ({ x, color, label, at }) => {
  const t = useT();
  const s = pr(t, at, at + 0.9, eBack);
  const pulse = 1 + 0.04 * Math.sin(t * 4);
  return (
    <g transform={`translate(${x} 430) scale(${s * pulse})`} opacity={win(t, at, 33, 0.6)}>
      <rect x={-150} y={-120} width={300} height={240} rx={26} fill={color} opacity={0.9} />
      <Label x={0} y={30} size={150} color="#fff">?</Label>
      <Label x={0} y={170} size={30} color={C.muted} mono>{label}</Label>
    </g>
  );
};

const Chip: React.FC<{ i: number; at: number; text: string }> = ({ i, at, text }) => {
  const t = useT();
  const k = pr(t, at, at + 0.45, eOut);
  return (
    <div
      style={{
        position: "absolute",
        left: 1000,
        top: 470 + i * 62,
        opacity: k,
        transform: `translateX(${(1 - k) * 60}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontFamily: FONT,
        fontSize: 36,
        color: C.text,
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          border: `2px solid ${C.line}`,
          color: C.line,
          fontFamily: MONO,
          fontSize: 24,
          display: "grid",
          placeItems: "center",
        }}
      >
        {i + 1}
      </span>
      {text}
    </div>
  );
};

const EarthSection: React.FC = () => {
  const t = useT();
  const vis = pr(t, 14.5, 17, eOut);
  const beam = pr(t, 17, 21.5, eInOut);
  const sunX = 130, sunY = 120;
  const ex = lerp(sunX, 905, beam), ey = lerp(sunY, 748, beam);
  const cx = 960, cy = 1900, R = 1100, A = 1170;
  return (
    <AbsoluteFill style={{ opacity: vis }}>
      <svg width={W} height={H}>
        <defs>
          <Glow id="gl1" std={7} />
          <radialGradient id="sunG2">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="atm" cx="0.5" cy="1" r="0.5">
            <stop offset="0.9" stopColor={C.blue} stopOpacity="0.0" />
            <stop offset="0.94" stopColor={C.blue} stopOpacity="0.28" />
            <stop offset="1" stopColor={C.blue} stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={A} fill="rgba(77,163,255,0.14)" stroke={C.blue} strokeWidth={2} strokeDasharray="10 8" />
        <circle cx={cx} cy={cy} r={R} fill="#08203d" stroke={C.line} strokeWidth={3} />
        <circle cx={cx} cy={cy} r={R - 60} fill="none" stroke={C.lineDim} strokeWidth={1.5} strokeDasharray="4 10" />
        <Label x={420} y={925} size={24} color={C.blue} mono anchor="start">ATMOSPHERE</Label>
        <circle cx={sunX} cy={sunY} r={120} fill="url(#sunG2)" />
        <circle cx={sunX} cy={sunY} r={40} fill="#fff" />
        <line x1={sunX} y1={sunY} x2={ex} y2={ey} stroke="#fff" strokeWidth={9} strokeLinecap="round" filter="url(#gl1)" />
        <circle cx={ex} cy={ey} r={14 * beam} fill="#fff" filter="url(#gl1)" />
        <Label x={sunX + 60} y={sunY + 110} size={26} color={C.yellow} mono anchor="start" opacity={win(t, 15, 40)}>
          SUNLIGHT
        </Label>
        <QSwatch x={1160} color={C.blue} label="NOON" at={20.5} />
        <QSwatch x={1560} color={C.red} label="SUNSET" at={22.5} />
      </svg>
      <div style={{ position: "absolute", left: 1000, top: 190, opacity: pr(t, 33, 34.5), transform: `translateY(${(1 - pr(t, 33, 34.5)) * 30}px)` }}>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 104, lineHeight: 1.02, color: C.text, letterSpacing: -2 }}>
          Why is the
          <br />
          <span style={{ color: C.blue }}>sky blue</span>
          <span style={{ color: C.red }}>?</span>
        </div>
      </div>
      <Chip i={0} at={42} text="Why is the sky blue?" />
      <Chip i={1} at={43} text="Why isn't it violet?" />
      <Chip i={2} at={44} text="Why do sunsets glow red?" />
      <Chip i={3} at={45} text="Why is the sunset on Mars blue?" />
    </AbsoluteFill>
  );
};

export const S01: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeCut from={34} to={41} duration={meta.duration + 7}>
    <SceneFrame id="01" title={meta.title} duration={meta.duration + 7} paras={meta.paras}>
      <EarthSection />
      <SkyTimelapse />
    </SceneFrame>
  </TimeCut>
);
