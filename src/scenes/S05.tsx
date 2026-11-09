import React from "react";
import { AbsoluteFill } from "remotion";
import { Eye, Label, SceneFrame, TimeScale, lerp, mapRange, pr, useT, win, eInOut, eOut, eBack } from "../lib";
import { C, H, W, wl } from "../theme";
import type { SceneMeta } from "../narration";

const X0 = 230, X1 = 1480, YB = 800, YT = 300;
const X = (l: number) => X0 + ((l - 380) / 370) * (X1 - X0);

const planck = (l: number) => 1 / (Math.pow(l, 5) * (Math.exp(1.4388e7 / (l * 5778)) - 1));
const PMAX = planck(500);
const solar = (l: number) => planck(l) / PMAX;
const uvLoss = (l: number) => (l < 440 ? 0.62 + (0.38 * (l - 380)) / 60 : 1);
const eyeResp = (l: number) => (l < 450 ? 0.22 + (0.78 * (l - 380)) / 70 : 1);
const gauss = (l: number, m: number, s: number) => Math.exp(-0.5 * Math.pow((l - m) / s, 2));

const Axes: React.FC<{ label: string }> = ({ label }) => (
  <g>
    <line x1={X0} y1={YB} x2={X1} y2={YB} stroke={C.line} strokeWidth={2} />
    <line x1={X0} y1={YB} x2={X0} y2={YT - 30} stroke={C.line} strokeWidth={2} />
    {[400, 450, 500, 600, 700].map((l) => (
      <Label key={l} x={X(l)} y={YB + 44} size={22} color={C.muted} mono weight={400}>{l}</Label>
    ))}
    <Label x={(X0 + X1) / 2} y={YB + 90} size={22} color={C.muted} mono weight={400}>wavelength, nm</Label>
    <Label x={X0} y={YT - 56} size={26} color={C.muted} anchor="start" mono>{label}</Label>
  </g>
);

const Question: React.FC = () => {
  const t = useT();
  const o = win(t, 0.2, 13.6, 0.8);
  const bars = [];
  for (let i = 0; i < 13; i++) {
    const l = 400 + i * 25;
    const h = Math.pow(400 / l, 4) * 360 * pr(t, 2 + i * 0.1, 3.5);
    bars.push(
      <rect key={l} x={260 + i * 78} y={780 - h} width={60} height={h} rx={6} fill={wl(l)} />
    );
  }
  return (
    <g opacity={o}>
      <Label x={260} y={290} size={26} color={C.muted} anchor="start" mono>RAYLEIGH SCATTERING STRENGTH, 1 / λ⁴</Label>
      <line x1={240} y1={782} x2={1300} y2={782} stroke={C.line} strokeWidth={2} />
      {bars}
      <g opacity={pr(t, 4.5, 6)}>
        <Label x={360} y={420} size={34} color={wl(405)} anchor="start" weight={800}>← violet: scattered most!</Label>
      </g>
      <g opacity={pr(t, 8.6, 10)} transform={`translate(1560 540) scale(${pr(t, 8.6, 10, eBack)})`}>
        <rect x={-180} y={-180} width={360} height={360} rx={30} fill="#7a4ad8" />
        <Label x={0} y={40} size={200} color="#fff">?</Label>
        <Label x={0} y={250} size={34} color={C.text}>Why isn't the sky violet?</Label>
      </g>
      <g opacity={pr(t, 11, 12.5)}>
        <circle cx={960} cy={540} r={0} />
      </g>
    </g>
  );
};

const Reasons: React.FC = () => {
  const t = useT();
  const o = win(t, 10.8, 14.3, 0.5) ;
  return (
    <g opacity={o}>
      <g transform="translate(560 540)">
        <circle r={70} fill="none" stroke={C.line} strokeWidth={4} />
        <Label x={0} y={26} size={80} color={C.line}>1</Label>
        <Label x={0} y={140} size={40} color={C.text}>The Sun</Label>
      </g>
      <Label x={960} y={555} size={90} color={C.muted}>+</Label>
      <g transform="translate(1360 540)">
        <circle r={70} fill="none" stroke={C.line} strokeWidth={4} />
        <Label x={0} y={26} size={80} color={C.line}>2</Label>
        <Label x={0} y={140} size={40} color={C.text}>Your eyes</Label>
      </g>
    </g>
  );
};

