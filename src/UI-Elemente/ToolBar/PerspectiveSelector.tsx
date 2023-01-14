import { FormControl, FormLabel, NativeSelect } from "@mui/material";
import React from "react";
import { TypeWallVisibility } from "../../Main";

export default function PerspectiveSelector(props: {
  setOrtho: Function;
  setLockCamera: Function;
  setPerspective: Function;
  setWallVisibility: (flag: TypeWallVisibility) => void;
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
            props.setWallVisibility({ leftWall: true, rightWall: true });
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
              props.setWallVisibility({ leftWall: false, rightWall: true });
              break;
            case "4":
              props.setPerspective(v);
              props.setWallVisibility({ leftWall: true, rightWall: false });
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
