import * as React from "react";
import Stack from "@mui/material/Stack";
import ObjectListItem from "./ObjektListItem";

export type BoxGeometryValue = {
  positionXYZ: number[];
  scaleXYZ: number[];
};

export default function ObjectList(props: {
  boxGeometries: Array<BoxGeometryValue>;
  style: React.CSSProperties;
  onAdd: (geo: BoxGeometryValue) => void;
}) {
  const [actModel, setActModel] = React.useState<string>();

  return (
    <Stack style={props.style} direction="row">
      {props.boxGeometries.map((item: BoxGeometryValue) => (
        <ObjectListItem
          geometrie={item}
          onBtnAddClick={props.onAdd}
        ></ObjectListItem>
      ))}
      {actModel ? <p>{actModel}</p> : <p>kein Model selektiert</p>}
    </Stack>
  );
}
