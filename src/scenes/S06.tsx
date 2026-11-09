import React from "react";
import { AbsoluteFill } from "remotion";
import { Glow, Label, SceneFrame, lerp, pr, rnd, useT, win, eBack, eInOut, eOut } from "../lib";
import { C, H, W } from "../theme";
import type { SceneMeta } from "../narration";

const SkyDome: React.FC = () => {
  const t = useT();
  const o = win(t, 0.2, 24.2, 0.8);
  return (
    <g opacity={o}>
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f5bd0" />
          <stop offset="0.5" stopColor="#3f8ff0" />
          <stop offset="0.9" stopColor="#bddcff" />
          <stop offset="1" stopColor="#e6f2ff" />
        </linearGradient>
        <clipPath id="skyClip"><rect x={110} y={170} width={860} height={730} rx={22} /></clipPath>
      </defs>
      <g clipPath="url(#skyClip)">
        <rect x={110} y={170} width={860} height={730} fill="url(#skyG)" />
        <path d="M110 840 Q300 800 480 830 T800 820 T970 835 V900 H110Z" fill="#0a1522" />
      </g>
      <rect x={110} y={170} width={860} height={730} rx={22} fill="none" stroke={C.line} strokeWidth={2} />
      <g opacity={pr(t, 3, 4.5)}>
        <Label x={540} y={250} size={34} color="#fff" mono>OVERHEAD · deep blue</Label>
      </g>
      <g opacity={pr(t, 5.5, 7)}>
        <Label x={540} y={780} size={34} color="#0a2a55" mono>HORIZON · pale, almost white</Label>
      </g>
      <Label x={540} y={560} size={110} color="#fff" weight={800} opacity={win(t, 8, 9.8, 0.4) * 0.9}>Why?</Label>
      <LineOfSight />
    </g>
  );
};

const LineOfSight: React.FC = () => {
  const t = useT();
  const ox = 1260, oy = 850, top = 520;
  const a = pr(t, 9.4, 11, eOut);
  const dots: React.ReactNode[] = [];
  // overhead: few blue dots
  for (let i = 0; i < 6; i++) {
    const u = (t * 0.45 + i / 6) % 1;
    dots.push(<circle key={"v" + i} cx={ox} cy={lerp(top, oy - 30, u)} r={7} fill={C.blue} />);
  }
  // horizon: many mixed colours
  const cols = ["#4da3ff", "#6fd6a0", "#ffd166", "#ff7a5a", "#b58cff", "#4da3ff", "#fff"];
  for (let i = 0; i < 36; i++) {
    const u = (t * 0.3 + i / 36) % 1;
    const ang = -0.28;
    const sx = 1780, sy = oy + Math.tan(ang) * (sx - ox) * -1;
    const x = lerp(sx, ox + 40, u);
    const y = lerp(oy - 120, oy - 16, u);
    dots.push(<circle key={"h" + i} cx={x} cy={y + Math.sin(i) * 4} r={6} fill={cols[i % cols.length]} opacity={0.9} />);
  }
  const mixK = pr(t, 19.7, 22);
  return (
    <g opacity={a}>
      <rect x={1040} y={top} width={780} height={oy - top} fill="rgba(77,163,255,0.10)" stroke={C.blue} strokeDasharray="10 8" />
      <line x1={1040} y1={oy} x2={1820} y2={oy} stroke={C.line} strokeWidth={3} />
      <line x1={ox} y1={top} x2={ox} y2={oy - 20} stroke="#fff" strokeWidth={2} strokeDasharray="6 8" opacity={0.6} />
      <line x1={1790} y1={oy - 130} x2={ox + 40} y2={oy - 16} stroke="#fff" strokeWidth={2} strokeDasharray="6 8" opacity={0.6} />
      {dots}
      <circle cx={ox} cy={oy} r={16} fill="#fff" />
      <Label x={ox} y={oy + 50} size={22} color={C.muted} mono>YOU</Label>
      <Label x={ox - 24} y={top + 60} size={26} color={C.text} anchor="end" mono opacity={pr(t, 11.5, 13)}>short path</Label>
      <Label x={1790} y={oy - 160} size={26} color={C.text} anchor="end" mono opacity={pr(t, 11.5, 13)}>MUCH more air →</Label>
      <Label x={1430} y={top - 24} size={26} color={C.muted} mono opacity={pr(t, 12.5, 14)}>ATMOSPHERE</Label>
      <g opacity={mixK}>
        <rect x={1100} y={top + 20} width={90} height={90} rx={14} fill="#1565d8" />
        <rect x={1700} y={top + 20} width={90} height={90} rx={14} fill="#cfe5ff" />
        <Label x={1745} y={top + 140} size={22} color={C.muted} mono>blue + all other colors ≈ white</Label>
      </g>
    </g>
  );
};

