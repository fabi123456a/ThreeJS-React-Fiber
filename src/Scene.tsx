import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import ModelGLB from "./ModelLoaders/ModelGLB";
import BoxGeometrie from "./3D-Objects/BoxGeometrie";
import {
  PerspectiveCamera,
  OrthographicCamera,
  MapControls,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei"; //https://drei.pmnd.rs/?path=/story/controls-mapcontrols--map-controls-scene-st
import { BoxGeometryValue } from "./UI-Elemente/3DObjektListe/ObjektListe";

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

export default function Scene(props: {
  models: string[];
  objects: BoxGeometryValue[];
}) {
  // orbitControl wird deaktiviert wenn ein Objekt via pivotControl verschoben wird
  // damit die sich die Camera nicht mitdreht beim verschieben
  const [isOrbitControl, setIsOrbitControl] = useState<boolean>(true);

  return (
    <>
      {/* Canvas nimmt größe von parent container */}
      {/* Canvas richtet eine Szene & Kamera ein */}
      <Canvas>
        {/* Licht */}
        <ambientLight />
        {/* Modelle die durch + Add eingfügt wurden  */}
        {props.models.map((pfad) => (
          <ModelGLB
            scale={1}
            pfad={pfad}
            isDraggable={true}
            onDrag={() => setIsOrbitControl(false)}
            onDragEnd={() => setIsOrbitControl(true)}
          ></ModelGLB>
        ))}
        {/* Objekte die durch + Add eingfügt wurden  */}
        {props.objects.map((geometrie: BoxGeometryValue) => (
          <BoxGeometrie
            geometrie={geometrie}
            editable={true}
            onDrag={() => setIsOrbitControl(false)}
            onDragEnd={() => setIsOrbitControl(true)}
          ></BoxGeometrie>
        ))}
        {/* testen */}
        <BoxGeometrie
          geometrie={{ positionXYZ: [0, 0, 0], scaleXYZ: [1, 1, 1] }}
          editable={true}
          onDrag={() => setIsOrbitControl(false)}
          onDragEnd={() => setIsOrbitControl(true)}
        ></BoxGeometrie>
        <ModelGLB
          scale={1}
          isDraggable={true}
          pfad={"/ModelsGLB/SheenChair.glb"}
        ></ModelGLB>
        {/* Raum */} {/* TODO: eigene Komponete für den Raum */}
        {/* Boden */}
        <BoxGeometrie
          geometrie={{ positionXYZ: [0, 0, 0], scaleXYZ: [7, 0.001, 7] }}
          editable={false}
        ></BoxGeometrie>
        {/* Wand Links */}
        <BoxGeometrie
          geometrie={{ positionXYZ: [-3.5, 1.5, 0], scaleXYZ: [0.001, 3, 7] }}
          editable={false}
        ></BoxGeometrie>
        {/* Wand Rechts */}
        <BoxGeometrie
          geometrie={{ positionXYZ: [3.5, 1.5, 0], scaleXYZ: [0.001, 3, 7] }}
          editable={false}
        ></BoxGeometrie>
        {/* Wand Hinten */}
        <BoxGeometrie
          geometrie={{ positionXYZ: [0, 1.5, -3.5], scaleXYZ: [7, 3, 0.001] }}
          editable={false}
        ></BoxGeometrie>
        {/* Scene Movement */}
        {isOrbitControl ? <OrbitControls makeDefault /> : null}
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
