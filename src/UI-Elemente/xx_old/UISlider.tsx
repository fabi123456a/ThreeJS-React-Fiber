import * as React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export default function UISlider(props: {
  label: string;
  onchange: (value: number) => void;
}) {
  const [value, setValue] = useState<number>(110);

  return (
    <Stack>
      <Typography>{props.label}</Typography>
      <Slider
        min={10}
        max={179}
        defaultValue={50}
        valueLabelDisplay="auto"
        onChange={(event, value) => {
          props.onchange(value as number);
        }}
      />
    </Stack>
  );
}

{
  /*<Slider
        min={10}
        max={179}
        defaultValue={50}
        valueLabelDisplay="auto"
        onChange={(event, value) => {
          setFov(value as number);
        }}
    />*/
}