const SunCurve: React.FC = () => {
  const t = useT();
  const o = win(t, 13.4, 25.6, 0.8);
  const k = pr(t, 14, 18, eInOut);
  let path = "";
  const cols: React.ReactNode[] = [];
  for (let l = 380; l <= 750; l += 5) {
    const v = solar(l) * uvLoss(l);
    const y = YB - v * 420;
    const yRaw = YB - solar(l) * 420;
    if (l <= 380 + 370 * k) {
      path += (l === 380 ? "M" : "L") + X(l) + " " + y;
      cols.push(<rect key={l} x={X(l)} y={y} width={X(l + 5) - X(l) + 1} height={YB - y} fill={wl(l, 0.85)} />);
      if (l < 440) cols.push(<rect key={"u" + l} x={X(l)} y={yRaw} width={X(l + 5) - X(l) + 1} height={y - yRaw} fill="rgba(255,255,255,0.10)" />);
    }
  }
  return (
    <g opacity={o}>
      <Axes label="SUNLIGHT REACHING THE SURFACE" />
      {cols}
      <path d={path} fill="none" stroke="#fff" strokeWidth={5} />
      <g opacity={pr(t, 18, 20)}>
        <line x1={X(405)} y1={YB - solar(405) * uvLoss(405) * 420} x2={X(405)} y2={YB} stroke="#fff" strokeDasharray="6 6" />
        <line x1={X(470)} y1={YB - solar(470) * 420} x2={X(470)} y2={YB} stroke="#fff" strokeDasharray="6 6" />
        <Label x={X(405)} y={YB - solar(405) * 420 * 0.62 - 20} size={26} color={wl(405)} mono>violet</Label>
        <Label x={X(470)} y={YB - 420 - 24} size={26} color={wl(470)} mono>blue</Label>
      </g>
      <Label x={1560} y={420} size={40} color={C.text} anchor="start" opacity={pr(t, 17.3, 19)}>Less violet</Label>
      <Label x={1560} y={466} size={40} color={C.text} anchor="start" opacity={pr(t, 17.3, 19)}>than blue.</Label>
      <Label x={1560} y={560} size={30} color={C.muted} anchor="start" weight={400} opacity={pr(t, 21, 23)}>…and some of the</Label>
      <Label x={1560} y={600} size={30} color={C.muted} anchor="start" weight={400} opacity={pr(t, 21, 23)}>shortest waves are lost</Label>
      <Label x={1560} y={640} size={30} color={C.muted} anchor="start" weight={400} opacity={pr(t, 21, 23)}>high in the atmosphere.</Label>
    </g>
  );
};

const Cones: React.FC = () => {
  const t = useT();
  const o = win(t, 25, 35.5, 0.8);
  const k = pr(t, 28, 32, eInOut);
  const mk = (m: number, s: number, c: string, name: string, at: number) => {
    let d = "";
    for (let l = 380; l <= 380 + 370 * pr(t, at, at + 2.5, eInOut); l += 5) d += (l === 380 ? "M" : "L") + X(l) + " " + (YB - gauss(l, m, s) * 400);
    return <path d={d} fill="none" stroke={c} strokeWidth={6} />;
  };
  return (
    <g opacity={o}>
      <Axes label="YOUR EYE'S THREE COLOR SENSORS (CONES)" />
      {mk(445, 28, C.blue, "S", 28)}
      {mk(540, 42, C.green, "M", 29.5)}
      {mk(570, 48, C.red, "L", 31)}
      <rect x={X(380)} y={YT} width={X(415) - X(380)} height={YB - YT} fill="rgba(165,107,255,0.14)" stroke={C.violet} strokeDasharray="8 8" opacity={pr(t, 32.5, 34)} />
      <Label x={X(398)} y={YT - 12} size={24} color={C.violet} mono opacity={pr(t, 32.5, 34)}>weak response to violet</Label>
      <Label x={1560} y={440} size={34} color={C.blue} anchor="start" opacity={pr(t, 28, 29)}>● blue cells</Label>
      <Label x={1560} y={490} size={34} color={C.green} anchor="start" opacity={pr(t, 29.5, 30.5)}>● green cells</Label>
      <Label x={1560} y={540} size={34} color={C.red} anchor="start" opacity={pr(t, 31, 32)}>● red cells</Label>
    </g>
  );
};

