import React from "react";
import { Composition } from "remotion";
import { SkyBlue } from "./Video";
import { FPS, H, W } from "./theme";
import { TOTAL_SECONDS } from "./narration";

export const Root: React.FC = () => (
  <Composition
    id="SkyBlue"
    component={SkyBlue}
    durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
    fps={FPS}
    width={W}
    height={H}
  />
);
