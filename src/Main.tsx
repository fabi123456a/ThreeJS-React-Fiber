import Stack from "@mui/material/Stack";
import Scene, { TypeRoomDimensions } from "./Scene/Scene";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Divider } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import { TypeObjectProps } from "./3D-Objects/SceneModel";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";
import { ModelList } from "./UI-Elemente/ModelList/ModelList";

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<TypeObjectProps[]>([
    {
      id: "123.213123123",
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 0.02, y: 0.02, z: 0.02 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/car.fbx",
      removeBoundingBox: () => {},
    },
    {
      id: "123567",
      position: { x: -2, y: 0, z: 0 },
      scale: { x: 0.02, y: 0.02, z: 0.02 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/sofa.fbx",
      removeBoundingBox: () => {},
    },
  ]);

  const [modelPaths, setModelPaths] = useState<string[]>([
    "./ModelsFBX/car.fbx",
    "./ModelsFBX/mercedes.fbx",
    "./ModelsFBX/couch.fbx",
    "./ModelsFBX/lowpolytree.fbx",
    "./ModelsFBX/sofa.fbx",
    "./ModelsFBX/tableandchairs.fbx",
  ]);

  // currentObjectProps
  const [currentObjectProps, setMainCurrentObjectProps] =
    useState<TypeObjectProps>(null!);
  const sceneRef = useRef(null);

  // cam
  const [ortho, setOrtho] = useState<boolean>(false);
  const [perspective, setPerspective] = useState<string>("0");
  const [lockCam, setLockCam] = useState<boolean>(false);
  const [roomDimensions, setRoomDimensions] = useState<TypeRoomDimensions>({
    height: 3,
    width: 30,
    depth: 30,
  });

  useEffect(() => {
    if (!currentObjectProps) return;
    updateModels(currentObjectProps.id, currentObjectProps);

    if (prevObjectProps.current != null) {
      prevObjectProps.current.removeBoundingBox();
    }

    prevObjectProps.current = currentObjectProps;
  }, [currentObjectProps]);

  const handleModelAdd = (pfad: string) => {
    setModels([
      ...models,
      {
        id: "" + crypto.randomUUID(),
        editMode: undefined,
        showXTransform: false,
        showYTransform: false,
        showZTransform: false,
        modelPath: pfad,
        position: { x: 0, y: 0, z: 0 },
        scale: { x: 0.02, y: 0.02, z: 0.02 },
        removeBoundingBox: () => {},
      },
    ]);
  };

  const handleModelDelete = (id: string) => {
    let indexToDelete: number = -1;
    models.forEach((prop: TypeObjectProps, index: number) => {
      if (prop.id == id) {
        indexToDelete = index;
        return;
      }
    });

    if (indexToDelete >= 0) delete models[indexToDelete];

    models.shift();

    setModels(models);

    setMainCurrentObjectProps(null!);
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

  const prevObjectProps = useRef(currentObjectProps);

  return (
    <Stack
      direction="row"
      style={{ height: "100%", background: "lightGray", overflowY: "auto" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <ModelList addObject={handleModelAdd} paths={modelPaths}></ModelList>
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
          setPerspective={setPerspective}
          setOrtho={setOrtho}
          deleteObject={handleModelDelete}
          objProps={currentObjectProps}
          setObjProps={setMainCurrentObjectProps}
          setLockCamera={setLockCam}
          lockCam={lockCam}
        ></ToolBar>
        <Canvas>
          {/*TO ACCESS THE useThree hook in the Scene component*/}
          <Scene
            perspektive={perspective}
            ortho={ortho}
            currentObjectProps={currentObjectProps}
            setMainCurrentObjectProps={setMainCurrentObjectProps}
            models={models}
            lockCamera={lockCam}
            setLockCamRotation={setLockCam}
            roomDimensions={roomDimensions}
            sceneRef={sceneRef}
          ></Scene>
        </Canvas>
      </Stack>

      <PropertieContainer
        objProps={currentObjectProps}
        setObjProps={setMainCurrentObjectProps}
        roomDimensions={roomDimensions}
        setRoomDimensions={setRoomDimensions}
      ></PropertieContainer>
    </Stack>
  );
}
