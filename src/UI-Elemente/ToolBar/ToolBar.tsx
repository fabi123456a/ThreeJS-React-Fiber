import { Button, Divider, IconButton, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeCurrentObjectProps } from "../../ModelLoaders/SceneObject";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

function ToolBar(props: { objProps: TypeCurrentObjectProps }) {
  return (
    <Stack direction={"row"}>
      <Typography>ToolBar</Typography>
      {/* Objekt verschieben & rotieren, dafür wireframe aktivieren und PivotControl des CurrentObject anzeigen */}
      <IconButton
        onClick={() => {
          props.objProps.showWireFrame();
          props.objProps.showPivotControlAxis({ x: true, y: true, z: true });
          props.objProps.showScaleAxis({
            x: false,
            y: false,
            z: false,
          });
        }}
      >
        <OpenWithIcon></OpenWithIcon>
      </IconButton>
      {/* Objekt skalieren, dafür wireframe aktivieren und 'ScaleControl' des CurrentObject anzeigen */}
      <IconButton
        onClick={() => {
          props.objProps.showWireFrame();
          props.objProps.showPivotControlAxis({ x: false, y: false, z: false });
          props.objProps.showScaleAxis({
            x: true,
            y: true,
            z: true,
          });
        }}
      >
        <ExpandIcon></ExpandIcon>
      </IconButton>
      {/* Objekt sperren, also normal darstellen (kein wirframe sondern das normale material) */}
      <IconButton
        onClick={() => {
          props.objProps.showNormalTexture();
          props.objProps.showScaleAxis({
            x: false,
            y: false,
            z: false,
          });
          props.objProps.showPivotControlAxis({ x: false, y: false, z: false });
        }}
      >
        <LockIcon></LockIcon>
      </IconButton>
      <Divider orientation="vertical" flexItem />
      {/* Ansicht switchen (3d, Top-Down) */}
      <IconButton onClick={() => {}}>
        <VisibilityIcon></VisibilityIcon>
      </IconButton>
    </Stack>
  );
}

export default ToolBar;
