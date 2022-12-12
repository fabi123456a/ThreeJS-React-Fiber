import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PivotControls, Edges, Html } from "@react-three/drei";
import { BoxGeometryValue } from "../UI-Elemente/3DObjekt-Liste/ObjektListe";
import { Label } from "@mui/icons-material";
import { Button, Slider, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/system";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ExpandIcon from "@mui/icons-material/Expand";

function EditObjectHTML(props: {
  changeScaleMode: (flag: boolean) => void;
  changeTranslateMode: (flag: boolean) => void;
}) {
  const [scaleMode, setScaleMode] = useState<boolean>(false);
  const [translateMode, setTranslateMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <Html>
      {editMode ? (
        <Stack>
          <IconButton
            onClick={() => {
              setEditMode(false);
              setScaleMode(false);
              setTranslateMode(false);
              props.changeScaleMode(false);
              props.changeTranslateMode(false);
            }}
          >
            <LockIcon></LockIcon>
          </IconButton>
        </Stack>
      ) : (
        <Stack direction={"row"}>
          <IconButton
            onClick={() => {
              setEditMode(true);
              setScaleMode(true);
              props.changeScaleMode(true);
            }}
          >
            <ExpandIcon></ExpandIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              setEditMode(true);
              setTranslateMode(true);
              props.changeTranslateMode(true);
            }}
          >
            <OpenWithIcon></OpenWithIcon>
          </IconButton>
        </Stack>
      )}
    </Html>
  );
}

export default EditObjectHTML;
