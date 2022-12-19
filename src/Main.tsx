import * as React from "react";
import Stack from "@mui/material/Stack";
import Scene from "./Scene";
import { useState, useEffect } from "react";
import ModelList from "./UI-Elemente/3DModell-Liste/ModelListe";
import ObjectList, {
  BoxGeometryValue,
} from "./UI-Elemente/3DObjekt-Liste/ObjektListe";
import { Divider, Typography } from "@mui/material";
import PropertieContainer from "./UI-Elemente/PropertieContainer/PropertieContainer";
import { TypeObjectProps } from "./ModelLoaders/SceneObject";
import ToolBar from "./UI-Elemente/ToolBar/ToolBar";

export default function Main() {
  // beinhaltet alle 3D-Modelle die in der Scene vorhanden sind
  const [models, setModels] = useState<string[]>([]);

  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [boxGeos, setBoxGeos] = useState<BoxGeometryValue[]>([]);

  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [currentObjectProps, setMainCurrentObjectProps] =
    useState<TypeObjectProps>(null!);

  // beinhaltet alle Box-Geometrien (Wände, Boden, ...) die in der Scene vorhanden sind
  const [frontalView, setFrontalView] = useState<boolean>(false);

  const handleModelAdd = (pfad: string) => {
    setModels([...models, pfad]);
  };

  return (
    <Stack
      direction="row"
      style={{ height: "100%", background: "lightGray", overflowY: "auto" }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Stack
        direction="column"
        style={{
          height: "100%",
          width: "100%",
          background: "lightGray",
        }}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <ToolBar
          objProps={currentObjectProps}
          setObjProps={setMainCurrentObjectProps}
          setFrontalView={() => {
            setFrontalView(!frontalView);
          }}
        ></ToolBar>
        <Scene
          currentObjectProps={currentObjectProps}
          setMainCurrentObjectProps={setMainCurrentObjectProps}
          models={models}
          objects={boxGeos}
          frontalView={frontalView}
        ></Scene>
      </Stack>

      <PropertieContainer
        objProps={currentObjectProps}
        setObjProps={setMainCurrentObjectProps}
      ></PropertieContainer>
    </Stack>
  );
}
