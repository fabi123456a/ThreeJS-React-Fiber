import {
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import ExpandIcon from "@mui/icons-material/Expand";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LockIcon from "@mui/icons-material/Lock";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import PerspectiveSelector from "./PerspectiveSelector";

function ToolBar(props: {
  objProps: TypeObjectProps; // ist gleich die currentObjectProps
  setObjProps: Function;
  controlsRef: React.RefObject<any>;
  deleteObject: (id: string) => void; // funktion um ein Object/Model aus der Szene zu entfernen
  setOrtho: (flag: boolean) => void; // funktion die ein boolean setzt, ob gerade ein Orthografische Kamera aktiv ist
  setPerspective: (perspective: string) => void; // funktion setzt die Kamera Perspektive -> "0"=normal, "1"=topDown, "2"=frontal, "3"=leftMid, "4"=rightMid
  setWallVisibility: (flag: TypeWallVisibility) => void;
}) {
  // funktion
  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

  return (
    <Stack
      direction={"row"}
      alignContent="center"
      justifyContent="center"
      gap="1rem"
    >
      <FormControl>
        {props.objProps ? (
          <>
            <FormLabel style={{ textAlign: "center" }}>Transform</FormLabel>
            <Stack direction={"row"}>
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
                color={
                  props.objProps.editMode == "scale" ? "primary" : undefined
                }
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
                color={
                  props.objProps.editMode == "rotate" ? "primary" : undefined
                }
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
                color={
                  props.objProps.editMode == undefined ? "primary" : undefined
                }
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
            </Stack>
          </>
        ) : (
          <Typography>Noch keine Objekt ausgewählt.</Typography>
        )}
      </FormControl>

      <Divider orientation="vertical" flexItem />
      {/* Kamera Perpektiven: normal, top-down, ... */}
      <PerspectiveSelector
        setOrtho={props.setOrtho}
        controlsRef={props.controlsRef}
        setPerspective={props.setPerspective}
        setWallVisibility={props.setWallVisibility}
      />
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
