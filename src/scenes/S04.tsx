import React from "react";
import { AbsoluteFill } from "remotion";
import { Eye, Glow, Label, SceneFrame, TimeScale, lerp, pr, rnd, useT, wavePath, win, eInOut, eOut } from "../lib";
import { C, FONT, H, MONO, W, wl } from "../theme";
import type { SceneMeta } from "../narration";

/* ---------- A: the electron shakes ---------- */
const Shake: React.FC = () => {
  const t = useT();
  const o = win(t, 0.2, 13, 0.8);
  const ph = t * 5;
  const ey = 540 + 34 * Math.sin(ph - 0.6);
  const cxm = 960, cym = 540;
  const rings = [0, 1, 2, 3, 4];
  const scat = pr(t, 5, 6.5);
  return (
    <g opacity={o}>
      <defs><Glow id="s4a" std={5} /></defs>
      <path d={wavePath(60, 900, 540, 52, 210, ph)} fill="none" stroke={C.blue} strokeWidth={7} filter="url(#s4a)" />
      <Label x={480} y={330} size={28} color={C.blue} mono>INCOMING LIGHT WAVE</Label>
      {rings.map((i) => {
        const r = ((t * 150 + i * 90) % 450) + 20;
        return <circle key={i} cx={cxm} cy={cym} r={r} fill="none" stroke={C.blue} strokeWidth={4} opacity={scat * (1 - r / 470) * 0.8} />;
      })}
      <circle cx={cxm} cy={cym} r={34} fill="#1c3b66" stroke={C.line} strokeWidth={3} />
      <Label x={cxm} y={cym + 12} size={36} color={C.text}>+</Label>
      <circle cx={cxm + 70} cy={ey} r={13} fill={C.yellow} filter="url(#s4a)" />
      <line x1={cxm + 70} y1={cym - 90} x2={cxm + 70} y2={cym + 90} stroke={C.yellow} strokeWidth={1.5} strokeDasharray="4 6" opacity={0.6} />
      <Label x={cxm + 110} y={cym - 100} size={26} color={C.yellow} anchor="start" mono opacity={pr(t, 1.5, 3)}>ELECTRON · shakes</Label>
      <Label x={cxm} y={cym + 130} size={26} color={C.muted} mono opacity={pr(t, 1.5, 3)}>air molecule</Label>
      {/* outgoing */}
      <g opacity={scat}>
        <path d={wavePath(1180, 1800, 540, 24, 210, ph - 1.5)} fill="none" stroke={C.blue} strokeWidth={4} opacity={0.8} />
        <path d={wavePath(1180, 1800, 540, 0, 210, 0)} stroke="none" />
      </g>
      <Label x={960} y={880} size={78} color={C.text} weight={800} opacity={pr(t, 10.3, 11.5)}>SCATTERING</Label>
      <Label x={960} y={935} size={28} color={C.muted} weight={400} opacity={pr(t, 10.3, 11.5)}>light re-emitted in a new direction</Label>
    </g>
  );
};

