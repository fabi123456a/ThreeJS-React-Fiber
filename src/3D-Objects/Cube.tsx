import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PivotControls, Edges, Html } from "@react-three/drei";
import { BoxGeometryValue } from "../UI-Elemente/3DObjektListe/ObjektListe";
import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";

function Ground(props: {
  geometrie: BoxGeometryValue;
  verschiebbar: boolean;
  onDrag?: () => void;
  onDragEnd?: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [sliderValueX, setSliderValueX] = useState<number>(
    props.geometrie.scaleXYZ[0]
  );
  const [sliderValueY, setSliderValueY] = useState<number>(
    props.geometrie.scaleXYZ[1]
  );
  const [geo, setGeo] = useState<BoxGeometryValue>(props.geometrie);

  return (
    <>
      {props.verschiebbar ? (
        <PivotControls
          activeAxes={edit ? [false, false, false] : [true, true, true]}
          onDrag={() => {
            if (props.onDrag) props.onDrag();
          }}
          onDragEnd={() => {
            if (props.onDragEnd) props.onDragEnd();
          }}
        >
          <mesh
            ref={ref}
            position={[
              geo.positionXYZ[0],
              geo.positionXYZ[1],
              geo.positionXYZ[2],
            ]}
          >
            <boxBufferGeometry args={geo.scaleXYZ} />
            <Edges />

            {edit ? <meshNormalMaterial /> : <meshNormalMaterial wireframe />}

            <Html>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p style={{ fontSize: "8px" }}>Edit</p>
                <input
                  type={"checkbox"}
                  onClick={() => {
                    setEdit(!edit);
                  }}
                ></input>
              </div>
              {edit ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <label>x: </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      value={sliderValueX}
                      onChange={(event) => {
                        setGeo({
                          positionXYZ: props.geometrie.positionXYZ,
                          scaleXYZ: [
                            parseInt(event.target.value),
                            props.geometrie.scaleXYZ[1],
                            props.geometrie.scaleXYZ[2],
                          ],
                        });
                        setSliderValueX(parseInt(event.target.value));
                        if (props.onDrag) props.onDrag();
                      }}
                      onMouseLeave={() => {
                        if (props.onDragEnd) props.onDragEnd();
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <label>y: </label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      value={sliderValueY}
                      onChange={(event) => {
                        setGeo({
                          positionXYZ: props.geometrie.positionXYZ,
                          scaleXYZ: [
                            props.geometrie.scaleXYZ[0],
                            parseInt(event.target.value),
                            props.geometrie.scaleXYZ[2],
                          ],
                        });
                        setSliderValueY(parseInt(event.target.value));
                        if (props.onDrag) props.onDrag();
                      }}
                      onMouseLeave={() => {
                        if (props.onDragEnd) props.onDragEnd();
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </Html>
          </mesh>
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

export default Ground;
/*
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
    </mesh>*/
