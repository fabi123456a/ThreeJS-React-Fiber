import { Stack } from "@mui/system";
import AddModelForm from "./AddModelForm";
import { ModelListItem } from "./ModelListItem";

export function ModelList(props: {
  paths: { name: string; path: string }[];
  addObject: (pfad: string) => void;
  addModel: (name: string, url: string, file: any) => void;
}) {
  return (
    <Stack style={{ overflowY: "scroll" }}>
      <Stack direction={"column"} style={{ overflowY: "scroll" }}>
        {props.paths.map((path) => (
          <ModelListItem
            name={path.name}
            key={path.path}
            pfad={path.path}
            addObject={props.addObject}
          ></ModelListItem>
        ))}
      </Stack>
      <AddModelForm addModel={props.addModel} />
    </Stack>
  );
}
