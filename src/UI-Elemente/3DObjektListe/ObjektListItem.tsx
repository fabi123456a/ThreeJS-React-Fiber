import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { BoxGeometryValue } from "./ObjektListe";
import BoxGeometrie from "../../3D-Objects/BoxGeometrie";
import ObjektAnsicht from "./ObjektAnsicht";

export default function ObjectListItem(props: {
  geometrie: BoxGeometryValue;
  onBtnAddClick?: (pfad: BoxGeometryValue) => void;
  onMouseEnter?: (pfad: BoxGeometryValue) => void;
}) {
  const [border, setBorder] = React.useState<boolean>(false);

  return (
    <Stack
      direction={"column"}
      onMouseEnter={() => {
        if (props.onMouseEnter) props.onMouseEnter(props.geometrie);
      }}
    >
      <Stack direction={"row"}>
        <Typography variant="body2" gutterBottom>
          {"xName"}
        </Typography>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            if (props.onBtnAddClick) props.onBtnAddClick(props.geometrie);
          }}
        >
          Add
        </Button>
      </Stack>

      <Stack direction={"row"}>
        <ObjektAnsicht
          style={{ height: "150px", width: "150px", border: "1px solid black" }}
          geometrie={props.geometrie}
        ></ObjektAnsicht>
        {border ? <p>borderColor</p> : <p>none</p>}
      </Stack>
    </Stack>
  );
}