const Blend: React.FC = () => {
  const t = useT();
  const o = win(t, 34.6, 46, 0.8);
  const bars: React.ReactNode[] = [];
  for (let l = 380; l <= 700; l += 10) {
    const v = solar(l) * uvLoss(l) * Math.pow(380 / l, 4) * eyeResp(l);
    const h = v * 520 * pr(t, 35 + ((l - 380) / 320) * 3, 36.5 + ((l - 380) / 320) * 3);
    bars.push(<rect key={l} x={X(l)} y={YB - h} width={X(l + 10) - X(l) - 2} height={h} fill={wl(l)} />);
  }
  const mix = pr(t, 40, 43);
  return (
    <g opacity={o}>
      <Axes label="SCATTERED LIGHT AS YOUR EYES SEE IT" />
      {bars}
      <g opacity={mix} transform={`translate(${lerp(1260, 1560, mix)} 540)`}>
        <rect x={-150} y={-120} width={300} height={240} rx={26} fill="#86bff5" />
        <Label x={0} y={170} size={32} color={C.text}>sky blue</Label>
        <Label x={0} y={212} size={24} color={C.muted} mono weight={400}>slightly pale, whitish</Label>
      </g>
      <Label x={1560} y={330} size={26} color={C.muted} mono opacity={mix}>everything blended in your brain</Label>
    </g>
  );
};

const Wrap: React.FC = () => {
  const t = useT();
  const o = win(t, 45.4, 56, 0.8);
  const swap = pr(t, 50.5, 52.5, eInOut);
  return (
    <g opacity={o}>
      <g transform="translate(560 470)">
        <path d={`M-160 0 ${Array.from({ length: 33 }).map((_, i) => `L ${-160 + i * 10} ${40 * Math.sin(i / 2.2 - t * 4)}`).join(" ")}`} fill="none" stroke={C.blue} strokeWidth={7} />
        <Label x={0} y={140} size={44} color={C.text}>Physics</Label>
        <Label x={0} y={185} size={26} color={C.muted} mono weight={400}>scattering of sunlight</Label>
      </g>
      <Label x={820} y={490} size={70} color={C.muted}>+</Label>
      <g transform="translate(1060 470)">
        <Eye x={0} y={0} s={1.7} />
        <Label x={0} y={140} size={44} color={C.text}>Biology</Label>
        <Label x={0} y={185} size={26} color={C.muted} mono weight={400}>how eyes respond</Label>
      </g>
      <Label x={1330} y={490} size={70} color={C.muted}>=</Label>
      <g transform="translate(1560 470)">
        <rect x={-130} y={-110} width={260} height={220} rx={26} fill="#86bff5" opacity={1 - swap} />
        <rect x={-130} y={-110} width={260} height={220} rx={26} fill="#8a5be8" opacity={swap} />
        <Label x={0} y={170} size={36} color={C.text}>{swap < 0.5 ? "sky blue" : "…a different sky?"}</Label>
      </g>
      <Label x={960} y={880} size={36} color={C.muted} weight={400} opacity={pr(t, 49.9, 51.5)}>
        A creature with different eyes might see a very different sky.
      </Label>
    </g>
  );
};

const S05Content: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <SceneFrame id="05" title={meta.title} duration={56} paras={meta.paras}>
    <AbsoluteFill>
      <svg width={W} height={H}>
        <Question />
        <Reasons />
        <SunCurve />
        <Cones />
        <Blend />
        <Wrap />
      </svg>
    </AbsoluteFill>
  </SceneFrame>
);

export const S05: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeScale sourceDuration={56} targetDuration={meta.duration}>
    <S05Content meta={meta} />
  </TimeScale>
);
