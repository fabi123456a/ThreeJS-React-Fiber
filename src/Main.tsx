import Stack from "@mui/material/Stack";
import Scene, { TypeRoomDimensions } from "./Scene/Scene";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Divider } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import { TypeObjectProps } from "./3D-Objects/SceneModel";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";
import { ModelList } from "./UI-Elemente/ModelList/ModelList";

export type TypeWallVisibility = {
  leftWall: boolean;
  rightWall: boolean;
};

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<TypeObjectProps[]>([
    /* {
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
    }, */
    {
      id: "123567",
      position: { x: -2, y: 0, z: 0 },
      scale: { x: 0.06, y: 0.06, z: 0.06 },
      rotation: { x: 0, y: 0, z: 0 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/Computer Desk.FBX",
      removeBoundingBox: () => {},
    },
    {
      id: "12321321367",
      position: { x: -1, y: 0, z: 0 },
      scale: { x: 0.03, y: 0.03, z: 0.03 },
      rotation: { x: 0, y: 0, z: 0 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/Chair.FBX",
      removeBoundingBox: () => {},
    },
    {
      id: "123211231233321367",
      position: { x: -2, y: 1, z: 0 },
      scale: { x: 0.03, y: 0.03, z: 0.03 },
      rotation: { x: 0, y: 0, z: 0 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/Monitor.FBX",
      removeBoundingBox: () => {},
    },
  ]);

  const [modelPaths, setModelPaths] = useState<
    { name: string; path: string }[]
  >([
    { name: "Car", path: "./ModelsFBX/car.fbx" },
    { name: "Mercedes", path: "./ModelsFBX/mercedes.fbx" },
    { name: "Couch", path: "./ModelsFBX/couch.fbx" },
    { name: "Low Poly Tree", path: "./ModelsFBX/lowpolytree.fbx" },
    { name: "Sofa", path: "./ModelsFBX/sofa.fbx" },
    { name: "Table And Chairs", path: "./ModelsFBX/tableandchairs.fbx" },
    { name: "Monitor", path: "./ModelsFBX/Monitor.FBX" },
    { name: "Chair", path: "./ModelsFBX/Chair.FBX" },
    { name: "Computer Desk", path: "./ModelsFBX/Computer Desk.FBX" },
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
        id: "" + crypto.randomUUID(), // geht im browser safari nicht
        editMode: undefined,
        showXTransform: false,
        showYTransform: false,
        showZTransform: false,
        modelPath: pfad,
        position: { x: 0, y: 0, z: 0 },
        scale: { x: 0.02, y: 0.02, z: 0.02 },
        rotation: { x: 0, y: 0, z: 0 },
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

  // linke und rechte wand anzeigen?

  const [wallVisiblity, setWallVisiblity] = useState<TypeWallVisibility>({
    leftWall: true,
    rightWall: true,
  });

  return (
    <Stack
      direction="row"
      style={{ height: "100%", background: "lightGray", overflowY: "auto" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <ModelList
        addObject={handleModelAdd}
        addModel={(name: string, url: string) =>
          setModelPaths((prev) => [...prev, { name: name, path: url }])
        }
        paths={modelPaths}
      ></ModelList>
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
          setWallVisibility={setWallVisiblity}
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
            wallVisibility={wallVisiblity}
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
