import * as THREE from "three";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import BoxGeometrie from "../3D-Objects/BoxGeometrie";
import {
  PerspectiveCamera,
  OrthographicCamera,
  MapControls,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei"; //https://drei.pmnd.rs/?path=/story/controls-mapcontrols--map-controls-scene-st
import SceneModel, { TypeObjectProps } from "../3D-Objects/SceneModel";
import Room from "../3D-Objects/Room";
import { Camera } from "./Camera";

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

export default function Scene(props: {
  models: TypeObjectProps[];
  currentObjectProps: TypeObjectProps;
  setMainCurrentObjectProps: (props: TypeObjectProps) => void;
  lockCamera: boolean;
}) {
  return (
    <>
      {/* Canvas nimmt größe von parent container */}
      {/* Canvas richtet eine Szene & Kamera ein */}
      <Canvas>
        {/* Kamera */}
        <Camera lockCamera={props.lockCamera}></Camera>
        {/* Licht */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* Modelle */}
        {props.models.map((model) => (
          <SceneModel
            key={model.id}
            id={model.id}
            isSelected={model.id === props.currentObjectProps?.id}
            setCurrentObjectProps={props.setMainCurrentObjectProps}
            editMode={model.editMode}
            modelPath={model.modelPath}
            showXTransform={model.showXTransform}
            showYTransform={model.showYTransform}
            showZTransform={model.showZTransform}
            position={model.position}
            scale={model.scale}
          ></SceneModel>
        ))}
        {/* Raum */}
        <Room height={3} width={30} depth={30} />
        {/* Test set CurrentObject */}
        {/* <SceneObject
          id="1dasd.123213"
          setCurrentObjectProps={props.setMainCurrentObjectProps}
          editMode={props.currentObjectProps?.editMode}
          modelPath={"./ModelsFBX/mercedes.fbx"}
          isScaleMode={props.currentObjectProps?.isScaleMode}
          position={props.currentObjectProps?.position || { x: 0, y: 0, z: 0 }}
          scale={props.currentObjectProps?.scale || { x: 0.02, y: 0.02, z: 0.02 }}
        ></SceneObject>
        {/* <SceneObject
          setCurrentObjectProps={props.setMainCurrentObjectProps}
          pfadToFBX={"./ModelsFBX/mercedes.fbx"}
          position={{ x: -1, y: 0, z: 0 }}
          scale={{ x: 0.01, y: 0.01, z: 0.01 }}
        ></SceneObject> */}
      </Canvas>
    </>
  );
}

// drag and drop object
// https://codesandbox.io/s/924xzx93ry?file=/src/index.tsx:2349-2354

{
  /*<Canvas orthographic camera={{ position: [0, 0, 5] }}>
      <Canvas camera={{ zoom: 1, position: [posCam[0], posCam[1], posCam[2]] }}>

  function Box(props: JSX.IntrinsicElements["mesh"]) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame((state, delta) => (ref.current.rotation.x += 0.01));

    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    );
  }
  */
}
