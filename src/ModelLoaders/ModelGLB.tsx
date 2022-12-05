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

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

function Model(props: {
  scale: number
  pfad: string;
  isDraggable: boolean;
  onDrag?: () => void;
  onDragEnd?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const flag = useRef<boolean>(false);
  //const gltf: GLTF = useLoader(GLTFLoader, "./ModelsGLB/SheenChair.glb");
  const gltf: GLTF = useLoader(GLTFLoader, props.pfad);

  return (
    <>
      {props.isDraggable ? (
        <PivotControls
          onDrag={() => {
            if (props.onDrag) props.onDrag();
          }}
          onDragEnd={() => {
            if (props.onDragEnd) props.onDragEnd();
          }}
        >
          <primitive
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
          position={[0, 0.2, 0]}
        />
      )}
    </>
  );
}

export default Model;

/*<PivotControls
      onDrag={() => {
        props.onDrag();
      }}
      onDragEnd={() => {
        props.onDragEnd();
      }}
    >
      <primitive
        ref={ref}
        object={gltf.scene.clone(true)}
        scale={1}
        position={[0, 0.2, 0]}
        onDoubleClick={() => {
          ref.current.rotateY(deg2rad(45));
        }}
        onClick={() => {
          flag.current = !flag.current;
        }}
        onPointerMissed={() => {
          if (flag.current) flag.current = !flag.current;
        }}
      />
      </PivotControls>*/

/*
function Line2() {
  const ref = useRef<THREE.Mesh>(null);
  const flag = useRef<boolean>(false);
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    if (ref.current && flag.current) ref.current.position.set(x, y, 0);
  });

  return (
    <mesh ref={ref} onClick={(e) => (flag.current = !flag.current)}>
      <boxBufferGeometry args={[2, 20, 20]} />
      <meshNormalMaterial />
    </mesh>
  );
}
*/

/*
  useFrame(
    (state: RootState, delta: number) => (ref.current.rotation.x += 0.01)
  );
  */
