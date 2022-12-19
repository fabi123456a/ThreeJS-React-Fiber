import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  PivotControls,
  Edges,
  Html,
  TransformControls,
} from "@react-three/drei";
import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";

import { Group, Vector3 } from "three";
import { PivotContext } from "@react-three/drei/web/pivotControls/context";

export type BoxGeometryValue = {
  positionXYZ: number[];
  scaleXYZ: number[];
};

function BoxGeometrie(props: {
  // position & skalieren der Box
  geometrie: BoxGeometryValue;
}) {
  // ref auf das mesh der Box
  const ref = useRef<THREE.Mesh>(null);

  // ref zum pivotcontrol
  const pivot = useRef<Group>(null);

  // flags zum editieren
  const [isScaleMode, setIsScaleMode] = useState<boolean>();
  const [isTranslateMode, setIsTranslateMode] = useState<boolean>();

  return (
    <>
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
    </>
  );
}

export default BoxGeometrie;
