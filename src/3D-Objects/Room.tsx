import React from "react";
import BoxGeometrie from "./BoxGeometrie";

export default function Room({
  height,
  width,
  depth,
}: {
  height: number;
  width: number;
  depth: number;
}) {
  return (
    <>
      {/* Raum */} {/* TODO: eigene Komponete für den Raum */}
      {/* Boden */}
      <BoxGeometrie
        geometrie={{ positionXYZ: [0, 0, 0], scaleXYZ: [width, 0.001, depth] }}
      ></BoxGeometrie>
      {/* Wand Links */}
      <BoxGeometrie
        geometrie={{
          positionXYZ: [-width / 2, height / 2, 0],
          scaleXYZ: [0.001, height, depth],
        }}
      ></BoxGeometrie>
      {/* Wand Rechts */}
      <BoxGeometrie
        geometrie={{
          positionXYZ: [width / 2, height / 2, 0],
          scaleXYZ: [0.001, height, depth],
        }}
      ></BoxGeometrie>
      {/* Wand Hinten */}
      <BoxGeometrie
        geometrie={{
          positionXYZ: [0, height / 2, -depth / 2],
          scaleXYZ: [width, height, 0.001],
        }}
      ></BoxGeometrie>
    </>
  );
}
