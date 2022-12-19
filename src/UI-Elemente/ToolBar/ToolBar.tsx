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
  // notwendig um Buttons zu toggeln
  const [isTranform, setIsTransfrom] = useState<boolean>(false);
  const [isScale, setIsScale] = useState<boolean>(false);
  const [isRotate, setIsRotate] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

  const toggleButtons = (
    tansform: boolean,
    scale: boolean,
    rotate: boolean,
    locked: boolean
  ): void => {
    setIsTransfrom(tansform);
    setIsScale(scale);
    setIsRotate(rotate);
    setIsLocked(locked);
  };

  return (
    <Stack direction={"row"}>
      <Typography>ToolBar</Typography>
      <IconButton
        color={isTranform ? "primary" : undefined}
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

          toggleButtons(true, false, false, false);
        }}
      >
        <OpenWithIcon></OpenWithIcon>
      </IconButton>
      <IconButton
        color={isScale ? "primary" : undefined}
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

          toggleButtons(false, true, false, false);
        }}
      >
        <ExpandIcon></ExpandIcon>
      </IconButton>
      <IconButton
        color={isRotate ? "primary" : undefined}
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

          toggleButtons(false, false, true, false);
        }}
      >
        <ThreeSixtyIcon></ThreeSixtyIcon>
      </IconButton>
      <IconButton
        color={isLocked ? "primary" : undefined}
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
              editMode: "scale", // muss gesetzt werden sons kann man die achsen nicht deaktivieren
              showXTransform: false,
              showYTransform: false,
              showZTransform: false,
            };
          });

          toggleButtons(false, false, false, true);
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
