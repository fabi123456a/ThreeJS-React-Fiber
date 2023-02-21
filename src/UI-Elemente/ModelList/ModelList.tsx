import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddModelForm from "./AddModelForm";
import { ModelListItem } from "./ModelListItem";

export function ModelList(props: {
  paths: { name: string; path: string }[];
  addObject: (pfad: string) => void;
  addModel: (name: string, url: string, file: any) => void;
}) {
  return (
    <Stack direction={"column"} style={{ backgroundColor: "ligtGray" }}>
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