/* ---------- B: Rayleigh's rule ---------- */
const Rule: React.FC = () => {
  const t = useT();
  const o = win(t, 12.8, 46.8, 0.9);
  const x0 = 220, x1 = 1060, yb = 840, yt = 320;
  const X = (l: number) => x0 + ((l - 380) / 370) * (x1 - x0);
  const Y = (l: number) => yb - Math.pow(380 / l, 4) * (yb - yt);
  const draw = pr(t, 20.6, 27, eInOut);
  let d = "";
  for (let l = 380; l <= 380 + 370 * draw; l += 5) d += (l === 380 ? "M" : "L") + X(l) + " " + Y(l);
  const spec = [];
  for (let l = 380; l < 750; l += 5) spec.push(<rect key={l} x={X(l)} y={yb + 14} width={X(l + 5) - X(l) + 1} height={22} fill={wl(l)} />);
  const mk = pr(t, 33, 35);
  const bars = pr(t, 40.5, 43.5, eInOut);
  return (
    <g opacity={o}>
      <Label x={x0} y={250} size={34} color={C.muted} anchor="start" mono opacity={pr(t, 14, 15.5)}>HOW STRONGLY AIR SCATTERS EACH COLOR</Label>
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.line} strokeWidth={2} />
      <line x1={x0} y1={yb} x2={x0} y2={yt - 20} stroke={C.line} strokeWidth={2} />
      {spec}
      {[400, 500, 600, 700].map((l) => (
        <Label key={l} x={X(l)} y={yb + 76} size={24} color={C.muted} mono weight={400}>{l}</Label>
      ))}
      <Label x={(x0 + x1) / 2} y={yb + 120} size={24} color={C.muted} mono weight={400}>wavelength, nm</Label>
      <path d={d} fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
      {/* markers */}
      <g opacity={mk}>
        {[{ l: 450, c: C.blue, n: "BLUE 450" }, { l: 700, c: C.red, n: "RED 700" }].map((m) => (
          <g key={m.l}>
            <line x1={X(m.l)} y1={Y(m.l)} x2={X(m.l)} y2={yb} stroke={m.c} strokeWidth={3} strokeDasharray="8 8" />
            <circle cx={X(m.l)} cy={Y(m.l)} r={13} fill={m.c} />
            <Label x={X(m.l) + (m.l === 450 ? 26 : 0)} y={Y(m.l) - 26} size={26} color={m.c} anchor={m.l === 450 ? "start" : "middle"} mono>{m.n}</Label>
          </g>
        ))}
      </g>
      {/* formula panel */}
      <g transform="translate(1230 0)">
        <Label x={0} y={330} size={28} color={C.muted} anchor="start" mono opacity={pr(t, 20.6, 22)}>LORD RAYLEIGH · 1871</Label>
        <Label x={0} y={430} size={96} color={C.text} anchor="start" weight={800} opacity={pr(t, 25, 26.5)}>
          I ∝ 1/λ<tspan fontSize={58} dy={-34}>4</tspan>
        </Label>
        <Label x={0} y={490} size={28} color={C.muted} anchor="start" weight={400} opacity={pr(t, 25.5, 27)}>fourth power of the wavelength</Label>
        <Label x={0} y={570} size={40} color={C.text} anchor="start" mono opacity={pr(t, 33.1, 34.5)}>700 ÷ 450 ≈ 1.5</Label>
        <Label x={0} y={630} size={40} color={C.yellow} anchor="start" mono opacity={pr(t, 37.3, 38.8)}>
          1.5<tspan fontSize={26} dy={-16}>4</tspan><tspan dy={16}> ≈ 6</tspan>
        </Label>
        {/* bars */}
        <g opacity={pr(t, 40, 41.5)}>
          <line x1={0} y1={940} x2={500} y2={940} stroke={C.line} strokeWidth={2} />
          <rect x={60} y={940 - 5.9 * 48 * bars} width={140} height={5.9 * 48 * bars} fill={C.blue} rx={8} />
          <rect x={280} y={940 - 48 * bars} width={140} height={48 * bars} fill={C.red} rx={8} />
          <Label x={130} y={980} size={26} color={C.blue} mono>BLUE</Label>
          <Label x={350} y={980} size={26} color={C.red} mono>RED</Label>
          <Label x={130} y={940 - 5.9 * 48 * bars - 14} size={44} color={C.blue} opacity={bars}>≈ 6×</Label>
          <Label x={350} y={940 - 48 * bars - 14} size={44} color={C.red} opacity={bars}>1×</Label>
        </g>
      </g>
    </g>
  );
};

/* ---------- C: photon simulation ---------- */
type Seg = { d: number; a: number };
const photonPos = (s: number, x0: number, y0: number, segs: Seg[]): [number, number] => {
  let x = x0, y = y0, rem = s;
  for (const sg of segs) {
    if (rem <= sg.d) return [x + Math.cos(sg.a) * rem, y + Math.sin(sg.a) * rem];
    x += Math.cos(sg.a) * sg.d;
    y += Math.sin(sg.a) * sg.d;
    rem -= sg.d;
  }
  return [x, y];
};

