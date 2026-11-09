import React from "react";
import { AbsoluteFill, interpolateColors } from "remotion";
import { Glow, Label, SceneFrame, TimeScale, lerp, pr, useT, win, eBack, eInOut, eOut } from "../lib";
import { C, FONT, H, MONO, W, wl } from "../theme";
import type { SceneMeta } from "../narration";

const CW = 400, CH = 430, CY0 = 250;
const cardX = (i: number) => 100 + i * (CW + 40);

const Card: React.FC<{ i: number; at: number; title: string; sub: string; children: React.ReactNode }> = ({ i, at, title, sub, children }) => {
  const t = useT();
  const k = pr(t, at, at + 1.1, eBack);
  const out = 1 - pr(t, 33, 34);
  return (
    <g opacity={k * out} transform={`translate(${cardX(i)} ${CY0 + (1 - k) * 40})`}>
      <rect width={CW} height={CH} rx={22} fill="rgba(8,32,61,0.8)" stroke={C.line} strokeWidth={2} />
      <Label x={CW / 2} y={64} size={34} color={C.text} weight={800}>{title}</Label>
      <Label x={CW / 2} y={100} size={22} color={C.muted} mono weight={400}>{sub}</Label>
      <g transform="translate(0 120)">{children}</g>
    </g>
  );
};

const Recap: React.FC = () => {
  const t = useT();
  const k1 = pr(t, 2.6, 5.5, eInOut);
  const k2 = pr(t, 6, 9, eInOut);
  const k3 = pr(t, 15.5, 19, eInOut);
  const k4 = pr(t, 25.8, 28);
  const stripes = [380, 440, 480, 530, 580, 640, 700];
  return (
    <g>
      <Card i={0} at={2.2} title="Sunlight" sub="a mix of every color">
        <line x1={20} y1={150} x2={150} y2={150} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
        <polygon points="150,95 150,205 220,150" fill="rgba(160,220,255,0.3)" stroke={C.line} strokeWidth={3} />
        {stripes.map((w, i) => (
          <line key={w} x1={220} y1={150} x2={lerp(220, 380, k1)} y2={lerp(150, 70 + i * 36, k1)} stroke={wl(w)} strokeWidth={10} strokeLinecap="round" />
        ))}
      </Card>
      <Card i={1} at={4.9} title="Blue ≈ 6×" sub="scattered more than red">
        <line x1={40} y1={280} x2={360} y2={280} stroke={C.line} strokeWidth={2} />
        <rect x={80} y={280 - 5.9 * 40 * k2} width={90} height={5.9 * 40 * k2} rx={6} fill={C.blue} />
        <rect x={230} y={280 - 40 * k2} width={90} height={40 * k2} rx={6} fill={C.red} />
        <Label x={125} y={310} size={22} color={C.blue} mono>blue</Label>
        <Label x={275} y={310} size={22} color={C.red} mono>red</Label>
      </Card>
      <Card i={2} at={15.1} title="Sunset ≈ 40×" sub="more air on the way">
        <path d="M40 270 Q200 160 360 270" fill="none" stroke={C.line} strokeWidth={3} />
        <line x1={200} y1={80} x2={200} y2={lerp(80, 206, k3)} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        <line x1={40} y1={lerp(250, 232, k3)} x2={lerp(40, 190, k3)} y2={lerp(250, 232, k3)} stroke={interpolateColors(k3, [0, 1], ["#ffffff", "#ff5a3c"])} strokeWidth={8} strokeLinecap="round" />
        <Label x={250} y={130} size={26} color={C.text} mono anchor="start" opacity={k3}>1×</Label>
        <Label x={120} y={300} size={26} color={C.red} mono opacity={k3}>≈ 40×</Label>
      </Card>
      <Card i={3} at={25.4} title="Mars" sub="blue sunset, red sky">
        <rect x={40} y={20} width={320} height={260} rx={14} fill="#b9814e" />
        <circle cx={200} cy={190} r={130 * k4} fill="rgba(106,166,255,0.45)" />
        <circle cx={200} cy={190} r={22} fill="#e8f3ff" />
        <path d="M40 240 Q200 210 360 240 V280 H40Z" fill="#4a2514" />
      </Card>
      <g opacity={win(t, 23, 33.6, 0.6)}>
        <rect x={560} y={745} width={80} height={70} rx={14} fill="#86bff5" />
        <Label x={760} y={795} size={40} color={C.text} mono>+</Label>
        <rect x={880} y={745} width={80} height={70} rx={14} fill="#ff6a2a" />
        <Label x={1130} y={796} size={44} color={C.text} weight={800}>= one idea</Label>
      </g>
      <Label x={960} y={170} size={54} color={C.text} weight={800} opacity={win(t, 0.8, 33.6, 0.6)}>Recap</Label>
    </g>
  );
};

