import React from "react";
import { Audio, Series, staticFile } from "remotion";
import { FPS } from "./theme";
import { SCENES, USE_AUDIO } from "./narration";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S05 } from "./scenes/S05";
import { S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";
import { S08 } from "./scenes/S08";
import { S09 } from "./scenes/S09";
import { S10 } from "./scenes/S10";

const COMPONENTS = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10];
const AUDIO_BY_SCENE: Record<string, string> = {
  "01-hook": "audio/intro.wav",
  "02-white-light": "audio/second.wav",
  "03-air": "audio/third.wav",
  "04-scattering": "audio/fourth.wav",
  "05-violet": "audio/five.wav",
  "06-horizon-clouds": "audio/six.wav",
  "07-sunset": "audio/seven.wav",
  "08-great-sunsets": "audio/eight.wav",
  "09-other-worlds": "audio/nine.wav",
  "10-outro": "audio/ten.wav",
};
const AUDIO_CUT_SECONDS: Record<string, number> = {
  "03-air": 41,
  "05-violet": 39,
  "07-sunset": 22.5,
  "08-great-sunsets": 42.5,
  "09-other-worlds": 40,
};

export const SkyBlue: React.FC = () => (
  <Series>
    {SCENES.map((meta, i) => {
      const Comp = COMPONENTS[i];
      const audioFile = AUDIO_BY_SCENE[meta.id];
      const audioStartFrom = Math.round((AUDIO_CUT_SECONDS[meta.id] ?? 0) * FPS);
      return (
        <Series.Sequence key={meta.id} durationInFrames={Math.round(meta.duration * FPS)}>
          <Comp meta={meta} />
          {USE_AUDIO && audioFile && <Audio src={staticFile(audioFile)} startFrom={audioStartFrom} />}
        </Series.Sequence>
      );
    })}
  </Series>
);
