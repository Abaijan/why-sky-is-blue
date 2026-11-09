import React from "react";
import { AbsoluteFill } from "remotion";
import { Glow, Label, SceneFrame, lerp, mapRange, pr, rnd, useT, wavePath, win, eInOut, eOut } from "../lib";
import { C, FONT, H, MONO, W } from "../theme";
import type { SceneMeta } from "../narration";

const Compare: React.FC = () => {
  const t = useT();
  const o = win(t, 0.2, 8, 0.7);
  return (
    <g opacity={o}>
      <defs>
        <linearGradient id="paleS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c7f96" />
          <stop offset="1" stopColor="#c8c4b8" />
        </linearGradient>
        <linearGradient id="fireS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1a5a" />
          <stop offset="0.45" stopColor="#c2306a" />
          <stop offset="0.8" stopColor="#ff7a2a" />
          <stop offset="1" stopColor="#ffc247" />
        </linearGradient>
        <clipPath id="cL"><rect x={150} y={230} width={800} height={560} rx={22} /></clipPath>
        <clipPath id="cR"><rect x={970} y={230} width={800} height={560} rx={22} /></clipPath>
      </defs>
      <g clipPath="url(#cL)" opacity={pr(t, 0.8, 2)}>
        <rect x={150} y={230} width={800} height={560} fill="url(#paleS)" />
        <circle cx={560} cy={650} r={40} fill="#efe9d6" opacity={0.8} />
        <path d="M150 740 Q400 700 640 735 T950 730 V790 H150Z" fill="#141a22" />
      </g>
      <g clipPath="url(#cR)" opacity={pr(t, 3.4, 4.8)}>
        <rect x={970} y={230} width={800} height={560} fill="url(#fireS)" />
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={1180 + i * 150 + Math.sin(t + i) * 12} cy={350 + i * 52} rx={170} ry={24} fill="#ff9a6a" opacity={0.6} />
        ))}
        <circle cx={1370} cy={680} r={60} fill="#fff1c2" />
        <path d="M970 740 Q1200 700 1440 735 T1770 730 V790 H970Z" fill="#14070f" />
      </g>
      <Label x={550} y={850} size={36} color={C.muted} opacity={pr(t, 0.8, 2)}>pale and forgettable</Label>
      <Label x={1370} y={850} size={36} color={C.orange} opacity={pr(t, 3.4, 4.8)}>the whole sky on fire</Label>
      <Label x={960} y={175} size={56} color={C.text} weight={800} opacity={pr(t, 5.7, 7)}>What is the difference?</Label>
    </g>
  );
};