const Closing: React.FC = () => {
  const t = useT();
  const bgK = pr(t, 33, 36, eInOut);
  const sunP = pr(t, 33.3, 42.8, eInOut);
  const top = interpolateColors(sunP, [0, 0.6, 1], ["#2a78e0", "#5a3a9a", "#150f3d"]);
  const bot = interpolateColors(sunP, [0, 0.5, 1], ["#d3e9ff", "#ff8a3a", "#7a2a5a"]);
  const sy = lerp(520, 800, sunP);
  const end = pr(t, 43, 45);
  return (
    <g>
      <defs>
        <linearGradient id="clg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bot} />
        </linearGradient>
        <radialGradient id="clsun">
          <stop offset="0" stopColor="#fff2d0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ff7a3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g opacity={bgK * (1 - end * 0.35)}>
        <rect width={W} height={H} fill="url(#clg)" />
        <circle cx={960} cy={sy} r={340} fill="url(#clsun)" />
        <circle cx={960} cy={sy} r={58} fill="#fff2d0" />
        <path d="M0 900 Q300 850 620 890 T1240 880 T1920 900 V1080 H0Z" fill="#06101c" />
        <rect width={W} height={H} fill="rgba(4,10,22,0.35)" />
      </g>
      <Label x={960} y={470} size={64} color="#fff" weight={800} opacity={win(t, 33.5, 39.2, 0.6)}>You aren't looking at the color of the Sun.</Label>
      <g opacity={win(t, 39.2, 45.5, 0.6)}>
        <Label x={960} y={420} size={44} color="#ffe2c2" weight={400}>You are looking at</Label>
        <Label x={960} y={510} size={78} color="#fff" weight={800}>what the atmosphere left behind.</Label>
      </g>
      <g opacity={end} transform={`translate(0 ${(1 - end) * 20})`}>
        <rect x={0} y={0} width={W} height={H} fill="rgba(4,10,22,0.55)" />
        <Label x={960} y={300} size={80} color="#fff" weight={800}>Thanks for watching</Label>
        <Label x={960} y={365} size={32} color={C.line} mono>UNDER THE HOOD LAB</Label>
        <rect x={660} y={420} width={600} height={338} rx={22} fill="rgba(8,32,61,0.85)" stroke={C.line} strokeWidth={3} />
        <Label x={960} y={560} size={140} color={C.line}>?</Label>
        <Label x={960} y={620} size={30} color={C.muted} mono>NEXT VIDEO</Label>
        <Label x={960} y={850} size={40} color={C.text} weight={400}>What should we open up next?</Label>
        <Label x={960} y={900} size={32} color={C.muted} weight={400}>Tell me in the comments.</Label>
      </g>
    </g>
  );
};

export const S10: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeScale sourceDuration={50} targetDuration={meta.duration}>
    <SceneFrame id="10" title={meta.title} duration={50} paras={meta.paras}>
      <AbsoluteFill>
        <svg width={W} height={H}>
          <Closing />
          <Recap />
        </svg>
      </AbsoluteFill>
    </SceneFrame>
  </TimeScale>
);
