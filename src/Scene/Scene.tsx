import SceneModel from "../3D-Objects/SceneModel";
import Room from "../3D-Objects/Room";
import { Camera } from "./Camera";
import { useThree } from "@react-three/fiber";

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

export default function Scene(props: {
  controlsRef: React.RefObject<any>;
  models: TypeObjectProps[];
  currentObjectProps: TypeObjectProps;
  lockCamera: boolean;
  ortho: boolean;
  perspektive: string;
  setMainCurrentObjectProps: (props: TypeObjectProps) => void;
  setLockCamRotation: (flag: boolean) => void;
  roomDimensions: TypeRoomDimensions;
  sceneRef: any;
  wallVisibility: TypeWallVisibility;
}) {
  const { scene } = useThree();
  props.sceneRef.current = scene;

  return (
    <>
      {/* Canvas nimmt größe von parent container */}
      {/* Canvas richtet eine Szene & Kamera ein */}
      {/* Kamera */}
      <Camera
        controlsRef={props.controlsRef}
        lockCamera={props.lockCamera}
        orthogonal={props.ortho}
        perspektive={props.perspektive}
      ></Camera>
      {/* Licht */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* Modelle */}
      {props.models.map((model) => (
        <SceneModel
          controlsRef={props.controlsRef}
          key={model.id}
          id={model.id}
          isSelected={model.id === props.currentObjectProps?.id}
          setCurrentObjectProps={props.setMainCurrentObjectProps}
          editMode={model.editMode}
          modelPath={model.modelPath}
          showXTransform={model.showXTransform}
          showYTransform={model.showYTransform}
          showZTransform={model.showZTransform}
          position={model.position}
          scale={model.scale}
          rotation={model.rotation}
          setLockCameraRototion={props.setLockCamRotation}
          removeBoundingBox={model.removeBoundingBox}
          camPerspektive={props.perspektive}
        ></SceneModel>
      ))}
      {/* Raum */}
      <Room
        height={props.roomDimensions.height}
        width={props.roomDimensions.width}
        depth={props.roomDimensions.depth}
        leftWall={props.wallVisibility.leftWall}
        rightWall={props.wallVisibility.rightWall}
      />
    </>
  );
}
