import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export function ModelListItem(props: {
  pfad: string;
  addObject: (pfad: string) => void;
}) {
  return (
    <Stack style={{ margin: "8px" }}>
      <Button onClick={() => props.addObject(props.pfad)} variant="outlined">
        {getNameFromPfad(props.pfad)}
      </Button>
    </Stack>
  );
}

function getNameFromPfad(p: string) {
  return p.split("/")[2] ? p.split("/")[2].split(".")[0] : "xx";
}
