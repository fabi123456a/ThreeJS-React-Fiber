import {
  MutableRefObject,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Edges,
  Html,
  PivotControls,
  TransformControls,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { Group, Vector3 } from "three";
import { debug } from "console";
import { Button } from "@mui/material";
import { useGesture } from "react-use-gesture";

// position des Objects
export type TypePosition = {
  x: number;
  y: number;
  z: number;
};

// skalierung des Objects
export type TypeScale = {
  x: number;
  y: number;
  z: number;
};

// schnittstelle zum currentObject
export type TypeObjectProps = {
  id: string;
  position: TypePosition;
  scale: TypeScale;
  editMode: "scale" | "translate" | "rotate" | undefined;
  showXTransform: boolean;
  showYTransform: boolean;
  showZTransform: boolean;
  modelPath: string;
};

// --- Typen ENDE

// Scene Objekt Komponente

function SceneModel(
  props: TypeObjectProps & {
    isSelected: boolean;
    setCurrentObjectProps: (props: TypeObjectProps) => void;
    onDrag?: () => void;
    onDragEnd?: () => void;
  }
) {
  // lädt das FBX-Model
  const fbx: THREE.Group = useLoader(FBXLoader, props.modelPath);
  // referenz auf das Mesh des FBX-Models
  const refMesh = useRef<THREE.Mesh>(null);

  // function
  const sendCurrentObjectDataToControls = () => {
    // position des Objects als Vektor3
    let vectorPosition: Vector3 = new Vector3();
    refMesh.current?.getWorldPosition(vectorPosition);

    // skalierung des Objects als Vektor3
    let vektorScale: Vector3 = new Vector3();
    refMesh.current?.getWorldScale(vektorScale);

    props.setCurrentObjectProps({
      id: props.id,
      position: {
        x: vectorPosition.x,
        y: vectorPosition.y,
        z: vectorPosition.z,
      },
      scale: {
        x: vektorScale.x,
        y: vektorScale.y,
        z: vektorScale.z,
      },
      editMode: props.editMode,
      showXTransform: props.showXTransform,
      showYTransform: props.showYTransform,
      showZTransform: props.showZTransform,
      modelPath: props.modelPath,
    });
  };

  const transform112 = useRef<any>();

  useEffect(() => {
    if (transform112.current) {
      const controls = transform112.current;
      const callback = () => {
        // sendCurrentObjectDataToControls();
        // console.log("dragged");
        alert("dragged");
      };

      controls.addEventListener("onPointerMove", callback);
    }
  }, []);

  return (
    <>
      <TransformControls
        ref={transform112}
        mode={props.editMode ? props.editMode : "scale"}
        showX={props.showXTransform}
        showY={props.showYTransform}
        showZ={props.showZTransform}
        position={
          new Vector3(props.position.x, props.position.y, props.position.z)
        }
        onMouseUp={(e) => {
          if (e) {
            //Checks if an event happened or if component just rerendered
            sendCurrentObjectDataToControls();
          }
        }}
      >
        {/* FBX-Model  */}
        <primitive
          onCreate={() => alert("creat")}
          onClick={() => {
            sendCurrentObjectDataToControls();
          }}
          ref={refMesh}
          object={fbx.clone(true)}
          scale={[props.scale.x, props.scale.y, props.scale.z]}
        ></primitive>
      </TransformControls>
    </>
  );
}

export default SceneModel;

/*
// zeigt nur das wireframe des FBX-Models an
  const showWireframe = () => {
    let wirefremaMaterial = new THREE.MeshStandardMaterial({
      wireframe: true,
    });

    fbx.children.forEach((mesh, i) => {
      if (mesh instanceof THREE.Mesh) {
        mesh.material = wirefremaMaterial;
      }
    });
  };

  // (soll) zeigt die normale Texture/Material des FBX-Models an
  const showNormalTexture = () => {
    // TODO
    alert(
      "TODO: Normale Texture anzeigen (Wireframe entfernen und Standard Material wieder setzen)"
    );

    // https://github.com/pmndrs/react-three-fiber/issues/112
  };
*/
