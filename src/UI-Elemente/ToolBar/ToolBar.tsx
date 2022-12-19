import { Button, Divider, IconButton, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeObjectProps } from "../../ModelLoaders/SceneObject";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

// in objProps stehen die properties des currentObjects + funktionen wie z.B showPivotControlAxis
function ToolBar(props: {
  objProps: TypeObjectProps;
  setObjProps: Function;
  setFrontalView: () => void;
}) {
  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

  return (
    <Stack direction={"row"}>
      <Typography>ToolBar</Typography>
      {/* Objekt verschieben & rotieren, dafür wireframe aktivieren und PivotControl des CurrentObject anzeigen */}
      <IconButton
        onClick={() => {
          if (!checkIfAObjectIsSelected()) {
            alert(
              "Sie haben noch kein Objekt in der Scene ausgewählt. (Durch klicken auf das Objekt)"
            );
            return;
          }

          //props.objProps.showWireFrame();
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
      {/* Objekt skalieren, dafür wireframe aktivieren und 'ScaleControl' des CurrentObject anzeigen */}
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
      {/* Objekt sperren, also normal darstellen (kein wirframe sondern das normale material) */}
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
      {/* Ansicht switchen (3d, Top-Down, frontal, ...) */}
      {/* auf Normal Kamera switchen geht noch nicht ist aber in Bearbeitung */}
      <IconButton
        onClick={() => {
          // TODO: wenn frontalView == true dann muss frontalView = false & andersrum
          props.setFrontalView();
        }}
      >
        <VisibilityIcon></VisibilityIcon>
      </IconButton>
    </Stack>
  );
}

export default ToolBar;
