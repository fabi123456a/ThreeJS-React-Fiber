import { Button, IconButton, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeCurrentObjectProps } from "../../ModelLoaders/SceneObject";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";

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
        }}
      >
        <OpenWithIcon></OpenWithIcon>
      </IconButton>
      {/* Objekt skalieren, dafür wireframe aktivieren und 'ScaleControl' des CurrentObject anzeigen */}
      <IconButton
        onClick={() => {
          props.objProps.showWireFrame();
          props.objProps.showScaleAxis({
            xAxis: true,
            yAxis: true,
            zAxis: true,
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
            xAxis: false,
            yAxis: false,
            zAxis: false,
          });
          props.objProps.showPivotControlAxis({ x: false, y: false, z: false });
        }}
      >
        <LockIcon></LockIcon>
      </IconButton>
    </Stack>
  );
}

export default ToolBar;
