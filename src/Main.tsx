import * as React from "react";
import Stack from "@mui/material/Stack";
import Scene from "./Scene";
import { useState, useEffect } from "react";
import ModelList from "./UI-Elemente/3DModell-Liste/ModelListe";
import ObjectList, {
  BoxGeometryValue,
} from "./UI-Elemente/3DObjekt-Liste/ObjektListe";
import { Divider, Typography } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import { TypeObjectProps } from "./ModelLoaders/SceneObject";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<TypeObjectProps[]>([
    {
      id: "123.213123123",
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 0.02, y: 0.02, z: 0.02 },
      editMode: undefined,
      isScaleMode: false,
      modelPath: "./ModelsFBX/mercedes.fbx",
    },
    {
      id: "123567",
      position: { x: -2, y: 0, z: 0 },
      scale: { x: 0.02, y: 0.02, z: 0.02 },
      editMode: undefined,
      isScaleMode: false,
      modelPath: "./ModelsFBX/mercedes.fbx",
    },
  ]);
  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [boxGeos, setBoxGeos] = useState<BoxGeometryValue[]>([]);

  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [currentObjectProps, setMainCurrentObjectProps] =
    useState<TypeObjectProps>(null!);

  // sperrt die camera rotation, wenn true dann geht nur noch verschieben
  const [lockCamera, setLockCamera] = useState<boolean>(false);

  const handleModelAdd = (pfad: string) => {
    setModels([
      ...models,
      {
        id: "" + Math.random() * 1000,
        editMode: undefined,
        isScaleMode: false,
        modelPath: pfad,
        position: { x: 0, y: 0, z: 0 },
        scale: { x: 0.02, y: 0.02, z: 0.02 },
      },
    ]);
  };

  const updateModels = (modelID: string, newModelData: any) => {
    setModels((prev: TypeObjectProps[]) => [
      {
        ...prev.filter((model) => model.id === modelID)[0],
        ...newModelData,
      },
      ...prev.filter((model) => model.id !== modelID),
    ]);
  };

  useEffect(() => {
    if (!currentObjectProps) return;
    updateModels(currentObjectProps.id, currentObjectProps);
  }, [currentObjectProps]);

  return (
    <Stack
      direction="row"
      style={{ height: "100%", background: "lightGray", overflowY: "auto" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack
        direction="column"
        style={{
          height: "100%",
          width: "100%",
          background: "lightGray",
        }}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <ToolBar
          objProps={currentObjectProps}
          setObjProps={setMainCurrentObjectProps}
          setLockCamera={() => {
            setLockCamera(!lockCamera);
          }}
        ></ToolBar>
        <Scene
          currentObjectProps={currentObjectProps}
          setMainCurrentObjectProps={setMainCurrentObjectProps}
          models={models}
          objects={boxGeos}
          lockCamera={lockCamera}
        ></Scene>
      </Stack>

      <PropertieContainer
        objProps={currentObjectProps}
        setObjProps={setMainCurrentObjectProps}
      ></PropertieContainer>
    </Stack>
  );
}
