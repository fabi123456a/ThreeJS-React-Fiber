import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  useLoader,
  useFrame,
  RootState,
  ThreeEvent,
  useThree,
} from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { PivotControls } from "@react-three/drei";
import { Flag } from "@mui/icons-material";

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

function ModelGLB(props: {
  scale: number;
  pfad: string;
  isDraggable: boolean;
  onDrag?: () => void;
  onDragEnd?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  const [flag, setFlag] = useState<boolean>();

  //const gltf: GLTF = useLoader(GLTFLoader, "./ModelsGLB/SheenChair.glb");
  const gltf: GLTF = useLoader(GLTFLoader, props.pfad);

  return (
    <>
      {props.isDraggable ? (
        <PivotControls
          lineWidth={2}
          activeAxes={flag ? [true, true, true] : [false, false, false]}
          onDrag={() => {
            if (props.onDrag) props.onDrag();
          }}
          onDragEnd={() => {
            if (props.onDragEnd) props.onDragEnd();
            setFlag(false);
          }}
        >
          <primitive
            onPointerOver={() => {
              setFlag(true);
            }}
            ref={ref}
            object={gltf.scene.clone(true)}
            scale={props.scale}
            position={[0, 0.2, 0]}
          />
        </PivotControls>
      ) : (
        <primitive
          ref={ref}
          object={gltf.scene.clone(true)}
          scale={props.scale}
          position={[0, -1, 0]}
        />
      )}
    </>
  );
}

export default ModelGLB;