const CX = 960, CY = 1750, R = 900;
const Clouds: React.FC = () => {
  const t = useT();
  const o = win(t, 7.4, 33, 0.8);
  const beam = pr(t, 10.5, 15.5, eInOut);
  const lit = pr(t, 17.5, 21);
  const ox = CX + 200;
  const oy = CY - Math.sqrt(R * R - 200 * 200);
  const clouds = [[1260, 600, 1], [1420, 560, 1.25], [1590, 610, 0.95]];
  const overlay = pr(t, 26, 31);
  return (
    <g opacity={o}>
      <defs>
        <Glow id="s8g" std={8} />
        <linearGradient id="rayG" gradientUnits="userSpaceOnUse" x1={100} y1={0} x2={1700} y2={0}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.45" stopColor="#ffb070" />
          <stop offset="0.7" stopColor="#ff5a3c" />
          <stop offset="1" stopColor="#ff3c5a" />
        </linearGradient>
      </defs>
      <circle cx={CX} cy={CY} r={R + 150} fill={`rgba(255,${Math.round(140 - overlay * 60)},90,${0.07 + overlay * 0.1})`} stroke={C.blue} strokeDasharray="10 8" strokeWidth={2} />
      <circle cx={CX} cy={CY} r={R} fill="#07182f" stroke={C.line} strokeWidth={3} />
      {/* sun just below left horizon */}
      <circle cx={120} cy={800} r={90} fill="#ffd166" opacity={0.3} />
      <circle cx={120} cy={800} r={32} fill="#fff1c2" />
      {[800, 770, 740].map((y, i) => (
        <line key={y} x1={150} y1={y} x2={lerp(150, 1560, beam)} y2={y} stroke="url(#rayG)" strokeWidth={i === 0 ? 10 : 6} opacity={i === 0 ? 1 : 0.6} strokeLinecap="round" filter="url(#s8g)" />
      ))}
      {/* clouds */}
      {clouds.map(([cx, cy, s], i) => (
        <g key={i} transform={`translate(${cx} ${cy}) scale(${s})`}>
          {[[-50, 8, 34], [-10, -12, 42], [34, 2, 38], [66, 12, 28]].map(([x, y, r], j) => (
            <circle key={j} cx={x} cy={y} r={r} fill={`rgb(${Math.round(lerp(60, 255, lit))},${Math.round(lerp(70, 120, lit))},${Math.round(lerp(100, 130, lit))})`} />
          ))}
          <ellipse cx={0} cy={36} rx={96} ry={16} fill="#ff4a6a" opacity={lit * 0.55} filter="url(#s8g)" />
        </g>
      ))}
      <circle cx={ox} cy={oy} r={14} fill="#fff" stroke={C.line} strokeWidth={3} />
      <Label x={ox} y={oy + 48} size={22} color={C.muted} mono>YOU</Label>
      <line x1={ox} y1={oy} x2={1400} y2={600} stroke="#ff8aa8" strokeWidth={3} strokeDasharray="8 8" opacity={lit} />
      {/* labels */}
      <Label x={520} y={670} size={30} color={C.text} opacity={win(t, 10.5, 17.2, 0.5)}>1 · Clean, clear air near the horizon</Label>
      <Label x={520} y={710} size={24} color={C.muted} mono weight={400} opacity={win(t, 10.5, 17.2, 0.5)}>so red light can travel far</Label>
      <Label x={1440} y={430} size={30} color={C.text} opacity={win(t, 15.2, 33, 0.5)}>2 · High clouds</Label>
      <Label x={1440} y={472} size={24} color={C.muted} mono weight={400} opacity={win(t, 17.2, 26, 0.5)}>lit from below, after the Sun is gone</Label>
      <Label x={960} y={250} size={50} color={C.text} weight={800} opacity={win(t, 7.5, 10.8, 0.4)}>Two ingredients</Label>
      {/* particles */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = pr(t, 24.8, 26.5);
        const x = 200 + rnd("px" + i) * 1500 + Math.sin(t + i) * 8;
        const y = 330 + rnd("py" + i) * 420;
        const c = ["#c9a37a", "#9aa4ad", "#e8f0f8"][i % 3];
        return <circle key={i} cx={x} cy={y} r={3 + rnd("pr" + i) * 3} fill={c} opacity={a * 0.8} />;
      })}
      <Label x={960} y={250} size={40} color={C.text} opacity={win(t, 24.8, 33, 0.5)}>Dust, smoke and sea salt deepen the colors</Label>
    </g>
  );
};

