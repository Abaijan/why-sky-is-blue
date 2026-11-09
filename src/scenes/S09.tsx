import React from "react";
import { AbsoluteFill } from "remotion";
import { Eye, Glow, Label, SceneFrame, TimeScale, lerp, pr, rnd, useT, win, eBack, eOut } from "../lib";
import { C, FONT, H, MONO, W } from "../theme";
import type { SceneMeta } from "../narration";

type PanelProps = {
  id: string;
  x: number;
  y: number;
  at: number;
  top: string;
  bot: string;
  sunX: number;
  sunY: number;
  sunR: number;
  sunC: string;
  glow?: string;
  glowR?: number;
  ground: string;
  stars?: boolean;
  tag: string;
};

const PW = 520, PH = 290;
const Panel: React.FC<PanelProps> = (p) => {
  const t = useT();
  const k = pr(t, p.at, p.at + 1.2, eOut);
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 24})`}>
      <defs>
        <clipPath id={"pc" + p.id}><rect x={p.x} y={p.y} width={PW} height={PH} rx={18} /></clipPath>
        <linearGradient id={"pg" + p.id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.top} />
          <stop offset="1" stopColor={p.bot} />
        </linearGradient>
        <radialGradient id={"pr" + p.id}>
          <stop offset="0" stopColor={p.glow ?? "#fff"} stopOpacity="0.95" />
          <stop offset="0.4" stopColor={p.glow ?? "#fff"} stopOpacity="0.45" />
          <stop offset="1" stopColor={p.glow ?? "#fff"} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath={"url(#pc" + p.id + ")"}>
        <rect x={p.x} y={p.y} width={PW} height={PH} fill={"url(#pg" + p.id + ")"} />
        {p.stars &&
          Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={p.x + rnd("sx" + p.id + i) * PW} cy={p.y + rnd("sy" + p.id + i) * (PH - 70)} r={1.2 + rnd("sr" + p.id + i)} fill="#fff" opacity={0.7} />
          ))}
        {p.glow && <circle cx={p.x + p.sunX} cy={p.y + p.sunY} r={p.glowR ?? 140} fill={"url(#pr" + p.id + ")"} />}
        <circle cx={p.x + p.sunX} cy={p.y + p.sunY} r={p.sunR} fill={p.sunC} />
        <path d={`M${p.x} ${p.y + PH - 52} Q${p.x + 140} ${p.y + PH - 76} ${p.x + 280} ${p.y + PH - 54} T${p.x + PW} ${p.y + PH - 56} V${p.y + PH} H${p.x}Z`} fill={p.ground} />
      </g>
      <rect x={p.x} y={p.y} width={PW} height={PH} rx={18} fill="none" stroke={C.line} strokeWidth={2} />
      <Label x={p.x + 18} y={p.y + 36} size={20} color="#fff" anchor="start" mono opacity={0.85}>{p.tag}</Label>
    </g>
  );
};

const ColTitle: React.FC<{ x: number; at: number; name: string; note: string }> = ({ x, at, name, note }) => {
  const t = useT();
  const k = pr(t, at, at + 1);
  return (
    <g opacity={k}>
      <Label x={x + PW / 2} y={200} size={44} color={C.text} weight={800}>{name}</Label>
      <Label x={x + PW / 2} y={238} size={22} color={C.muted} mono weight={400}>{note}</Label>
    </g>
  );
};

const Forward: React.FC = () => {
  const t = useT();
  const o = win(t, 30.2, 39.6, 0.7);
  const cx = 1500, cy = 560;
  const dots = [];
  for (let i = 0; i < 12; i++) {
    const u = (t * 0.4 + i / 12) % 1;
    const a = (rnd("fa" + i) - 0.5) * 0.7;
    dots.push(<circle key={i} cx={lerp(cx + 30, 1700, u)} cy={cy + Math.tan(a) * (u * 200)} r={6} fill={C.blue} />);
  }
  return (
    <g opacity={o}>
      <defs><Glow id="fwg" std={6} /></defs>
      <Label x={1510} y={240} size={32} color={C.text}>Martian dust, up close</Label>
      <line x1={1260} y1={cy} x2={cx - 40} y2={cy} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
      <path d={`M ${cx} ${cy} C ${cx + 120} ${cy - 150}, ${cx + 260} ${cy - 120}, ${cx + 260} ${cy} C ${cx + 260} ${cy + 120}, ${cx + 120} ${cy + 150}, ${cx} ${cy}Z`} fill="rgba(77,163,255,0.3)" stroke={C.blue} strokeWidth={3} filter="url(#fwg)" />
      <path d={`M ${cx} ${cy} C ${cx - 40} ${cy - 40}, ${cx - 60} ${cy - 20}, ${cx - 60} ${cy} C ${cx - 60} ${cy + 20}, ${cx - 40} ${cy + 40}, ${cx} ${cy}Z`} fill="rgba(77,163,255,0.25)" stroke={C.blue} strokeWidth={2} />
      {dots}
      <circle cx={cx} cy={cy} r={34} fill="#9a5a38" stroke="#d99a6a" strokeWidth={3} />
      <Eye x={1730} y={cy} s={0.7} look={-1} />
      <Label x={1510} y={780} size={30} color={C.blue}>blue light scattered mostly forward</Label>
      <Label x={1510} y={822} size={24} color={C.muted} mono weight={400}>→ toward the viewer</Label>
    </g>
  );
};

const S09Content: React.FC<{ meta: SceneMeta }> = ({ meta }) => {
  const t = useT();
  const X = [140, 700, 1260];
  const Y1 = 270, Y2 = 600;
  return (
    <SceneFrame id="09" title={meta.title} duration={50} paras={meta.paras}>
      <AbsoluteFill>
        <svg width={W} height={H}>
          <ColTitle x={X[0]} at={0.8} name="MOON" note="almost no atmosphere" />
          <ColTitle x={X[1]} at={14.2} name="MARS" note="thin, dusty air" />
          <ColTitle x={X[2]} at={39.4} name="EARTH" note="air molecules" />
          {/* Moon */}
          <Panel id="m1" x={X[0]} y={Y1} at={2} top="#000" bot="#000" sunX={330} sunY={70} sunR={34} sunC="#fff" glow="#fff" glowR={90} ground="#5b5d63" stars tag="DAYTIME" />
          <Panel id="m2" x={X[0]} y={Y2} at={4} top="#000" bot="#000" sunX={140} sunY={190} sunR={34} sunC="#fff" glow="#fff" glowR={90} ground="#5b5d63" stars tag="SUNSET" />
          <Label x={X[0] + PW / 2} y={950} size={26} color={C.muted} mono opacity={win(t, 9.3, 15, 0.5)}>nothing to scatter → black sky, blazing Sun</Label>
          {/* Mars */}
          <Panel id="a1" x={X[1]} y={Y1} at={19.9} top="#b9814e" bot="#e3b57e" sunX={320} sunY={90} sunR={22} sunC="#fff4d8" glow="#fff0c0" glowR={110} ground="#7a3f22" tag="DAYTIME" />
          <Panel id="a2" x={X[1]} y={Y2} at={25.7} top="#3a2a2e" bot="#a56a48" sunX={150} sunY={206} sunR={20} sunC="#e8f3ff" glow="#6aa6ff" glowR={190} ground="#4a2514" tag="SUNSET" />
          <Label x={X[1] + PW / 2} y={950} size={26} color="#e3b57e" mono opacity={win(t, 16.8, 29, 0.5)}>reddish dust → butterscotch sky</Label>
          <Label x={X[1] + PW / 2} y={950} size={26} color={C.blue} mono opacity={win(t, 29, 40, 0.5)}>blue glow around the setting Sun</Label>
          <Forward />
          {/* Earth */}
          <Panel id="e1" x={X[2]} y={Y1} at={39.6} top="#1565d8" bot="#bfe1ff" sunX={340} sunY={80} sunR={26} sunC="#fff" glow="#fff" glowR={100} ground="#0a1522" tag="DAYTIME" />
          <Panel id="e2" x={X[2]} y={Y2} at={40.2} top="#2a1f6a" bot="#ff6a2a" sunX={160} sunY={218} sunR={30} sunC="#ffcf8a" glow="#ff7a3a" glowR={170} ground="#0a0710" tag="SUNSET" />
          <Label x={X[2] + PW / 2} y={950} size={26} color={C.muted} mono opacity={win(t, 40.6, 46.2, 0.5)}>blue sky · red sunset</Label>
          <Label x={X[1] + PW / 2} y={950} size={26} color={C.blue} mono opacity={win(t, 42.8, 50, 0.5)}>red-brown sky · blue sunset</Label>
          <Label x={960} y={150} size={56} color={C.text} weight={800} opacity={win(t, 46.2, 50, 0.5)}>Same physics, different ingredients.</Label>
        </svg>
      </AbsoluteFill>
    </SceneFrame>
  );
};

export const S09: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeScale sourceDuration={50} targetDuration={meta.duration}>
    <S09Content meta={meta} />
  </TimeScale>
);
