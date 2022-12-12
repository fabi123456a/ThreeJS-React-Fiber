import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroup(props: {
  onchange: (v: number) => void;
}) {
  return (
    <FormControl>
      <FormLabel>Ansicht</FormLabel>
      <RadioGroup
        onChange={(e, v) => {
          props.onchange(parseInt(v));
        }}
      >
        <FormControlLabel value={0} control={<Radio />} label="3D" />
        <FormControlLabel value={1} control={<Radio />} label="2D Top-Down" />
      </RadioGroup>
    </FormControl>
  );
}
