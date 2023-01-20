import Stack from "@mui/material/Stack";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Divider } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";
import { ModelList } from "./UI-Elemente/ModelList/ModelList";
import Scene from "./Scene/Scene";

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<TypeObjectProps[]>([
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

  // cam
  const [ortho, setOrtho] = useState<boolean>(false);
  const [perspective, setPerspective] = useState<string>("0");
  const [roomDimensions, setRoomDimensions] = useState<TypeRoomDimensions>({
    height: 3,
    width: 30,
    depth: 30,
  });

  // linke und rechte wand anzeigen?
  const [wallVisiblity, setWallVisiblity] = useState<TypeWallVisibility>({
    leftWall: true,
    rightWall: true,
  });

  const sceneRef = useRef(null);
  const controlsRef = useRef<any>(null);
  const prevObjectProps = useRef(currentObjectProps);

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
        id: "" + (window?.crypto ? crypto.randomUUID() : Math.random() * 1000), // geht im browser safari nicht
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
    setModels((prevModels) => prevModels.filter((model) => model.id !== id));
    setMainCurrentObjectProps(null!);
  };

  const updateModels = (modelID: string, newModelData: any) => {
    setModels((prev: TypeObjectProps[]) => [
      {
        ...prev.find((model) => model.id === modelID),
        ...newModelData,
      },
      ...prev.filter((model) => model.id !== modelID),
    ]);
  };

  async function saveScene() {
    const sceneJsonString = JSON.stringify(sceneRef.current);
    const link = document.createElement("a");
    link.href=URL.createObjectURL(new Blob([sceneJsonString], {type: 'application/json'}));
    link.download = "Scene";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
          controlsRef={controlsRef}
          setWallVisibility={setWallVisiblity}
        ></ToolBar>
        <Canvas>
          {/*TO ACCESS THE useThree hook in the Scene component*/}
          <Scene
            controlsRef={controlsRef}
            perspektive={perspective}
            ortho={ortho}
            currentObjectProps={currentObjectProps}
            setMainCurrentObjectProps={setMainCurrentObjectProps}
            models={models}
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
