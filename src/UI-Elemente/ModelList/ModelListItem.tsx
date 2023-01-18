import { Button } from "@mui/material";
import { Stack } from "@mui/system";

export function ModelListItem(props: {
  name: string;
  pfad: string;
  addObject: (pfad: string) => void;
}) {
  return (
    <Stack style={{ margin: "8px" }}>
      <Button onClick={() => props.addObject(props.pfad)} variant="outlined">
        {props.name}
      </Button>
    </Stack>
  );
}
