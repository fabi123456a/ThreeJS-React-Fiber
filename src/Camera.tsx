import { OrbitControls, OrthographicCamera } from "@react-three/drei";

export function Camera(props: { lockCamera: boolean }) {
  return (
    <>
      <OrbitControls
        makeDefault
        enableRotate={props.lockCamera ? false : true}
      />
    </>
  );
}
