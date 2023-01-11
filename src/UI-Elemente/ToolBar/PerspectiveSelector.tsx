import { FormControl, FormLabel, NativeSelect } from "@mui/material";
import React from "react";

export default function PerspectiveSelector(props: {
  setOrtho: Function;
  setLockCamera: Function;
  setPerspective: Function;
}) {
  return (
    <FormControl>
      <FormLabel>Perspektive</FormLabel>
      <NativeSelect
        onChange={(e) => {
          const v = e.target.value;
          // wenn Kameraperpektive geändert wurde
          if (v != "0") {
            props.setOrtho(true);
            props.setLockCamera(true);
          } else {
            props.setOrtho(false);
            props.setLockCamera(false);
            props.setPerspective(v);
          }
          switch (v) {
            case "1":
              props.setPerspective(v);
              break;
            case "2":
              props.setPerspective(v);
              break;
            case "3":
              props.setPerspective(v);
              break;
            case "4":
              props.setPerspective(v);
              break;
          }
        }}
      >
        <option value={"0"} label="Normal" />
        <option value={"1"} label="TopDown" />
        <option value={"2"} label="Frontal" />
        <option value={"3"} label="LeftMid" />
        <option value={"4"} label="RightMid" />
      </NativeSelect>
    </FormControl>
  );
}
