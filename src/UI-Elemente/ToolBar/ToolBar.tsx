import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeObjectProps } from "../../3D-Objects/SceneModel";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VideocamIcon from "@mui/icons-material/Videocam";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { TypeCamPerspektive } from "../../Scene/Camera";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

function ToolBar(props: {
  objProps: TypeObjectProps;
  setObjProps: Function;
  lockCam: boolean;
  setLockCamera: (flag: boolean) => void;
  deleteObject: (id: string) => void;
  setOrtho: (flag: boolean) => void;
  setPerspective: (perspective: string) => void;
}) {
  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

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
              if (!checkIfAObjectIsSelected()) return;

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
              if (!checkIfAObjectIsSelected()) return;

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
              if (!checkIfAObjectIsSelected()) return;

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
              if (!checkIfAObjectIsSelected()) return;

              props.setObjProps((prev: TypeObjectProps) => {
                return {
                  ...prev,
                  editMode: undefined,
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
      <FormControl>
        <FormLabel>Perpektive</FormLabel>
        <RadioGroup
          row
          onChange={(e, v) => {
            if (v != "0") {
              props.setOrtho(true);
              props.setLockCamera(true);
            } else {
              props.setOrtho(false);
              props.setLockCamera(false);
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
          <FormControlLabel
            // TODO:  {ortho ? checked : null}
            value={0}
            control={<Radio />}
            label="Normal"
          />

          <FormControlLabel value={"1"} control={<Radio />} label="TopDown" />
          <FormControlLabel value={"2"} control={<Radio />} label="Frontal" />
          <FormControlLabel value={"3"} control={<Radio />} label="LeftMid" />
          <FormControlLabel value={"4"} control={<Radio />} label="RightMid" />
        </RadioGroup>
      </FormControl>
      <Divider orientation="vertical" flexItem />
      <IconButton
        onClick={() => {
          if (!checkIfAObjectIsSelected()) {
            alert("Kein Objekt ausgewählt");
            return;
          }

          props.deleteObject(props.objProps.id);
        }}
      >
        <DeleteForeverIcon></DeleteForeverIcon>
      </IconButton>
    </Stack>
  );
}

export default ToolBar;
