import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PivotControls, Edges, Html } from "@react-three/drei";
import { BoxGeometryValue } from "../UI-Elemente/3DObjektListe/ObjektListe";
import { Label } from "@mui/icons-material";
import { Button, Slider, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/system";

function EditObjectHTML(props: { changeEditMode: (flag: boolean) => void }) {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <Html>
      {edit ? (
        <Stack>
          <IconButton
            onClick={() => {
              setEdit(false);
              props.changeEditMode(false);
            }}
          >
            <LockOpenIcon></LockOpenIcon>
          </IconButton>
        </Stack>
      ) : (
        <IconButton
          onClick={() => {
            setEdit(true);
            props.changeEditMode(true);
          }}
        >
          <LockIcon></LockIcon>
        </IconButton>
      )}
    </Html>
  );
}

export default EditObjectHTML;
