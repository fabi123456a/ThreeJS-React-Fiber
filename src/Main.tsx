import * as React from "react";
import Stack from "@mui/material/Stack";
import Scene from "./Scene";
import { useState } from "react";
import UISlider from "./UI-Elemente/old/UISlider";
import UIRadioButtons from "./UI-Elemente/old/UIRadioButtons";
import ModelList from "./UI-Elemente/3DModell-Liste/ModelListe";
import { padding } from "@mui/system";
import ObjectList, {
  BoxGeometryValue,
} from "./UI-Elemente/3DObjektListe/ObjektListe";

export default function Main() {
  const [models, setModels] = useState<string[]>([]);
  const [boxGeos, setBoxGeos] = useState<BoxGeometryValue[]>([]);

  const handleAdd = (pfad: string) => {
    setModels([...models, pfad]);
  };

  const handleAdd2 = (geo: BoxGeometryValue) => {
    setBoxGeos([...boxGeos, geo]);
  };

  return (
    <Stack
      direction="column"
      style={{ height: "100%", background: "lightGray" }}
    >
      <Stack direction={"row"}>
        {/* Scene */}
        <Scene
          style={{
            height: "600px",
            width: "600px",
            border: "2px solid black",
            margin: "12px",
          }}
          modell={models}
          object={boxGeos}
        ></Scene>
        {/* Modelliste Elemente */}
        <Stack direction={"column"}>
          <ModelList
            names={[
              "./ModelsGLB/SheenChair.glb",
              "./ModelsGLB/Avocado.glb",
              "./ModelsGLB/2CylinderEngine.glb",
              "./ModelsGLB/Duck.glb",
            ]}
            style={{
              border: "2px solid black",
              margin: "12px",
              padding: "6px",
              background: "red",
            }}
            onAdd={handleAdd}
          ></ModelList>
        </Stack>
      </Stack>
      <Stack direction={"column"}>
        <ObjectList
          onAdd={handleAdd2}
          boxGeometries={[
            { positionXYZ: [0, 0, 0], scaleXYZ: [0.1, 3, 3] },
            { positionXYZ: [0, 0, 0], scaleXYZ: [3, 0.1, 3] },
            { positionXYZ: [0, 0, 0], scaleXYZ: [3, 3, 0.1] },
          ]}
          style={{}}
        ></ObjectList>
      </Stack>
      <button>button selin</button>
    </Stack>
  );
}
