import { Button, Divider, IconButton, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeObjectProps } from "../../3D-Objects/SceneModel";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VideocamIcon from "@mui/icons-material/Videocam";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

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

  const [camButtonColor, toggleColor] = useState<boolean>(false);

  return (
    <Stack direction={"row"}>
      {props.objProps ? (
        <>
          <Typography>ToolBar</Typography>
          <IconButton
            color={
              props.objProps.editMode == "translate" ? "primary" : undefined
            }
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
                  showXTransform: true,
                  showYTransform: true,
                  showZTransform: true,
                };
              });
            }}
          >
            <OpenWithIcon></OpenWithIcon>
          </IconButton>
          <IconButton
            color={props.objProps.editMode == "scale" ? "primary" : undefined}
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
                  showXTransform: true,
                  showYTransform: true,
                  showZTransform: true,
                };
              });
            }}
          >
            <ExpandIcon></ExpandIcon>
          </IconButton>
          <IconButton
            color={props.objProps.editMode == "rotate" ? "primary" : undefined}
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
                  editMode: "rotate",
                  showXTransform: true,
                  showYTransform: true,
                  showZTransform: true,
                };
              });
            }}
          >
            <ThreeSixtyIcon></ThreeSixtyIcon>
          </IconButton>
          <IconButton
            color={props.objProps.editMode == undefined ? "primary" : undefined}
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
                  editMode: "undefined",
                  showXTransform: false,
                  showYTransform: false,
                  showZTransform: false,
                };
              });
            }}
          >
            <LockIcon></LockIcon>
          </IconButton>
        </>
      ) : (
        <Typography>Noch keine Objekt ausgewählt.</Typography>
      )}

      <Divider orientation="vertical" flexItem />
      {/* sperrt die Kamera Rotation */}
      <IconButton
        color={camButtonColor ? "primary" : "error"}
        onClick={() => {
          toggleColor(!camButtonColor);
          props.setLockCamera();
        }}
      >
        <VideocamIcon></VideocamIcon>
      </IconButton>
    </Stack>
  );
}

export default ToolBar;
