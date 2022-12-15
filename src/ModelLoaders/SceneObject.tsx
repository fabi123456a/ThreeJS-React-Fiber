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

// gibt an welche achse bei dem Transformcontrol aktiv ist
export type TypeScaleMode = {
  x: boolean;
  y: boolean;
  z: boolean;
};

type TypeShowPivotAxis = {
  x: boolean;
  y: boolean;
  z: boolean;
};

export type TypeCurrentObjectProps = {
  position: TypePosition;
  setPosition: (pos: TypePosition) => void;
  showWireFrame: () => void;
  showNormalTexture: () => void;
  showPivotControlAxis: (axis: TypeShowPivotAxis) => void;
  showScaleAxis: (axis: TypeScaleMode) => void;
};

function SceneObject(props: {
  pfadToFBX: string;
  position: TypePosition;
  scale: TypeScale;
  setCurrentObjectProps: (props: TypeCurrentObjectProps) => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
}) {
  // lädt das FBX-Model
  const fbx: THREE.Group = useLoader(FBXLoader, props.pfadToFBX);
  // referenz auf das Mesh des FBX-Models
  const refMesh = useRef<THREE.Mesh>(null);
  // bei onPointOver speichern das das Wireframe schon da ist, weil soll nur gezeichnet werden wenn es noch nicht das ist
  const [wireframe, setWireframe] = useState<boolean>(false);

  // Staten (merhzahl von status)
  const [position, setPosition] = useState<TypePosition>(props.position);
  const [scale, setScale] = useState<TypeScale>(props.scale);
  const [showPivotAxis, setPivotAxis] = useState<TypeShowPivotAxis>({
    x: false,
    y: false,
    z: false,
  });
  const [scaleMode, setScaleMode] = useState<TypeScaleMode>({
    x: false,
    y: false,
    z: false,
  });

  useEffect(() => {
    setPosition(props.position);
  }, [props.position]);

  const showWireframe = () => {
    let wirefremaMaterial = new THREE.MeshStandardMaterial({
      wireframe: true,
    });

    fbx.children.forEach((mesh, i) => {
      if (mesh instanceof THREE.Mesh) {
        mesh.material = wirefremaMaterial;
      }
    });

    setWireframe(true);
  };

  const showNormalTexture = () => {
    // TODO
    alert(
      "TODO: Normale Texture anzeigen (Wireframe entfernen und Standard Material wieder setzen)"
    );
  };

  const showPivotControlAxis = (axis: TypeShowPivotAxis) => {
    setPivotAxis({
      x: axis.x,
      y: axis.y,
      z: axis.z,
    });
  };

  const showScaleAxis = (axis: TypeScaleMode) => {
    setScaleMode({
      x: axis.x,
      y: axis.y,
      z: axis.z,
    });
  };

  const sendCurrentObjectDataToControls = () => {
    let v: Vector3 = new Vector3();
    refMesh.current?.getWorldPosition(v);

    props.setCurrentObjectProps({
      position: { x: v.x, y: v.y, z: v.z },
      setPosition: setPosition,
      showWireFrame: showWireframe,
      showNormalTexture: showNormalTexture,
      showPivotControlAxis: showPivotControlAxis,
      showScaleAxis: showScaleAxis,
    });
  };

  return (
    <>
      <PivotControls
        onDrag={() => {
          sendCurrentObjectDataToControls();
        }}
        lineWidth={2}
        // TODO PivotControl anzeigen geht nicht mehr
        activeAxes={
          showPivotAxis
            ? [showPivotAxis.x, showPivotAxis.y, showPivotAxis.z]
            : [false, false, false]
        }
        //anchor={[0, 0, 0]}
      >
        <TransformControls
          mode="scale"
          showX={scaleMode.x}
          showY={scaleMode.y}
          showZ={scaleMode.z}
          // TODO position={}
          // Transform control in center des Meshes/Objects positionieren
        >
          <primitive
            onClick={() => {
              sendCurrentObjectDataToControls();
            }}
            onPointerOver={() => {}}
            onPointerLeave={() => {
              // TODO wireframe entfernen und normales Material des Model
            }}
            ref={refMesh}
            object={fbx.clone(true)}
            scale={[scale.x, scale.y, scale.z]}
            position={[position.x, position.y, position.z]}
          ></primitive>
        </TransformControls>
      </PivotControls>
    </>
  );
}

export default SceneObject;
