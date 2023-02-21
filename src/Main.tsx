import Stack from "@mui/material/Stack";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Divider } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";
import { ModelList } from "./UI-Elemente/ModelList/ModelList";
import Scene from "./Scene/Scene";
import { Buffer } from "buffer";

/*New */
import * as THREE from "three";
import exportToGLTF from "./utils/exporting";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
/*New */

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [fbx_models_files, setFbx_models_files] = useState<any[]>([]);
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
      if (!(prevObjectProps.current.id == currentObjectProps.id)) {
        prevObjectProps.current.removeBoundingBox();
      }
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

  /* by Miguel noch bearbeitung */

  const handleModelexport = () => {
    let modelsArrayLength = models.length;
    const scene = new THREE.Scene();
    const fbxLoader = new FBXLoader();
    for (let i = 0; i < modelsArrayLength; i++) {
      fbxLoader.load(
        models[i].modelPath,
        (object) => {
          scene.add(object);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );
    }
    exportToGLTF(scene);
  };
  /* by Miguel noch bearbeitung */

  const updateModels = (modelID: string, newModelData: any) => {
    setModels((prev: TypeObjectProps[]) => [
      {
        ...prev.find((model) => model.id === modelID),
        ...newModelData,
      },
      ...prev.filter((model) => model.id !== modelID),
    ]);
  };
  function arrayBufferToBase64(arrayBuffer: any) {
    const bytes = new Uint8Array(arrayBuffer);
    const binaryString = bytes.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return btoa(binaryString);
  }
  function base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = btoa(
          unescape(encodeURIComponent(reader.result as string))
        );
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file);
    });
  }

  function base64ToBlob(base64String: string, sliceSize = 512) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "application/octet-stream" });
    return blob;
    //return new File([blob], fileName, { type: "application/octet-stream" });
  }

  async function saveScene() {
    const files = await Promise.all(
      fbx_models_files.map(async (fileData) => {
        const { pathName, name, file } = fileData;
        const base64 = arrayBufferToBase64(await file.arrayBuffer()); //Convert the arrayBuffer of the file to a base64 encoded string
        return { pathName, name, file: base64 };
      })
    );
    const toSaveObj = {
      models: [...models],
      fbx_models: files,
    };
    console.log("====================================");
    console.log(toSaveObj);
    console.log("====================================");
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

  async function loadScene(file: any) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = JSON.parse(e?.target?.result as string);

      const modifiedPaths = await Promise.all(
        data.fbx_models?.map(async (fbx_model: any) => {
          return {
            name: fbx_model.name,
            oldPathName: fbx_model.pathName,
            newPathName: URL.createObjectURL(base64ToBlob(fbx_model.file)), //generate a Path from the decoded base64 ArrayBuffe String, the default type is "" and means it is a binary file
          };
        })
      );

      setModelPaths((prev) => [
        ...prev,
        ...modifiedPaths.map((fbx_model) => {
          return { name: fbx_model.name, path: fbx_model.newPathName };
        }),
      ]);

      setModels((prev) => [
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
      <input
        type="file"
        onChange={(e) =>
          loadScene(e?.target?.files ? e?.target?.files[0] : null)
        }
      />
      <button onClick={saveScene}>Save</button>
      {/* ModelList */}
      <Stack
        style={{
          background: "#d9d9d9",
        }}
      >
        <ModelList
          addObject={handleModelAdd}
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
            objProps={currentObjectProps}
            setObjProps={setMainCurrentObjectProps}
            controlsRef={controlsRef}
            setWallVisibility={setWallVisiblity}
          ></ToolBar>
        </Stack>

        {/* Canvas */}
        <Stack style={{ border: "1px solid darkgray", height: "100%" }}>
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
