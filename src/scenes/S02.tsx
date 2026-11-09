import React from "react";
import { AbsoluteFill } from "remotion";
import { Glow, Label, SceneFrame, lerp, pr, useT, wavePath, win, eInOut, eOut } from "../lib";
import { C, FONT, H, MONO, W, wl } from "../theme";
import type { SceneMeta } from "../narration";

const SPEC = [
  { n: "RED", c: "#ff3b30" },
  { n: "ORANGE", c: "#ff9500" },
  { n: "YELLOW", c: "#ffe030" },
  { n: "GREEN", c: "#34e07a" },
  { n: "BLUE", c: "#3b8bff" },
  { n: "VIOLET", c: "#9b5cff" },
];

const SunDistance: React.FC = () => {
  const t = useT();
  const o = win(t, 0, 10);
  const k = pr(t, 1, 5, eInOut);
  return (
    <g opacity={o}>
      <defs>
        <radialGradient id="sunG">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor="#ffe9a0" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={260} cy={540} r={300 + 12 * Math.sin(t * 2)} fill="url(#sunG)" />
      <circle cx={260} cy={540} r={110} fill="#fff6d8" />
      <Label x={260} y={720} size={26} color={C.yellow} mono>THE SUN</Label>
      <line x1={400} y1={540} x2={lerp(400, 1620, k)} y2={540} stroke={C.line} strokeWidth={3} />
      <line x1={400} y1={510} x2={400} y2={570} stroke={C.line} strokeWidth={3} />
      <line x1={1620} y1={510} x2={1620} y2={570} stroke={C.line} strokeWidth={3} opacity={k > 0.99 ? 1 : 0} />
      <circle cx={1700} cy={540} r={44} fill="#2b7fff" />
      <circle cx={1700} cy={540} r={44} fill="none" stroke={C.line} strokeWidth={3} />
      <Label x={1700} y={625} size={26} color={C.line} mono>EARTH</Label>
      <Label x={1010} y={480} size={64} color={C.text}>
        {Math.round(93 * k)} million miles
      </Label>
    </g>
  );
};

const Prism: React.FC = () => {
  const t = useT();
  const o = win(t, 9.5, 34, 0.9);
  const b1 = pr(t, 10.5, 13.5, eInOut); // incoming beam
  const b2 = pr(t, 13.5, 14.5, eInOut);
  const fan = pr(t, 14.5, 18.5, eInOut);
  const A = [960, 340], B = [780, 660], Cc = [1140, 660];
  const inX = 870, inY = 500, outX = 1050, outY = 500;
  return (
    <g opacity={o}>
      <defs>
        <Glow id="pg" std={6} />
        <linearGradient id="prismF" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(160,220,255,0.35)" />
          <stop offset="1" stopColor="rgba(76,201,240,0.08)" />
        </linearGradient>
      </defs>
      <polygon points={`${A} ${B} ${Cc}`} fill="url(#prismF)" stroke={C.line} strokeWidth={4} />
      <line x1={140} y1={600} x2={lerp(140, inX, b1)} y2={lerp(600, inY, b1)} stroke="#fff" strokeWidth={12} strokeLinecap="round" filter="url(#pg)" />
      <line x1={inX} y1={inY} x2={lerp(inX, outX, b2)} y2={outY} stroke="#fff" strokeWidth={9} opacity={b1 > 0.99 ? 1 : 0} />
      {SPEC.map((s, i) => {
        const ey = 600 + i * 56;
        const x2 = lerp(outX, 1760, fan);
        const y2 = lerp(outY, ey, fan);
        return (
          <g key={s.n}>
            <line x1={outX} y1={outY} x2={x2} y2={y2} stroke={s.c} strokeWidth={13} strokeLinecap="round" filter="url(#pg)" />
            <Label x={1790} y={ey + 8} size={24} color={s.c} anchor="start" mono opacity={pr(t, 18.5 + i * 0.3, 19.3 + i * 0.3)}>
              {s.n}
            </Label>
          </g>
        );
      })}
      <Label x={960} y={760} size={26} color={C.muted} mono>GLASS PRISM</Label>
      <Label x={300} y={300} size={44} color={C.text} opacity={pr(t, 11, 12.5)}>Newton, 1666</Label>
      <Label x={300} y={345} size={28} color={C.muted} opacity={pr(t, 11, 12.5)} weight={400}>a thin beam of sunlight…</Label>
      <Label x={960} y={960} size={40} color={C.text} opacity={win(t, 20.5, 33)}>
        The prism doesn't add colors. It spreads them apart.
      </Label>
    </g>
  );
};

