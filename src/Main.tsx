import Stack from "@mui/material/Stack";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Divider } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";
import { ModelList } from "./UI-Elemente/ModelList/ModelList";
import Scene from "./Scene/Scene";
import * as THREE from "three";

//@ts-ignore
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { arrayBufferToBase64, base64ToBlob } from "./utils/converting";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Main() {
  const [fbx_models_files, setFbx_models_files] = useState<any[]>([]); //Contains all FBX Model Files which can be selected via the ModelList Component. Is needed to save the Scene and all FBX Model Files
  // contains all models which are currently in the scene
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
      rotation: { x: 0, y: -1.6, z: 0 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/Chair.FBX",
      removeBoundingBox: () => {},
    },
    {
      id: "123211231233321367",
      position: {
        x: 2.0517650695421015,
        y: 1.83353328885948,
        z: 3.489659672608047,
      },
      scale: { x: 0.03, y: 0.03, z: 0.03 },
      rotation: { x: 0, y: 1.6, z: 0 },
      editMode: undefined,
      showXTransform: false,
      showYTransform: false,
      showZTransform: false,
      modelPath: "./ModelsFBX/Monitor.FBX",
      removeBoundingBox: () => {},
    },
  ]);

  //Contains all Model Files links and their name which can be selected via the ModelList
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
    height: 7,
    width: 50,
    depth: 50,
  });

  // to show the left or right wall or hide it when the camera mode changes
  const [wallVisiblity, setWallVisiblity] = useState<TypeWallVisibility>({
    leftWall: true,
    rightWall: true,
  });

  const sceneRef = useRef<any>(null!);
  const controlsRef = useRef<any>(null);
  const prevObjectProps = useRef(currentObjectProps);

  useEffect(() => {
    if (!currentObjectProps) return;
    updateModels(currentObjectProps.id, currentObjectProps);

    if (prevObjectProps.current != null) {
      if (prevObjectProps.current.id !== currentObjectProps.id) {
        prevObjectProps.current.removeBoundingBox();
      }
    }

    prevObjectProps.current = currentObjectProps;
  }, [currentObjectProps]);

  const handleModelAdd = (pfad: string) => {
    setModels([
      ...models,
      {
        id: "" + Math.random() * 1000,
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

  const handleModelexport = async () => {
    const scene = new THREE.Scene();
    const fbxLoader = new FBXLoader();
    for (const element of models) {
      fbxLoader.load(element.modelPath, (object) => {
        object.scale.set(element.scale.x, element.scale.y, element.scale.z);
        object.position.set(
          element.position.x,
          element.position.y,
          element.position.z
        );
        object.rotation.set(
          element.rotation.x,
          element.rotation.y,
          element.rotation.z
        );
        scene.add(object);
      });
    }
    setTimeout(() => {
      const gltfExporter = new GLTFExporter();

      gltfExporter.parse(
        scene,
        function (result: any) {
          const output = JSON.stringify(result, null, 2);
          console.log(output);
          saveString(output, "scene.gltf");
        },
        function (error: any) {
          console.log("An error happened during parsing", error);
        }
      );

      function save(blob: any, filename: any) {
        const link = document.createElement("a");

        link.download = "Scene";
        document.body.appendChild(link);
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        document.body.removeChild(link);
      }

      function saveString(text: any, filename: any) {
        save(new Blob([text], { type: "text/plain" }), filename);
      }
    }, 3000);
  };
  let contentGltfFile: THREE.Group;
  const handleModelimport = async (file: File | null) => {
    if (!file) return;
    models.length = 0;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const contents: string = JSON.parse(e?.target?.result as string);
      const gltfLoader = new GLTFLoader();
      gltfLoader.parse(contents, "", function (gltf) {
        contentGltfFile = gltf.scene;
        sceneRef.current.add(gltf.scene);
      });
    };
    reader.readAsText(file);
  };

  const handleModelRemoval = async () => {
    if (contentGltfFile == null) {
      window.location.reload();
    } else {
      sceneRef.current.remove(contentGltfFile);
    }
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
    const files = await Promise.all(
      fbx_models_files.map(async (fileData) => {
        const { pathName, name, file } = fileData;
        const base64 = arrayBufferToBase64(await file.arrayBuffer()); //Convert the arrayBuffer of the file to a base64 encoded string
        return { pathName, name, file: base64 };
      })
    );
    const toSaveObj = {
      roomDimensions: roomDimensions,
      models: [...models],
      fbx_models: files,
    };
    const sceneJsonString = JSON.stringify(toSaveObj);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([sceneJsonString], { type: "application/json" })
    );
    link.download = "Scene";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function loadScene(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = JSON.parse(e?.target?.result as string);

      const modifiedPaths = await Promise.all(
        data.fbx_models?.map(async (fbx_model: any) => {
          const url = URL.createObjectURL(base64ToBlob(fbx_model.file)); //generate a Path from the decoded base64 ArrayBuffe String, the default type is "" and means it is a binary file
          return {
            name: fbx_model.name,
            oldPathName: fbx_model.pathName,
            newPathName: url,
          };
        })
      );

      if (data.roomDimensions) {
        setRoomDimensions({ ...data.roomDimensions });
      }

      setModelPaths((prev) => [
        ...prev,
        ...modifiedPaths.map((fbx_model) => {
          return { name: fbx_model.name, path: fbx_model.newPathName };
        }),
      ]);

      setModels([
        ...data.models.map((model: any) => {
          const newPathName = modifiedPaths.find((modelFbxPath) => {
            return modelFbxPath?.oldPathName === model?.modelPath;
          });
          return {
            ...model,
            modelPath: newPathName?.newPathName ?? model.modelPath,
          };
        }),
      ]);
    };
    reader.readAsText(file);
  }
  return (
    <Stack
      direction="row"
      style={{ height: "100%", background: "lightGray", overflowY: "auto" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {/* ModelList */}
      <Stack
        style={{
          background: "#d9d9d9",
          width: "20%",
        }}
      >
        <ModelList
          addObject={handleModelAdd}
          deleteModel={(url: string) => {
            setModelPaths((prev) => [
              ...prev.filter((path) => path.path !== url),
            ]);
            setFbx_models_files((prev) => [
              ...prev.filter((path) => path.pathName !== url),
            ]);
          }}
          addModel={(name: string, url: string, file: any) => {
            setModelPaths((prev) => [...prev, { name: name, path: url }]);
            setFbx_models_files((prev: any[]) => {
              if (prev.find((elem) => elem.pathName === url)) {
                return prev;
              }
              const newFile = {
                pathName: url,
                name: name,
                file: file,
              };
              return [...prev, newFile];
            });
          }}
          paths={modelPaths}
        ></ModelList>
      </Stack>

      {/* ToolBar */}
      <Stack
        direction="column"
        style={{
          height: "100%",
          width: "100%",
          background: "white",
        }}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack
          style={{
            background: "#d9d9d9",
          }}
        >
          <ToolBar
            setPerspective={setPerspective}
            setOrtho={setOrtho}
            deleteObject={handleModelDelete}
            exportObject={handleModelexport}
            importObject={handleModelimport}
            removeObject={handleModelRemoval}
            objProps={currentObjectProps}
            setObjProps={setMainCurrentObjectProps}
            controlsRef={controlsRef}
            setWallVisibility={setWallVisiblity}
            saveScene={saveScene}
            loadScene={loadScene}
          ></ToolBar>
        </Stack>

        {/* Canvas */}
        <Stack
          style={{ border: "1px solid darkgray", height: "100%", flex: "1" }}
        >
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
      </Stack>

      {/* PropertieContainer */}
      <Stack
        style={{
          background: "#d9d9d9",
          width: "30%",
        }}
      >
        <PropertieContainer
          objProps={currentObjectProps}
          setObjProps={setMainCurrentObjectProps}
          roomDimensions={roomDimensions}
          setRoomDimensions={setRoomDimensions}
        ></PropertieContainer>
      </Stack>
    </Stack>
  );
}
