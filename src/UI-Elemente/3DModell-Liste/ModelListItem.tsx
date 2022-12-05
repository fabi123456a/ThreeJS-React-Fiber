import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ModelAnsicht from "./ModelAnsicht";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ModelListItem(props: {
  modelName: string;
  pfad: string;
  onBtnAddClick?: (pfad: string) => void;
  onMouseEnter?: (pfad: string) => void;
}) {
  const [border, setBorder] = React.useState<boolean>(false);

  return (
    <Stack
      direction={"column"}
      onMouseEnter={() => {
        if (props.onMouseEnter) props.onMouseEnter(props.pfad);
      }}
    >
      <Stack direction={"row"}>
        <Typography variant="body2" gutterBottom>
          {props.modelName}
        </Typography>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            if (props.onBtnAddClick) props.onBtnAddClick(props.pfad);
          }}
        >
          Add
        </Button>
      </Stack>

      <Stack direction={"row"}>
        <ModelAnsicht
          onMouseEnter={() => setBorder(true)}
          onMouseLeave={() => setBorder(false)}
          pfad={props.pfad}
          style={{ height: "150px", width: "150px", border: "1px solid black" }}
        ></ModelAnsicht>
        {border ? <p>borderColor</p> : <p>none</p>}
      </Stack>
    </Stack>
  );
}


