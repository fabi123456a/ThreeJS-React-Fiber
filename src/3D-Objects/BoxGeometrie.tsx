import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  PivotControls,
  Edges,
  Html,
  TransformControls,
} from "@react-three/drei";
import { BoxGeometryValue } from "../UI-Elemente/3DObjektListe/ObjektListe";
import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";
import EditObjectHTML from "./EditObjectHTML";
import { Group, Vector3 } from "three";
import { PivotContext } from "@react-three/drei/web/pivotControls/context";

function BoxGeometrie(props: {
  // position & skalieren der Box
  geometrie: BoxGeometryValue;

  // ist die Box editierbar oder ist sie fest in der Scene drin
  editable: boolean;

  // funktionen die aufgerufen werden wenn die Box gedragged wird
  // das OrbitControl der Scene wird deaktiviert wenn man das PivotControl dragged, sonst verschiebt man und
  // dreht die Kamera gleichzeitig was sehr unpraktisch ist
  onDrag?: () => void;
  onDragEnd?: () => void;
}) {
  // ref auf das mesh der Box
  const ref = useRef<THREE.Mesh>(null);

  // ref zum pivotcontrol
  const pivot = useRef<Group>(null);

  // flag zum editieren
  const [isEditMode, setEditMode] = useState<boolean>();

  return (
    <>
      {/* wenn Editierbar dann PivotControls um das Mesh, wenn nicht dann nur das Mesh */}
      {props.editable ? (
        // PivotControll zum Verschieben & Rotieren
        <PivotControls
          ref={pivot}
          activeAxes={isEditMode ? [true, true, true] : [false, false, false]}
          lineWidth={2}
          onDrag={() => {
            if (props.onDrag) props.onDrag();
          }}
          onDragEnd={() => {
            if (props.onDragEnd) props.onDragEnd();
          }}
        >
          <TransformControls
            mode="scale"
            showX={isEditMode ? true : false}
            showY={isEditMode ? true : false}
            showZ={isEditMode ? true : false}
          >
            <mesh
              ref={ref}
              position={[
                props.geometrie.positionXYZ[0],
                props.geometrie.positionXYZ[1],
                props.geometrie.positionXYZ[2],
              ]}
            >
              <EditObjectHTML changeEditMode={setEditMode} />
              <boxBufferGeometry args={props.geometrie.scaleXYZ} />

              {/* zeichnet umrandungen */}
              <Edges />

              {/* wenn Editierbar dann nur Wireframe anzeigen, damit die sicht auf das PivotControl nicht behindert wird */}
              {isEditMode ? (
                <meshNormalMaterial wireframe />
              ) : (
                <meshNormalMaterial />
              )}
            </mesh>
          </TransformControls>
        </PivotControls>
      ) : (
        <mesh
          ref={ref}
          position={[
            props.geometrie.positionXYZ[0],
            props.geometrie.positionXYZ[1],
            props.geometrie.positionXYZ[2],
          ]}
        >
          <boxBufferGeometry args={props.geometrie.scaleXYZ} />
          <meshNormalMaterial />
        </mesh>
      )}
    </>
  );
}

export default BoxGeometrie;
