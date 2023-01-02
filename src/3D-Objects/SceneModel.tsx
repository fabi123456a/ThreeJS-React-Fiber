import { useEffect, useRef, useState } from "react";
import { Edges, TransformControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { BoxHelper, LineBasicMaterial, Vector3 } from "three";
import { defaultListboxReducer } from "@mui/base";

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
  removeBoundingBox: () => void;
};

// KOMPONENTE

function SceneModel(
  props: TypeObjectProps & {
    isSelected: boolean;
    setCurrentObjectProps: (props: TypeObjectProps) => void;
    setLockCameraRototion: (flag: boolean) => void;
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
      removeBoundingBox: () => rBox(),
    });
  };

  const box = useRef<BoxHelper>(new BoxHelper(fbx, 0xff0000));
  const isBoxInserted = useRef<boolean>(false);

  const showBox = () => {
    if (!isBoxInserted.current) {
      // Berechne die Bounding Box des Models
      box.current.geometry.computeBoundingBox();

      // Erstelle ein rotes LineBasicMaterial für den Rahmen
      const material = new LineBasicMaterial({ color: 0xff0000 });

      // Setze das Material für den BoxHelper
      box.current.material = material;

      // Füge den BoxHelper als Kind des Models hinzu
      fbx.add(box.current);

      isBoxInserted.current = true;
    }
  };

  const rBox = () => {
    if (isBoxInserted) {
      fbx.remove(box.current);
      isBoxInserted.current = false;
    }
  };

  return (
    <>
      <TransformControls
        mode={props.editMode ? props.editMode : "scale"}
        showX={props.showXTransform}
        showY={props.showYTransform}
        showZ={props.showZTransform}
        position={
          new Vector3(props.position.x, props.position.y, props.position.z)
        }
        onMouseUp={(e) => {
          //Checks if an event happened or if component just rerendered
          if (e) {
            sendCurrentObjectDataToControls();
            console.log("Kamerarotation frei");
            props.setLockCameraRototion(false);
          }
        }}
        onMouseDown={(e) => {
          //Checks if an event happened or if component just rerendered
          if (e) {
            console.log("Kamerarotation sperren");
            props.setLockCameraRototion(true);
          }
        }}
      >
        <group>
          <primitive
            onClick={() => {
              sendCurrentObjectDataToControls();
              showBox();
            }}
            onDoubleClick={() => {
              rBox();
            }}
            ref={refMesh}
            object={fbx.clone(true)}
            scale={[props.scale.x, props.scale.y, props.scale.z]}
          ></primitive>
        </group>
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
