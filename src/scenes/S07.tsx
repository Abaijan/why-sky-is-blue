import React from "react";
import { AbsoluteFill } from "remotion";
import { Glow, Label, SceneFrame, TimeScale, lerp, mapRange, pr, useT, win, eInOut, eOut } from "../lib";
import { C, FONT, H, MONO, W } from "../theme";
import type { SceneMeta } from "../narration";

// Earth geometry (atmosphere exaggerated for clarity)
const CX = 820, CY = 560, R = 380, AT = 60;
const RA = R + AT;

// Kasten & Young air mass for a given solar zenith angle (deg)
const airMass = (z: number) => 1 / (Math.cos((z * Math.PI) / 180) + 0.50572 * Math.pow(96.07995 - z, -1.6364));

// Beam colour after crossing `am` air masses (normalised so red stays bright)
const beamColor = (am: number) => {
  const tau = (w: number) => 0.1 * Math.pow(450 / w, 4);
  const T = (w: number) => Math.exp(-tau(w) * am);
  const r = T(650), g = T(550), b = T(450);
  const m = Math.max(r, g, b);
  const f = (v: number) => Math.round(255 * Math.pow(v / m, 0.6));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
};

const Scene: React.FC = () => {
  const t = useT();
  // observer angle phi: -90 (noon, Sun at zenith) -> -2 (sunset)
  const phiDeg = mapRange(t, [8, 70], [-90, -0.1], eInOut);
  const phi = (phiDeg * Math.PI) / 180;
  const px = CX + R * Math.sin(phi);
  const py = CY - R * Math.cos(phi);
  const z = phiDeg + 90; // solar zenith angle
  const am = airMass(Math.min(z, 89.95));
  // beam enters atmosphere at left along horizontal line y = py
  const dy = py - CY;
  const entryX = CX - Math.sqrt(Math.max(0, RA * RA - dy * dy));
  const col = beamColor(am);
  const show = pr(t, 0.5, 2, eOut);

  // scattered-blue tick marks along the path
  const ticks = [];
  const n = 18;
  const len = px - entryX;
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n;
    const x = entryX + len * u;
    const a = -0.6 - ((i * 37) % 10) * 0.25 + (i % 2 ? Math.PI : 0);
    const L = 26 + ((i * 53) % 22);
    const k = pr(t, 12 + (i % 5) * 0.2, 14);
    ticks.push(
      <line key={i} x1={x} y1={py} x2={x + Math.cos(a) * L * k} y2={py + Math.sin(a) * L * k} stroke={C.blue} strokeWidth={4} strokeLinecap="round" opacity={0.7 * k} />
    );
  }

  // inset sky
  const sunElev = 90 - z;
  const skyTop = z < 70 ? "#1a68d8" : `rgb(${Math.round(lerp(26, 20, (z - 70) / 20))},${Math.round(lerp(104, 14, (z - 70) / 20))},${Math.round(lerp(216, 70, (z - 70) / 20))})`;
  const skyBot = beamColor(am * 0.7);
  const sunScreenY = 110 + lerp(40, 245, Math.pow(Math.min(1, z / 90), 1.3));
  return (
    <g opacity={show}>
      <defs>
        <Glow id="s7g" std={6} />
        <linearGradient id="beamG" gradientUnits="userSpaceOnUse" x1={entryX} y1={py} x2={px} y2={py}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="1" stopColor={col} />
        </linearGradient>
        <radialGradient id="sunS">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
        <clipPath id="insetC"><rect x={1360} y={110} width={460} height={290} rx={18} /></clipPath>
      </defs>
      {/* sun on the left */}
      <circle cx={110} cy={py} r={110} fill="url(#sunS)" />
      <circle cx={110} cy={py} r={34} fill="#fff" />
      {/* atmosphere + earth */}
      <circle cx={CX} cy={CY} r={RA} fill="rgba(77,163,255,0.14)" stroke={C.blue} strokeWidth={2} strokeDasharray="10 8" />
      <circle cx={CX} cy={CY} r={R} fill="#08203d" stroke={C.line} strokeWidth={3} />
      {/* incoming parallel rays */}
      {[-1, 1].map((s) => (
        <line key={s} x1={150} y1={py + s * 90} x2={CX - Math.sqrt(Math.max(0, RA * RA - (py + s * 90 - CY) ** 2))} y2={py + s * 90} stroke="rgba(255,255,255,0.35)" strokeWidth={3} strokeDasharray="10 10" />
      ))}
      <line x1={150} y1={py} x2={entryX} y2={py} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
      <line x1={entryX} y1={py} x2={px} y2={py} stroke="url(#beamG)" strokeWidth={12} strokeLinecap="round" filter="url(#s7g)" />
      {ticks}
      {/* observer */}
      <circle cx={px} cy={py} r={14} fill="#fff" stroke={C.line} strokeWidth={3} />
      <line x1={px} y1={py} x2={px + Math.sin(phi) * 70} y2={py - Math.cos(phi) * 70} stroke={C.line} strokeWidth={3} strokeDasharray="6 6" />
      <Label x={px - 22} y={py + 54} size={22} color={C.muted} mono anchor="end">YOU</Label>
      {/* path length bracket */}
      <Label x={(entryX + px) / 2} y={py - 36} size={28} color={C.text} mono opacity={pr(t, 3, 4.5)}>path through air</Label>

      {/* counter */}
      <g transform="translate(1360 520)">
        <Label x={0} y={0} size={26} color={C.muted} anchor="start" mono>AIR ALONG THE PATH</Label>
        <Label x={0} y={96} size={110} color={C.text} anchor="start" weight={800}>
          {am < 10 ? am.toFixed(1) : Math.round(am)}×
        </Label>
        <rect x={0} y={130} width={460} height={18} rx={9} fill="rgba(255,255,255,0.1)" />
        <rect x={0} y={130} width={460 * Math.min(1, am / 40)} height={18} rx={9} fill={col} />
        <Label x={0} y={200} size={34} color={C.yellow} anchor="start" opacity={win(t, 2.5, 8.5, 0.5)}>Noon: the thinnest path</Label>
        <Label x={0} y={200} size={34} color={C.red} anchor="start" opacity={pr(t, 64, 66)}>Sunset: ≈ 40× more air</Label>
        <Label x={0} y={252} size={26} color={C.muted} anchor="start" weight={400} opacity={win(t, 2.5, 8.5, 0.5)}>almost straight down</Label>
        <Label x={0} y={252} size={26} color={C.muted} anchor="start" weight={400} opacity={pr(t, 64, 66)}>shallow angle, long journey</Label>
      </g>
      {/* inset: what you see */}
      <g>
        <g clipPath="url(#insetC)">
          <rect x={1360} y={110} width={460} height={290} fill={skyTop} />
          <rect x={1360} y={230} width={460} height={170} fill={skyBot} opacity={0.8} />
          <circle cx={1590} cy={sunScreenY} r={64} fill={col} opacity={0.35} />
          <circle cx={1590} cy={sunScreenY} r={26} fill={col} />
          <path d="M1360 400 V360 Q1500 335 1620 358 T1820 352 V400Z" fill="#06101c" />
        </g>
        <rect x={1360} y={110} width={460} height={290} rx={18} fill="none" stroke={C.line} strokeWidth={2} />
        <Label x={1360} y={96} size={22} color={C.muted} anchor="start" mono>WHAT YOU SEE</Label>
      </g>
    </g>
  );
};

