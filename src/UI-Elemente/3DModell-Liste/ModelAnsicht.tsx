import * as React from "react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import ModelGLB from "../../ModelLoaders/ModelGLB";
import { PerspectiveCamera } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei"; //https://drei.pmnd.rs/?path=/story/controls-mapcontrols--map-controls-scene-st

export default function ModelAnsicht(props: {
  style: React.CSSProperties;
  pfad: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [isOrbitControl, setIsOrbitControl] = useState<boolean>(true);

  return (
    <div style={props.style}>
      {/* Canvas nimmt größe von parent container */}
      <Canvas
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {/* Kameras */}
        <PerspectiveCamera position={[0, 1, 2]} fov={110} makeDefault={true} />

        {/* Licht */}
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {/* 3D Modell */}
        <ModelGLB
          scale={2}
          pfad={props.pfad}
          isDraggable={false}
          onDrag={() => setIsOrbitControl(false)}
          onDragEnd={() => setIsOrbitControl(true)}
        ></ModelGLB>

        {/* Scene Movement */}
        {<OrbitControls />}
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
