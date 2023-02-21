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
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
/*New by Miguel*/
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { ChangeEvent, ChangeEventHandler } from "react";
/*New by Miguel*/

function ToolBar(props: {
  objProps: TypeObjectProps; // ist gleich die currentObjectProps
  setObjProps: Function;
  controlsRef: React.RefObject<any>;
  deleteObject: (id: string) => void; // funktion um ein Object/Model aus der Szene zu entfernen
  exportObject: () => void;
  setOrtho: (flag: boolean) => void; // funktion die ein boolean setzt, ob gerade ein Orthografische Kamera aktiv ist
  setPerspective: (perspective: string) => void; // funktion setzt die Kamera Perspektive -> "0"=normal, "1"=topDown, "2"=frontal, "3"=leftMid, "4"=rightMid
  setWallVisibility: (flag: TypeWallVisibility) => void;
  saveScene: () => void;
  loadScene: (file: File | null) => void;
}) {
  // funktion
  const checkIfAObjectIsSelected = (): boolean => {
    if (!props.objProps) return false;
    return true;
  };

  return (
    <Stack
      direction={"row"}
      alignItems="stretch"
      alignContent="center"
      gap="1rem"
      justifyContent="space-evenly"
    >
      <Stack direction={"row"} style={{ width: "50%" }}>
        <FormControl
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.objProps ? (
            <>
              <FormLabel>Transform</FormLabel>
              <Stack direction={"row"} style={{ width: "100%" }}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  style={{ width: "100%" }}
                >
                  {/* Verschieben */}
                  <IconButton
                    color={
                      props.objProps.editMode === "translate"
                        ? "primary"
                        : undefined
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
                      props.objProps.editMode === "scale"
                        ? "primary"
                        : undefined
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
                      props.objProps.editMode === "rotate"
                        ? "primary"
                        : undefined
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
                      props.objProps.editMode === undefined
                        ? "primary"
                        : undefined
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
                <Stack>
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
              </Stack>
            </>
          ) : (
            <Typography>Noch keine Objekt ausgewählt.</Typography>
          )}
        </FormControl>
      </Stack>

      <Divider orientation="vertical" flexItem />

      {/* Kamera Perpektiven: normal, top-down, ... */}
      <Stack style={{ width: "25%" }}>
        <PerspectiveSelector
          setOrtho={props.setOrtho}
          controlsRef={props.controlsRef}
          setPerspective={props.setPerspective}
          setWallVisibility={props.setWallVisibility}
        />
      </Stack>

      <Divider orientation="vertical" flexItem />

      {/* Objekt/Model Löschen */}
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        style={{ width: "25%" }}
      >
        <Stack direction="row" style={{ width: "25%" }}>
          <IconButton
            onClick={() => {
              props.exportObject();
            }}
          >
            <ImportExportIcon></ImportExportIcon>
          </IconButton>
          <IconButton
            title="Load Scene"
            onClick={() => {
              const inputElement = document.createElement("input");
              inputElement.type = "file";
              document.body.appendChild(inputElement);
              inputElement.click();
              document.body.removeChild(inputElement);
              inputElement.addEventListener("change", (e) => {
                const target = e.target as HTMLInputElement;
                if (target?.files && target?.files[0]) {
                  props.loadScene(target.files[0]);
                }
              });
            }}
          >
            <DownloadIcon></DownloadIcon>
          </IconButton>
          <IconButton
            title="Save current Scene"
            onClick={() => {
              props.saveScene();
            }}
          >
            <UploadIcon></UploadIcon>
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ToolBar;
