import * as React from "react";
import Stack from "@mui/material/Stack";
import Scene from "./Scene";
import { useState } from "react";
import ModelList from "./UI-Elemente/3DModell-Liste/ModelListe";
import ObjectList, {
  BoxGeometryValue,
} from "./UI-Elemente/3DObjektListe/ObjektListe";

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<string[]>([]);

  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [boxGeos, setBoxGeos] = useState<BoxGeometryValue[]>([]);

  
  const handleModellAdd = (pfad: string) => {
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
      <Scene models={[]} objects={[]}></Scene>
    </Stack>
  );
}
