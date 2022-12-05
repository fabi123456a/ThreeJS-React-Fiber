import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import ModelGLB from "./ModelLoaders/ModelGLB";
import Cube from "./3D-Objects/Cube";
import {
  PerspectiveCamera,
  OrthographicCamera,
  MapControls,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei"; //https://drei.pmnd.rs/?path=/story/controls-mapcontrols--map-controls-scene-st
import { BoxGeometryValue } from "./UI-Elemente/3DObjektListe/ObjektListe";

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

export default function Scene(props: {
  style: React.CSSProperties;
  modell: string[];
  object: BoxGeometryValue[];
}) {
  // orbitControl wird deaktiviert wenn ein Objekt via pivotControl verschoben wird
  // damit die sich die Camera nicht mitdreht beim bewegen
  const [isOrbitControl, setIsOrbitControl] = useState<boolean>(true);

  return (
    <div style={props.style}>
      {/* Canvas nimmt größe von parent container */}
      <Canvas>
        {/* Licht */}
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {/* ein 3D Modell als Test 
        <ModelGLB
          scale={1}
          pfad="./ModelsGLB/SheenChair.glb"
          isDraggable={true}
          onDrag={() => setIsOrbitControl(false)}
          onDragEnd={() => setIsOrbitControl(true)}
        ></ModelGLB>*/}

        {/* Modelle die durch + Add eingfügt wurden  */}
        {props.modell.map((pfad) => (
          <ModelGLB
            scale={1}
            pfad={pfad}
            isDraggable={true}
            onDrag={() => setIsOrbitControl(false)}
            onDragEnd={() => setIsOrbitControl(true)}
          ></ModelGLB>
        ))}

        {/* Objekte die durch + Add eingfügt wurden  */}
        {props.object.map((geometrie: BoxGeometryValue) => (
          <Cube
            geometrie={geometrie}
            verschiebbar={true}
            onDrag={() => setIsOrbitControl(false)}
            onDragEnd={() => setIsOrbitControl(true)}
          ></Cube>
        ))}

        {/* Boden */}
        <Cube
          verschiebbar={false}
          geometrie={{ positionXYZ: [0, 0, 0], scaleXYZ: [7, 0.01, 7] }}
        ></Cube>

        {/* Scene Movement */}
        {isOrbitControl ? <OrbitControls /> : null}
      </Canvas>
    </div>
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
