import * as React from "react";
import Stack from "@mui/material/Stack";
import ModelListItem from "./ModelListItem";

export default function ModelList(props: {
  names: string[];
  style: React.CSSProperties;
  onAdd: (pfad: string) => void;
}) {
  const [actModel, setActModel] = React.useState<string>();

  return (
    <Stack direction={"row"} style={props.style}>
      {props.names.map((item) => (
        <ModelListItem
          modelName={getNameFromPfad(item)}
          pfad={item}
          onMouseEnter={setActModel}
          onBtnAddClick={props.onAdd}
        ></ModelListItem>
      ))}
      {actModel ? <p>Ausgewählt: {actModel}</p> : <p>kein Model selektiert</p>}
    </Stack>
  );
}

function getNameFromPfad(p: string) {
  return p.split("/")[2] ? p.split("/")[2] : "x1";
}
