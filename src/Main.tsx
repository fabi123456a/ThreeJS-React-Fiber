import * as React from "react";
import Stack from "@mui/material/Stack";
import Scene from "./Scene";
import { useState } from "react";
import ModelList from "./UI-Elemente/3DModell-Liste/ModelListe";
import ObjectList, {
  BoxGeometryValue,
} from "./UI-Elemente/3DObjekt-Liste/ObjektListe";

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<string[]>([]);

  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [boxGeos, setBoxGeos] = useState<BoxGeometryValue[]>([]);

  const handleModelAdd = (pfad: string) => {
    setModels([...models, pfad]);
  };

  const handleBoxAdd = (geo: BoxGeometryValue) => {
    setBoxGeos([...boxGeos, geo]);
  };

  return (
    <Stack
      direction="column"
      style={{ height: "100%", background: "lightGray", overflowY: "scroll" }}
    >
      <Scene models={models} objects={boxGeos}></Scene>
      <ModelList
        onAdd={handleModelAdd}
        style={{}}
        names={[
          "/ModelsGLB/SheenChair.glb",
          "/ModelsGLB/Avocado.glb",
          "/ModelsGLB/Duck.glb",
        ]}
      ></ModelList>
      <ObjectList
        onAdd={handleBoxAdd}
        style={{}}
        boxGeometries={[{ positionXYZ: [0, 0, 0], scaleXYZ: [1, 1, 1] }]}
      ></ObjectList>
    </Stack>
  );
}