const PhotonSim: React.FC = () => {
  const t = useT();
  const o = win(t, 46.8, 63.4, 0.9);
  const types = [
    { c: "#ff4a3a", sc: false },
    { c: "#ffc23a", sc: false },
    { c: "#4da3ff", sc: true },
    { c: "#79b6ff", sc: true },
  ];
  const lanes = 7;
  const speed = 330;
  const t0 = 47.6;
  const items: React.ReactNode[] = [];
  for (let k = 0; k < 28; k++) {
    for (let ln = 0; ln < lanes; ln++) {
      const ts = t0 + k * 0.6 + ln * 0.09;
      const s = (t - ts) * speed;
      if (s < 0 || s > 1900) continue;
      const y0 = 330 + ln * 62;
      types.forEach((ty, ti) => {
        const id = `${k}-${ln}-${ti}`;
        const segs: Seg[] = ty.sc
          ? [
              { d: 100 + rnd("d1" + id) * 650, a: 0 },
              { d: 70 + rnd("d2" + id) * 300, a: (rnd("a1" + id) - 0.5) * Math.PI * 2 },
              { d: Infinity, a: (rnd("a2" + id) - 0.5) * Math.PI * 2 },
            ]
          : [{ d: Infinity, a: 0 }];
        const yy = y0 + (ti - 1.5) * 9;
        const [x, y] = photonPos(s, 140, yy, segs);
        const [tx, ty2] = photonPos(Math.max(0, s - 38), 140, yy, segs);
        items.push(
          <g key={id}>
            <line x1={tx} y1={ty2} x2={x} y2={y} stroke={ty.c} strokeWidth={3} opacity={0.5} />
            <circle cx={x} cy={y} r={5} fill={ty.c} />
          </g>
        );
        if (ty.sc) {
          const sd = s - segs[0].d;
          if (sd > 0 && sd < 90) {
            const px = 140 + segs[0].d, py = yy;
            items.push(<circle key={"r" + id} cx={px} cy={py} r={sd / 2.5} fill="none" stroke={C.blue} strokeWidth={2} opacity={1 - sd / 90} />);
          }
        }
      });
    }
  }
  return (
    <g opacity={o}>
      <defs><clipPath id="simClip"><rect x={100} y={230} width={1720} height={620} rx={14} /></clipPath></defs>
      <rect x={100} y={230} width={1720} height={620} rx={14} fill="rgba(5,20,40,0.55)" stroke={C.lineDim} strokeWidth={2} />
      <g clipPath="url(#simClip)">
        {Array.from({ length: 70 }).map((_, i) => (
          <circle key={i} cx={260 + rnd("mx" + i) * 1500} cy={250 + rnd("my" + i) * 580} r={7} fill="rgba(140,200,255,0.16)" />
        ))}
        {items}
      </g>
      <rect x={92} y={300} width={18} height={420} fill="#fff" rx={6} opacity={0.9} />
      <Label x={100} y={270} size={26} color={C.yellow} anchor="start" mono>WHITE SUNLIGHT →</Label>
      <Label x={1800} y={900} size={28} color={C.red} anchor="end" mono opacity={pr(t, 50.8, 52.3)}>red · orange · yellow: straight through</Label>
      <Label x={1800} y={950} size={28} color={C.blue} anchor="end" mono opacity={pr(t, 57.3, 58.8)}>blue: bounced in every direction, again and again</Label>
    </g>
  );
};

