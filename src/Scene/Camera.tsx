import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

type TypeCamPosition = {
  topDown: THREE.Vector3;
  leftToMid: THREE.Vector3;
  rightToMid: THREE.Vector3;
  frontal: THREE.Vector3;
};

export type TypeCamPerspektive = {
  topDown: boolean;
  leftToMid: boolean;
  rightToMid: boolean;
  frontal: boolean;
};

export function Camera(props: {
  lockCamera: boolean;
  orthogonal: boolean;
  perspektive: string;
}) {
  const camera = useThree((state) => state.camera);

  const [camPos, setCamPos] = useState<TypeCamPosition>({
    topDown: new THREE.Vector3(0, 999, 0),
    leftToMid: new THREE.Vector3(-999, 0, 0),
    rightToMid: new THREE.Vector3(999, 0, 0),
    frontal: new THREE.Vector3(0, 0, 999),
  });

  return (
    <>
      {props.orthogonal ? (
        <OrthographicCamera
          position={
            props.perspektive == "1"
              ? camPos.topDown
              : props.perspektive == "2"
              ? camPos.frontal
              : props.perspektive == "3"
              ? camPos.leftToMid
              : camPos.rightToMid
          }
          zoom={20}
          makeDefault
        ></OrthographicCamera>
      ) : null}
      <OrbitControls enableRotate={props.lockCamera ? false : true} />
    </>
  );
}