const Krakatoa: React.FC = () => {
  const t = useT();
  const o = win(t, 32.4, 46.2, 0.8);
  const spread = pr(t, 34, 42, eOut);
  const gx = 560, gy = 560, gr = 290;
  return (
    <g opacity={o}>
      <defs>
        <clipPath id="globeC"><circle cx={gx} cy={gy} r={gr} /></clipPath>
        <linearGradient id="screamS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1030" />
          <stop offset="0.4" stopColor="#c7261e" />
          <stop offset="0.75" stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#ffc84a" />
        </linearGradient>
        <clipPath id="scrC"><rect x={1100} y={280} width={620} height={500} rx={20} /></clipPath>
      </defs>
      <circle cx={gx} cy={gy} r={gr} fill="#08203d" stroke={C.line} strokeWidth={3} />
      <g clipPath="url(#globeC)">
        {[-2, -1, 0, 1, 2].map((i) => (
          <ellipse key={i} cx={gx} cy={gy} rx={gr * Math.abs(Math.cos((i * Math.PI) / 7)) * 0 + gr * (0.25 + Math.abs(i) * 0.3)} ry={gr} fill="none" stroke={C.lineDim} />
        ))}
        {[-2, -1, 0, 1, 2].map((i) => (
          <line key={i} x1={gx - gr} x2={gx + gr} y1={gy + i * 100} y2={gy + i * 100} stroke={C.lineDim} />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={gx + 160} cy={gy + 130} rx={(100 + i * 150) * spread} ry={(60 + i * 80) * spread} fill="rgba(255,90,60,0.12)" stroke="rgba(255,120,80,0.7)" strokeWidth={3} />
        ))}
      </g>
      <circle cx={gx + 160} cy={gy + 130} r={10} fill={C.orange} />
      <Label x={gx} y={gy + gr + 60} size={36} color={C.text}>Krakatoa · 1883</Label>
      <Label x={gx} y={gy + gr + 100} size={24} color={C.muted} mono weight={400} opacity={pr(t, 36, 38)}>ash high up → blood-red sunsets worldwide, for months</Label>
      <g opacity={pr(t, 39.6, 41.5)}>
        <g clipPath="url(#scrC)">
          <rect x={1100} y={280} width={620} height={500} fill="url(#screamS)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={wavePath(1100, 1720, 360 + i * 70, 26, 220 + i * 30, t * 0.8 + i)} fill="none" stroke={["#ff9a3a", "#8a1020", "#ffd166", "#4a1030", "#ff5a2a"][i]} strokeWidth={22} opacity={0.75} />
          ))}
        </g>
        <rect x={1100} y={280} width={620} height={500} rx={20} fill="none" stroke={C.line} strokeWidth={2} />
        <Label x={1410} y={830} size={32} color={C.text}>A fiery sky, like Munch's</Label>
        <Label x={1410} y={870} size={26} color={C.muted} mono weight={400}>"The Scream" · some researchers think…</Label>
      </g>
    </g>
  );
};

const BlueHour: React.FC = () => {
  const t = useT();
  const o = win(t, 45.8, 59.6, 0.8);
  const k = pr(t, 46.5, 51, eInOut);
  const ozone = pr(t, 52.5, 54);
  const x0 = 200, x1 = 1720;
  return (
    <g opacity={o}>
      <defs>
        <linearGradient id="tl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffcf5a" />
          <stop offset="0.28" stopColor="#ff9a3a" />
          <stop offset="0.45" stopColor="#ff4a2a" />
          <stop offset="0.6" stopColor="#5a3a9a" />
          <stop offset="0.75" stopColor="#1f4fc0" />
          <stop offset="1" stopColor="#050a1a" />
        </linearGradient>
      </defs>
      <rect x={x0} y={250} width={(x1 - x0) * k} height={90} rx={14} fill="url(#tl)" />
      {[
        ["GOLDEN HOUR", 0.1],
        ["SUNSET", 0.4],
        ["BLUE HOUR", 0.7],
        ["NIGHT", 0.92],
      ].map(([n, p]) => (
        <Label key={n as string} x={x0 + (x1 - x0) * (p as number)} y={385} size={26} color={C.text} mono opacity={pr(t, 47 + (p as number) * 4, 48 + (p as number) * 4)}>{n}</Label>
      ))}
      {/* ozone diagram */}
      <g opacity={ozone}>
        <rect x={560} y={480} width={800} height={340} fill="rgba(77,163,255,0.08)" stroke={C.blue} strokeDasharray="10 8" />
        <rect x={560} y={560} width={800} height={90} fill="rgba(93,211,158,0.25)" stroke={C.green} />
        <Label x={1380} y={612} size={30} color={C.green} anchor="start" mono>OZONE LAYER</Label>
        <line x1={420} y1={480} x2={820} y2={660} stroke="#fff" strokeWidth={6} />
        <line x1={820} y1={660} x2={1150} y2={800} stroke="#4da3ff" strokeWidth={6} />
        <Label x={760} y={555} size={24} color={C.red} mono>orange + red absorbed</Label>
        <Label x={1260} y={790} size={26} color={C.blue} mono anchor="start">bluer twilight sky</Label>
        <circle cx={820} cy={660} r={16} fill="none" stroke={C.red} strokeWidth={4} />
      </g>
    </g>
  );
};

export const S08: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <SceneFrame id="08" title={meta.title} duration={meta.duration} paras={meta.paras}>
    <AbsoluteFill>
      <svg width={W} height={H}>
        <Compare />
        <Clouds />
        <Krakatoa />
        <BlueHour />
      </svg>
    </AbsoluteFill>
  </SceneFrame>
);