/* ---------- D: the eye looks up ---------- */
const EyeView: React.FC = () => {
  const t = useT();
  const o = win(t, 62.8, 84.4, 0.9);
  const cx = 960, cy = 930, R = 560;
  const arrows = Array.from({ length: 26 });
  const glow = pr(t, 75.8, 78);
  return (
    <g opacity={o}>
      <defs>
        <radialGradient id="dome" cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor="#7fbfff" stopOpacity={0.15 + 0.35 * glow} />
          <stop offset="1" stopColor="#2b7fff" stopOpacity={0.2 + 0.5 * glow} />
        </radialGradient>
        <Glow id="s4d" std={5} />
      </defs>
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`} fill="url(#dome)" stroke={C.blue} strokeWidth={3} strokeDasharray="10 8" />
      <circle cx={230} cy={290} r={44} fill="#fff6d8" filter="url(#s4d)" />
      <line x1={230} y1={290} x2={1750} y2={640} stroke="rgba(255,240,200,0.5)" strokeWidth={4} strokeDasharray="14 10" />
      <Label x={230} y={380} size={24} color={C.yellow} mono>SUN</Label>
      <Label x={1560} y={600} size={24} color={C.muted} mono weight={400} anchor="middle">direct beam misses you</Label>
      {arrows.map((_, i) => {
        const a = -Math.PI * (0.06 + (0.88 * i) / (arrows.length - 1));
        const rr = R * (0.7 + 0.28 * rnd("rr" + i));
        const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
        const ex = cx + Math.cos(a) * 110, ey = cy + Math.sin(a) * 110;
        const u = (t * 0.45 + rnd("u" + i)) % 1;
        const vis = pr(t, 63.5 + (i % 6) * 0.25, 65);
        return (
          <g key={i} opacity={vis}>
            <line x1={px} y1={py} x2={ex} y2={ey} stroke={C.blue} strokeWidth={2} opacity={0.35} />
            <circle cx={lerp(px, ex, u)} cy={lerp(py, ey, u)} r={7} fill={C.blue} filter="url(#s4d)" />
          </g>
        );
      })}
      <Eye x={cx} y={cy - 30} s={1.2} look={0} />
      <Label x={cx} y={cy + 60} size={24} color={C.muted} mono>YOU</Label>
      <g transform="translate(960 190)">
        <Label x={0} y={0} size={44} color={C.text} opacity={win(t, 63, 68.1, 0.5)}>Look at a patch of sky away from the Sun…</Label>
        <Label x={0} y={0} size={44} color={C.text} opacity={win(t, 68.1, 73.1, 0.5)}>Everything you see is scattered light.</Label>
        <Label x={0} y={0} size={44} color={C.blue} opacity={win(t, 73.1, 77.4, 0.5)}>It reaches your eyes from every direction.</Label>
        <Label x={0} y={0} size={64} color={C.blue} weight={800} opacity={win(t, 77.4, 84.4, 0.5)}>That is why the sky is blue.</Label>
        <Label x={0} y={60} size={34} color={C.muted} weight={400} opacity={win(t, 79.4, 84.4, 0.5)}>Not a color of the air, like paint. Sunlight, thrown around the sky.</Label>
      </g>
    </g>
  );
};

/* ---------- E: the ocean myth ---------- */
const Myth: React.FC = () => {
  const t = useT();
  const o = pr(t, 84.3, 85.5);
  const strike = pr(t, 88.1, 89.2, eInOut);
  const ph = t * 2.5;
  return (
    <g opacity={o}>
      <rect x={560} y={330} width={800} height={260} rx={22} fill="#0b3a7a" />
      <path d={wavePath(560, 1360, 420, 16, 160, ph)} stroke="#4da3ff" strokeWidth={4} fill="none" />
      <path d={wavePath(560, 1360, 480, 16, 200, ph + 1)} stroke="#4da3ff" strokeWidth={4} fill="none" opacity={0.7} />
      <path d={wavePath(560, 1360, 540, 16, 180, ph + 2)} stroke="#4da3ff" strokeWidth={4} fill="none" opacity={0.5} />
      <Label x={960} y={260} size={54} color={C.text} weight={800}>"The sky reflects the ocean."</Label>
      <Label x={960} y={650} size={30} color={C.red} mono opacity={pr(t, 88.1, 89.5)}>COMMON MYTH</Label>
      <line x1={560} y1={330} x2={lerp(560, 1360, strike)} y2={lerp(330, 590, strike)} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
      <line x1={1360} y1={330} x2={lerp(1360, 560, strike)} y2={lerp(330, 590, strike)} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
      <g opacity={pr(t, 90.1, 91.6)}>
        <Label x={960} y={780} size={46} color={C.text}>The ocean is blue for its own reason:</Label>
        <Label x={960} y={850} size={46} color={C.red} weight={800}>water absorbs red light.</Label>
      </g>
    </g>
  );
};

export const S04: React.FC<{ meta: SceneMeta }> = ({ meta }) => (
  <TimeScale sourceDuration={95} targetDuration={meta.duration}>
    <SceneFrame id="04" title={meta.title} duration={95} paras={meta.paras}>
      <AbsoluteFill>
        <svg width={W} height={H}>
          <Shake />
          <Rule />
          <PhotonSim />
          <EyeView />
          <Myth />
        </svg>
      </AbsoluteFill>
    </SceneFrame>
  </TimeScale>
);
