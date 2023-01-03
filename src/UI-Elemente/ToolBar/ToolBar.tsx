import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { TypeObjectProps } from "../../3D-Objects/SceneModel";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { useState } from "react";

function ToolBar(props: {
  objProps: TypeObjectProps; // ist gleich die currentObjectProps
  setObjProps: Function;
  lockCam: boolean; // boolean ob die Kamera rotation gepserrt ist oder nicht
  setLockCamera: (flag: boolean) => void; // funktion um Kamera rotation zu sperren
  deleteObject: (id: string) => void; // funktion um ein Object/Model aus der Szene zu entfernen
  setOrtho: (flag: boolean) => void; // funktion die ein boolean setzt, ob gerade ein Orthografische Kamera aktiv ist
  setPerspective: (perspective: string) => void; // funktion setzt die Kamera Perspektive -> "0"=normal, "1"=topDown, "2"=frontal, "3"=leftMid, "4"=rightMid
}) {
  // status
  const [radioValue, setRadioValue] = useState<string>("0");

  // funktion
  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

  return (
    <Stack direction={"row"}>
      {props.objProps ? (
        <>
          <Typography>ToolBar</Typography>
          {/* Verschieben */}
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
          {/* Skalieren */}
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
          {/* Rotieren */}
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
          {/* Sperren */}
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
      {/* Kamera Perpektiven: normal, top-down, ... */}
      <FormControl>
        <FormLabel>Perspektive</FormLabel>
        <RadioGroup
          row
          onChange={(e, v) => {
            // wenn Kameraperpektive geändert wurde
            if (v != "0") {
              props.setOrtho(true);
              props.setLockCamera(true);
            } else {
              props.setOrtho(false);
              props.setLockCamera(false);
              props.setPerspective(v);
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

            setRadioValue(v);
          }}
        >
          <FormControlLabel
            checked={radioValue == "0" ? true : false} // default Perspektive ist normal (also "0") am anfang, dass ist da damit am anfang normal ausgewählt ist
            value={"0"}
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
      {/* Objekt/Model Löschen */}
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
