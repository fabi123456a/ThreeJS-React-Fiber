import { Button, Divider, IconButton, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeObjectProps } from "../../3D-Objects/SceneModel";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VideocamIcon from "@mui/icons-material/Videocam";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

function ToolBar(props: {
  objProps: TypeObjectProps;
  setObjProps: Function;
  setLockCamera: () => void;
}) {
  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

  return (
    <Stack direction={"row"}>
      <Typography>ToolBar</Typography>
      <IconButton
        onClick={() => {
          if (!checkIfAObjectIsSelected()) {
            alert(
              "Sie haben noch kein Objekt in der Scene ausgewählt. (Durch klicken auf das Objekt)"
            );
            return;
          }

          props.setObjProps((prev: TypeObjectProps) => {
            return {
              ...prev,
              editMode: "translate",
              isScaleMode: true,
            };
          });
        }}
      >
        <OpenWithIcon></OpenWithIcon>
      </IconButton>
      <IconButton
        onClick={() => {
          if (!checkIfAObjectIsSelected()) {
            alert(
              "Sie haben noch kein Objekt in der Scene ausgewählt. (Durch klicken auf das Objekt)"
            );
            return;
          }
          props.setObjProps((prev: TypeObjectProps) => {
            return {
              ...prev,
              editMode: "scale",
              isScaleMode: true,
            };
          });
        }}
      >
        <ExpandIcon></ExpandIcon>
      </IconButton>
      <IconButton
        onClick={() => {
          if (!checkIfAObjectIsSelected()) {
            alert(
              "Sie haben noch kein Objekt in der Scene ausgewählt. (Durch klicken auf das Objekt)"
            );
            return;
          }
          props.setObjProps((prev: TypeObjectProps) => {
            return {
              ...prev,
              isScaleMode: false,
            };
          });
        }}
      >
        <LockIcon></LockIcon>
      </IconButton>
      <Divider orientation="vertical" flexItem />
      {/* sperrt die Kamera Rotation */}
      <IconButton
        onClick={() => {
          props.setLockCamera();
        }}
      >
        <VideocamIcon></VideocamIcon>
      </IconButton>
    </Stack>
  );
}

export default ToolBar;
