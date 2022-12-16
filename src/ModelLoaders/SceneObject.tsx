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

// --- Typen ANFANG, TODO: alle Typen hier in eigene Datei auslagern

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

// TODO: scale & rotierung hinzufügen
export type TypeCurrentObjectProps = {
  position: TypePosition;
  setPosition: (pos: TypePosition) => void;
  showWireFrame: () => void;
  showNormalTexture: () => void;
  showPivotControlAxis: (axis: TypeShowPivotAxis) => void;
  showScaleAxis: (axis: TypeScaleMode) => void;
};

// --- Typen ENDE

// Scene Objekt Komponente

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

  // zeigt x,y,z Achsen des PivotControls an, je nachdem was übergeben wird
  const showPivotControlAxis = (axis: TypeShowPivotAxis) => {
    setPivotAxis({
      x: axis.x,
      y: axis.y,
      z: axis.z,
    });
  };

  // zeigt x,y,z Achsen des TransformControls an, je nachdem was übergeben wird
  const showScaleAxis = (axis: TypeScaleMode) => {
    setScaleMode({
      x: axis.x,
      y: axis.y,
      z: axis.z,
    });
  };

  // ruft setCurrentObjProps von der Scene auf, also von dem übergeordnetem Objekt(=Scene) an
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
        activeAxes={
          showPivotAxis
            ? [showPivotAxis.x, showPivotAxis.y, showPivotAxis.z]
            : [false, false, false]
        }
        // TODO: Anchor bei 0,0,0 ist weg/nichtsichtbar ??
        //anchor={[0, 0, 0]}
      >
        <TransformControls
          mode="scale"
          showX={scaleMode.x}
          showY={scaleMode.y}
          showZ={scaleMode.z}
          // TODO: position={}
          // Transform control in center des Meshes/Objects positionieren
        >
          <mesh>
            <primitive
              onClick={() => {
                // TODO: Object markieren
                // highlightObject();

                sendCurrentObjectDataToControls();
              }}
              onPointerOver={() => {}}
              onPointerLeave={() => {
                // TODO: wireframe entfernen und normales Material des Model
              }}
              ref={refMesh}
              object={fbx.clone(true)}
              scale={[scale.x, scale.y, scale.z]}
              position={[position.x, position.y, position.z]}
            ></primitive>
          </mesh>
        </TransformControls>
      </PivotControls>
    </>
  );
}

export default SceneObject;
