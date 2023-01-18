import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddModelForm from "./AddModelForm";
import { ModelListItem } from "./ModelListItem";

export function ModelList(props: {
  paths: { name: string; path: string }[];
  addObject: (pfad: string) => void;
  addModel: (name: string, url: string) => void;
}) {
  return (
    <Stack direction={"column"}>
      <b>
        <Typography fontSize="20px" textAlign={"center"}>
          Modell-Liste
        </Typography>
      </b>
      {props.paths.map((path) => (
        <ModelListItem
          name={path.name}
          key={path.path}
          pfad={path.path}
          addObject={props.addObject}
        ></ModelListItem>
      ))}
      <AddModelForm addModel={props.addModel} />
    </Stack>
  );
}
