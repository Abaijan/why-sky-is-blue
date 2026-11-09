import React from "react";
import { AbsoluteFill } from "remotion";
import { Label, SceneFrame, TimeScale, lerp, mapRange, pr, rnd, useT, win, eInOut, eOut } from "../lib";
import { C, H, MONO, W } from "../theme";
import type { SceneMeta } from "../narration";

const Molecule: React.FC<{ x: number; y: number; rot: number; kind: "N" | "O"; s?: number }> = ({ x, y, rot, kind, s = 1 }) => {
  const col = kind === "N" ? C.n2 : C.o2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <circle cx={-11} cy={0} r={16} fill={col} />
      <circle cx={11} cy={0} r={16} fill={col} />
      <circle cx={-15} cy={-5} r={5} fill="#fff" opacity={0.5} />
    </g>
  );
};

const Field: React.FC = () => {
  const t = useT();
  const o = Math.max(win(t, 5.5, 20.8, 0.9), win(t, 26.8, 32.3, 0.9));
  const zoom = mapRange(t, [5.5, 11], [0.25, 1]);
  const N = 70;
  return (
    <g opacity={o}>
      <g transform={`translate(0 0)`}>
        {Array.from({ length: N }).map((_, i) => {
          const bx = 80 + rnd("x" + i) * 1000;
          const by = 190 + rnd("y" + i) * 700;
          const kind = rnd("k" + i) < 0.78 ? "N" : "O";
          const x = 580 + (bx - 580) * zoom + Math.sin(t * 0.9 + i) * 14;
          const y = 540 + (by - 540) * zoom + Math.cos(t * 0.8 + i * 1.7) * 14;
          return <Molecule key={i} x={x} y={y} rot={(t * 40 + i * 37) % 360} kind={kind} s={0.5 + zoom * 0.7} />;
        })}
      </g>
      <rect x={60} y={170} width={1040} height={740} rx={18} fill="none" stroke={C.lineDim} strokeWidth={2} strokeDasharray="10 10" />
      {/* composition bar */}
      <g opacity={pr(t, 14.5, 16)}>
        <rect x={1180} y={300} width={620} height={46} rx={10} fill={C.n2} />
        <rect x={1180} y={300} width={620 * 0.78} height={46} rx={10} fill={C.n2} />
        <rect x={1180 + 620 * 0.78} y={300} width={620 * 0.21} height={46} fill={C.o2} />
        <rect x={1180 + 620 * 0.99} y={300} width={620 * 0.01} height={46} fill={C.yellow} />
        <Label x={1180} y={385} size={28} color={C.n2} anchor="start" mono>78% nitrogen N₂</Label>
        <Label x={1180} y={425} size={28} color={C.o2} anchor="start" mono>21% oxygen O₂</Label>
        <Label x={1180} y={465} size={28} color={C.yellow} anchor="start" mono>1% other</Label>
      </g>
      <g opacity={pr(t, 9.6, 11)}>
        <Label x={1180} y={215} size={26} color={C.muted} anchor="start" mono>ONE BREATH CONTAINS</Label>
        <Label x={1180} y={285} size={54} color={C.text} anchor="start" mono>
          {"> 10"}
          <tspan fontSize={34} dy={-24}>22</tspan><tspan dy={24}> molecules</tspan>
        </Label>
      </g>
      <Label x={1180} y={600} size={36} color={C.text} anchor="start" opacity={pr(t, 27, 28.5)}>An ocean of invisible obstacles.</Label>
      <Label x={1180} y={650} size={26} color={C.muted} anchor="start" weight={400} opacity={pr(t, 27.5, 29)}>
        Every beam of sunlight has to swim through it.
      </Label>
    </g>
  );
};

const SizeCompare: React.FC = () => {
  const t = useT();
  const o = win(t, 20.3, 27.2, 0.8);
  const k = pr(t, 20.8, 23.5);
  return (
    <g opacity={o}>
      <Label x={960} y={260} size={42} color={C.text}>Molecules are tiny.</Label>
      {/* wave */}
      <path d={`M 360 560 ${Array.from({ length: 121 }).map((_, i) => `L ${360 + i * 10} ${560 + 90 * Math.sin((i * 10) / 400 * Math.PI * 2 - t * 3)}`).join(" ")}`} fill="none" stroke={C.blue} strokeWidth={7} opacity={k} />
      <g opacity={k}>
        <line x1={360} y1={720} x2={760} y2={720} stroke={C.text} strokeWidth={2} />
        <line x1={360} y1={710} x2={360} y2={730} stroke={C.text} strokeWidth={2} />
        <line x1={760} y1={710} x2={760} y2={730} stroke={C.text} strokeWidth={2} />
        <Label x={560} y={765} size={28} color={C.blue} mono>BLUE LIGHT · 450 nm</Label>
      </g>
      <g opacity={pr(t, 23.5, 25)}>
        <circle cx={1260} cy={560} r={4} fill={C.n2} />
        <line x1={1260} y1={600} x2={1260} y2={640} stroke={C.n2} strokeWidth={2} />
        <Label x={1260} y={690} size={28} color={C.n2} mono>N₂ molecule ≈ 0.3 nm</Label>
        <Label x={1260} y={735} size={44} color={C.text}>1000× smaller</Label>
      </g>
    </g>
  );
};

