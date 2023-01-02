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

type TypeCamPerspektive = {
  topDown: boolean;
  leftToMid: boolean;
  rightToMid: boolean;
  frontal: boolean;
};

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

export default function Scene(props: {
  models: TypeObjectProps[];
  currentObjectProps: TypeObjectProps;
  lockCamera: boolean;
  ortho: boolean;
  perspektive: string;
  setMainCurrentObjectProps: (props: TypeObjectProps) => void;
  setLockCamRotation: (flag: boolean) => void;
}) {
  return (
    <>
      {/* Canvas nimmt größe von parent container */}
      {/* Canvas richtet eine Szene & Kamera ein */}
      <Canvas>
        {/* Kamera */}
        <Camera
          lockCamera={props.lockCamera}
          orthogonal={props.ortho}
          perspektive={props.perspektive}
        ></Camera>
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
            setLockCameraRototion={props.setLockCamRotation}
            removeBoundingBox={model.removeBoundingBox}
          ></SceneModel>
        ))}
        {/* Raum */}
        <Room height={3} width={30} depth={30} />
      </Canvas>
    </>
  );
}
