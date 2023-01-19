import { useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { BoxHelper, Euler, LineBasicMaterial, Vector3 } from "three";

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

// rotierung des Objects
export type TypeRotation = {
  x: number;
  y: number;
  z: number;
};

// schnittstelle zum currentObject
export type TypeObjectProps = {
  id: string;
  position: TypePosition;
  scale: TypeScale;
  rotation: TypeRotation;
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
    controlsRef: React.RefObject<any>;
    isSelected: boolean;
    camPerspektive: string;
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
    console.log(refMesh.current?.rotation);

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
      rotation: {
        x: refMesh.current?.rotation.x ?? 0,
        y: refMesh.current?.rotation.y ?? 0,
        z: refMesh.current?.rotation.z ?? 0,
      },
      editMode: props.editMode,
      showXTransform: props.showXTransform,
      showYTransform: props.showYTransform,
      showZTransform: props.showZTransform,
      modelPath: props.modelPath,
      removeBoundingBox: () => removeBoundingBox(),
    });
  };

  // BoundingBox management
  const box = useRef<BoxHelper>(new BoxHelper(fbx, 0xff0000));
  const isBoxInserted = useRef<boolean>(false);

  const insertBoundingBox = () => {
    if (!isBoxInserted.current) {
      box.current.geometry.computeBoundingBox();
      const material = new LineBasicMaterial({ color: 0xff0000 });
      box.current.material = material;
      fbx.add(box.current);

      isBoxInserted.current = true;
    }
  };

  const removeBoundingBox = () => {
    fbx.remove(box.current);
    isBoxInserted.current = false;
  };

  useEffect(() => {
    if (props.isSelected) {
      insertBoundingBox();
    }
  });

  return (
    <>
      <TransformControls
        mode={props.editMode ? props.editMode : "scale"}
        showX={props.isSelected && props.showXTransform}
        showY={props.isSelected && props.showYTransform}
        showZ={props.isSelected && props.showZTransform}
        position={
          new Vector3(props.position.x, props.position.y, props.position.z)
        }
        onMouseUp={(e) => {
          //Checks if an event happened or if component just rerendered
          if (e) {
            sendCurrentObjectDataToControls();
            console.log("Kamerarotation frei");

            if (props.camPerspektive == "0") {
              //alert(props.camPerspektive);
              props.controlsRef.current.enableRotate = true;
            }
          }
        }}
        onMouseDown={(e) => {
          //Checks if an event happened or if component just rerendered
          if (e) {
            console.log("Kamerarotation sperren");
            props.controlsRef.current.enableRotate = false;
          }
        }}
        onClick={(e) => {
          if (e) {
            e.stopPropagation();
            sendCurrentObjectDataToControls();
            insertBoundingBox();
          }
        }}
      >
        <group>
          <primitive
            onClick={() => {
              sendCurrentObjectDataToControls();
              insertBoundingBox();
            }}
            onDoubleClick={() => {
              removeBoundingBox();
            }}
            ref={refMesh}
            object={fbx.clone(true)}
            scale={[props.scale.x, props.scale.y, props.scale.z]}
            rotation={
              new Euler(props.rotation.x, props.rotation.y, props.rotation.z)
            }
          ></primitive>
        </group>
      </TransformControls>
    </>
  );
}

export default SceneModel;