const Waves: React.FC = () => {
  const t = useT();
  const o = win(t, 34, 54, 0.9);
  const ph = t * 3.2;
  const rows = [
    { y: 330, w: 700, px: 350, name: "RED", at: 37.5, col: "#ff3b30" },
    { y: 560, w: 400, px: 200, name: "VIOLET", at: 47, col: "#9b5cff" },
    { y: 790, w: 450, px: 225, name: "BLUE", at: 50.5, col: "#3b8bff" },
  ];
  return (
    <g opacity={o}>
      <defs><Glow id="wg" std={4} /></defs>
      {rows.map((r) => {
        const a = pr(t, r.at, r.at + 1.5);
        const x1 = lerp(300, 1450, a);
        return (
          <g key={r.name} opacity={a > 0 ? 1 : 0}>
            <path d={wavePath(300, x1, r.y, 60, r.px, ph)} fill="none" stroke={r.col} strokeWidth={7} filter="url(#wg)" />
            <Label x={70} y={r.y - 8} size={34} color={r.col} anchor="start">{r.name}</Label>
            <Label x={70} y={r.y + 34} size={30} color={C.text} anchor="start" mono>{r.w} nm</Label>
            {/* crest-to-crest bracket */}
            <g opacity={pr(t, r.at + 1.5, r.at + 2.5)}>
              <line x1={300} y1={r.y + 90} x2={300 + r.px} y2={r.y + 90} stroke={C.text} strokeWidth={2} />
              <line x1={300} y1={r.y + 80} x2={300} y2={r.y + 100} stroke={C.text} strokeWidth={2} />
              <line x1={300 + r.px} y1={r.y + 80} x2={300 + r.px} y2={r.y + 100} stroke={C.text} strokeWidth={2} />
              <Label x={300 + r.px / 2} y={r.y + 128} size={22} color={C.muted} mono>crest to crest</Label>
            </g>
          </g>
        );
      })}
      {/* hair scale bar: 70,000 nm vs 700 nm drawn at 1 px = 100 nm */}
      <g opacity={win(t, 42.5, 47.5, 0.7)}>
        <rect x={1620} y={200} width={70} height={700} rx={8} fill="#2a2018" stroke="#c9a37a" strokeWidth={2} />
        <rect x={1700} y={893} width={70} height={7} fill="#ff3b30" />
        <Label x={1655} y={170} size={26} color="#c9a37a" mono>HAIR ≈ 70,000 nm</Label>
        <Label x={1740} y={930} size={22} color="#ff3b30" mono>red wave = 700 nm</Label>
        <Label x={1655} y={990} size={22} color={C.muted} mono weight={400}>100× thinner</Label>
      </g>
    </g>
  );
};

const Secret: React.FC = () => {
  const t = useT();
  const o = pr(t, 54.5, 56, eOut);
  return (
    <g opacity={o} transform={`translate(0 ${(1 - o) * 30})`}>
      <Label x={960} y={470} size={120} color={C.text} weight={800}>
        <tspan fill="#ff5a3c">Red is long.</tspan>
      </Label>
      <Label x={960} y={620} size={120} color={C.blue} weight={800}>Blue is short.</Label>
      <Label x={960} y={730} size={38} color={C.muted} weight={400}>It is the whole secret.</Label>
    </g>
  );
};

export const S02: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <SceneFrame id="02" title={meta.title} duration={meta.duration} paras={meta.paras}>
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SunDistance />
        <Prism />
        <Waves />
        <Secret />
      </svg>
    </AbsoluteFill>
  </SceneFrame>
);
