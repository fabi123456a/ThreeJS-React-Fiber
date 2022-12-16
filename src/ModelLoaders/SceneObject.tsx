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
import { useGesture } from "react-use-gesture";

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

// TODO: wird noch nicht verwendet
enum TypeEditMode {
  translate = "translate", // verschieben
  scale = "scale", // scalieren
  rotation = "rotate", // rotieren
}

// TODO: scale & rotierung hinzufügen
// das ist quasi die schnittstelle zum currentObject
export type TypeCurrentObjectProps = {
  position: TypePosition;
  setPosition: (pos: TypePosition) => void;
  scale: TypeScale;
  setScale: (scale: TypeScale) => void;
  showTransformControlAxis: (axis: TypeScaleMode) => void;
  setEditMode: (mode: "scale" | "translate" | "rotate" | undefined) => void;
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

  // useStates der Komponete SceneObject
  const [position, setPosition] = useState<TypePosition>(props.position);
  const [scale, setScale] = useState<TypeScale>(props.scale);
  const [editMode, setEditMode] = useState<
    "scale" | "translate" | "rotate" | undefined
  >("scale");
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

  // wenn properties am anfang reinkommen, direkt in status speichern
  useEffect(() => {
    setPosition(props.position);
  }, [props.position]);

  // zeigt x,y,z Achsen des PivotControls an, je nachdem was übergeben wird
  const showPivotControlAxis = (axis: TypeShowPivotAxis) => {
    setPivotAxis({
      x: axis.x,
      y: axis.y,
      z: axis.z,
    });
  };

  // zeigt x,y,z Achsen des TransformControls an, je nachdem was übergeben wird
  const showTransformAxis = (axis: TypeScaleMode) => {
    setScaleMode({
      x: axis.x,
      y: axis.y,
      z: axis.z,
    });
  };

  // zeigt x,y,z Achsen des TransformControls an, je nachdem was übergeben wird
  const setTransformControlEditMode = (
    mode: "scale" | "translate" | "rotate" | undefined
  ) => {
    setEditMode(mode);
  };

  // ruft setCurrentObjProps von der Scene auf, also von dem übergeordnetem Objekt(=Scene) an
  const sendCurrentObjectDataToControls = () => {
    // position des Objects als Vektor3
    let vectorPosition: Vector3 = new Vector3();
    refMesh.current?.getWorldPosition(vectorPosition);

    // skalierung des Objects als Vektor3
    let vektorScale: Vector3 = new Vector3();
    refMesh.current?.getWorldScale(vektorScale);

    // objekt {...} welches die Schnittstelle zu der SceneKmponente ist. Enthält Position...
    // aber auch funktion die den Status ändern, z.B setScale, setPosition
    props.setCurrentObjectProps({
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
      setPosition: setPosition,
      setScale: setScale,
      showTransformControlAxis: showTransformAxis,
      setEditMode: setTransformControlEditMode,
    });
  };

  const transform112 = useRef<any>();

  useEffect(() => {
    if (transform112.current) {
      const controls = transform112.current;
      const callback = () => {
        //sendCurrentObjectDataToControls();
        // console.log("dragged");
        alert("dragged");
      };

      controls.addEventListener("onPointerMove", callback);
      //return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

  return (
    <>
      <TransformControls
        ref={transform112}
        mode={editMode}
        showX={scaleMode.x}
        showY={scaleMode.y}
        showZ={scaleMode.z}
        onMouseUp={() => {
          //sendCurrentObjectDataToControls();
          // https://codesandbox.io/s/r3f-drei-transformcontrols-hc8gm?file=/src/index.js
        }}
        // TODO: position={}
        // Transform control in center des Meshes/Objects positionieren
      >
        {/* FBX-Model  */}
        <primitive
          onMouseUp={() => {
            //sendCurrentObjectDataToControls();
          }}
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
      </TransformControls>
    </>
  );
}

export default SceneObject;

/*
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
*/