const Notes: React.FC = () => {
  const t = useT();
  return (
    <g>
      <Label x={90} y={100} size={38} anchor="start" color={C.text} opacity={win(t, 8, 26, 0.6)}>
        Blue keeps getting scattered out of the beam.
      </Label>
      <Label x={90} y={100} size={38} anchor="start" color={C.text} opacity={win(t, 26, 48, 0.6)}>
        Over a path 40× longer, almost all the blue is gone.
      </Label>
      <Label x={90} y={100} size={38} anchor="start" color={C.orange} opacity={win(t, 48, 60.9, 0.6)}>
        Only orange and red reach your eyes.
      </Label>
      <Label x={90} y={100} size={38} anchor="start" color={C.blue} opacity={win(t, 60.9, 69, 0.6)}>
        Somewhere else, that blue lights a morning sky.
      </Label>
      <Label x={90} y={100} size={38} anchor="start" color={C.text} opacity={win(t, 69.2, 80, 0.6)}>
        yellow → orange → red → deep indigo
      </Label>
    </g>
  );
};

export const S07: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeScale sourceDuration={80} targetDuration={meta.duration}>
    <SceneFrame id="07" title={meta.title} duration={80} paras={meta.paras}>
      <AbsoluteFill>
        <svg width={W} height={H}>
          <Scene />
          <Notes />
        </svg>
      </AbsoluteFill>
    </SceneFrame>
  </TimeScale>
);