const Arrow: React.FC<{ x: number; y: number; ang: number; len: number; c: string; k: number }> = ({ x, y, ang, len, c, k }) => {
  const L = len * k;
  const ex = x + Math.cos(ang) * L, ey = y + Math.sin(ang) * L;
  const hx = Math.cos(ang), hy = Math.sin(ang);
  return (
    <g>
      <line x1={x} y1={y} x2={ex} y2={ey} stroke={c} strokeWidth={7} strokeLinecap="round" />
      <polygon points={`${ex + hx * 18},${ey + hy * 18} ${ex - hy * 10},${ey + hx * 10} ${ex + hy * 10},${ey - hx * 10}`} fill={c} opacity={k > 0.9 ? 1 : 0} />
    </g>
  );
};

const Cloud: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    {[[-70, 10, 50], [-20, -20, 62], [40, -8, 56], [90, 14, 42], [10, 18, 58]].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" opacity={0.95} />
    ))}
  </g>
);

const MieCompare: React.FC = () => {
  const t = useT();
  const o = win(t, 23.5, 50, 0.8);
  const k = pr(t, 29.5, 34, eInOut);
  const angs = [-2.6, -1.9, 2.0, 2.7, 0.9, -0.9];
  const k2 = pr(t, 33, 37, eInOut);
  const rgbK = pr(t, 36.2, 38, eBack);
  return (
    <g opacity={o}>
      {/* left: molecule */}
      <g>
        <Label x={480} y={250} size={36} color={C.text}>Air molecule</Label>
        <Label x={480} y={290} size={24} color={C.muted} mono weight={400}>smaller than the wavelength</Label>
        <line x1={120} y1={540} x2={450} y2={540} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        <circle cx={480} cy={540} r={9} fill={C.n2} />
        {angs.map((a, i) => (
          <React.Fragment key={i}>
            <Arrow x={480} y={540} ang={a} len={230} c={C.blue} k={k} />
          </React.Fragment>
        ))}
        {[0.4, -0.5].map((a, i) => (
          <Arrow key={"r" + i} x={480} y={540} ang={a} len={45} c={C.red} k={k} />
        ))}
        <g opacity={pr(t, 34, 36)}>
          <Label x={480} y={810} size={30} color={C.blue}>blue scattered ≈ 6× more</Label>
          <rect x={430} y={840} width={100} height={46} rx={10} fill="#86bff5" />
        </g>
      </g>
      {/* right: droplet */}
      <g>
        <Label x={1440} y={250} size={36} color={C.text}>Cloud droplet</Label>
        <Label x={1440} y={290} size={24} color={C.muted} mono weight={400}>tens of thousands× bigger</Label>
        <Cloud x={1700} y={380} />
        <line x1={1080} y1={540} x2={1340} y2={540} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        <circle cx={1440} cy={540} r={96} fill="rgba(255,255,255,0.35)" stroke="#fff" strokeWidth={3} />
        {angs.map((a, i) => (
          <React.Fragment key={i}>
            <Arrow x={1440} y={540} ang={a} len={215 - 0} c={["#ff5a3c", "#5dd39e", "#4da3ff"][i % 3]} k={k2} />
          </React.Fragment>
        ))}
        <g opacity={pr(t, 36, 38)}>
          <Label x={1440} y={810} size={30} color="#fff">all colors scattered about equally</Label>
          <rect x={1390} y={840} width={100} height={46} rx={10} fill="#ffffff" />
        </g>
      </g>
      {/* RGB = white */}
      <g opacity={rgbK * win(t, 36.2, 44.5, 0.6)} transform={`translate(960 560) scale(${rgbK})`}>
        <circle cx={0} cy={-44} r={70} fill="#ff0000" style={{ mixBlendMode: "screen" }} />
        <circle cx={-44} cy={34} r={70} fill="#00ff00" style={{ mixBlendMode: "screen" }} />
        <circle cx={44} cy={34} r={70} fill="#0000ff" style={{ mixBlendMode: "screen" }} />
        <Label x={0} y={170} size={28} color={C.text} mono>R + G + B = white</Label>
      </g>
      <g opacity={pr(t, 39.4, 41)}>
        <Label x={960} y={250} size={30} color={C.yellow} mono>MIE SCATTERING</Label>
        <Label x={960} y={290} size={24} color={C.muted} mono weight={400}>after Gustav Mie</Label>
      </g>
      <Label x={960} y={980} size={44} color={C.text} opacity={pr(t, 43.6, 45.5)}>
        Blue or white? It depends on the size of what the light hits.
      </Label>
    </g>
  );
};

export const S06: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <SceneFrame id="06" title={meta.title} duration={meta.duration} paras={meta.paras}>
    <AbsoluteFill>
      <svg width={W} height={H}>
        <SkyDome />
        <MieCompare />
      </svg>
    </AbsoluteFill>
  </SceneFrame>
);
