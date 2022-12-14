import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ModelListItem } from "./ModelListItem";

export function ModelList(props: {
  paths: string[];
  addObject: (pfad: string) => void;
}) {
  return (
    <Stack direction={"column"}>
      <b>
        <Typography fontSize="20px" textAlign={"center"}>
          Modell-Liste
        </Typography>
      </b>
      {props.paths.map((pfad: string) => (
        <ModelListItem
          key={pfad}
          pfad={pfad}
          addObject={props.addObject}
        ></ModelListItem>
      ))}
    </Stack>
  );
}