const Altitude: React.FC = () => {
  const t = useT();
  const o = win(t, 31.5, 49.5, 0.9);
  const grow = pr(t, 32, 37, eInOut);
  const x0 = 700, w = 160, yTop = 210, yBot = 900, hMax = yBot - yTop;
  const yAt = (mi: number) => yBot - (mi / 60) * hMax;
  const dens: [number, number][] = [];
  for (let m = 0; m <= 60; m += 1) dens.push([m, Math.exp(-m / 5.6)]);
  return (
    <g opacity={o}>
      <defs>
        <linearGradient id="airG" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={C.blue} stopOpacity="0.95" />
          <stop offset="0.1" stopColor={C.blue} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.blue} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect x={x0} y={lerp(yBot, yTop, grow)} width={w} height={(yBot - yTop) * grow} fill="url(#airG)" stroke={C.line} strokeWidth={2} />
      {[0, 6, 20, 40, 60].map((m) => (
        <g key={m} opacity={grow}>
          <line x1={x0 - 14} y1={yAt(m)} x2={x0} y2={yAt(m)} stroke={C.line} />
          <Label x={x0 - 24} y={yAt(m) + 8} size={24} color={C.muted} anchor="end" mono>{m} mi</Label>
        </g>
      ))}
      <g opacity={pr(t, 36.5, 38.5)}>
        <rect x={x0 + w} y={yAt(6)} width={30} height={yBot - yAt(6)} fill={C.yellow} opacity={0.85} />
        <line x1={x0 + w + 40} y1={yAt(6)} x2={x0 + w + 220} y2={yAt(6)} stroke={C.yellow} strokeWidth={2} />
        <Label x={x0 + w + 240} y={yAt(6) - 6} size={46} color={C.yellow} anchor="start">75% of all air</Label>
        <Label x={x0 + w + 240} y={yAt(6) + 34} size={28} color={C.muted} anchor="start" mono weight={400}>in the lowest 6 miles</Label>
      </g>
      <Label x={x0 + w + 240} y={yAt(60) + 10} size={28} color={C.muted} anchor="start" mono weight={400} opacity={grow}>≈ 60 miles up: the atmosphere ends</Label>
      {/* sunbeam swimming in */}
      <g opacity={pr(t, 40.2, 42)}>
        <line x1={180} y1={250} x2={x0} y2={yAt(2)} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        <Label x={200} y={220} size={26} color={C.yellow} mono anchor="start">SUNBEAM</Label>
      </g>
    </g>
  );
};

const S03Content: React.FC<{ meta: SceneMeta }> = ({ meta }) => {
  const t = useT();
  return (
    <SceneFrame id="03" title={meta.title} duration={50} paras={meta.paras}>
      <AbsoluteFill>
        <svg width={W} height={H}>
          <Label x={960} y={540} size={90} color={C.text} weight={800} opacity={win(t, 5.3, 9.8, 0.8)}>
            Air is not nothing.
          </Label>
          <g opacity={win(t, 0.3, 5.6, 0.7)}>
            <circle cx={1950} cy={540} r={700} fill="rgba(77,163,255,0.16)" stroke={C.blue} strokeWidth={3} strokeDasharray="12 9" />
            <line x1={100} y1={540} x2={100 + pr(t, 0.8, 4.5, eInOut) * 1150} y2={540} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
            <Label x={1000} y={470} size={32} color={C.muted} mono>ENTERING THE ATMOSPHERE</Label>
          </g>
          <Field />
          <SizeCompare />
          <Altitude />
        </svg>
      </AbsoluteFill>
    </SceneFrame>
  );
};

export const S03: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeScale sourceDuration={50} targetDuration={meta.duration}>
    <S03Content meta={meta} />
  </TimeScale>
);
