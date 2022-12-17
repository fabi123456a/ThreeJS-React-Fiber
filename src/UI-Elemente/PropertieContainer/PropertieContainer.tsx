import { Button, Divider, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeCurrentObjectProps } from "../../ModelLoaders/SceneObject";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

// in objProps stehen die properties des currentObjects + funktionen wie z.B showPivotControlAxis
function PropertieContainer(props: { objProps: TypeCurrentObjectProps }) {
  return (
    <Stack style={{ width: "20%" }}>
      <b>
        <Typography>PropertieContainer</Typography>
      </b>
      <Stack direction={"row"}>
        <Stack direction={"column"}>
          <Typography>
            Position x: {props.objProps ? props.objProps.position.x : null}
          </Typography>
          <Typography>
            Position y: {props.objProps ? props.objProps.position.y : null}
          </Typography>
          <Typography>
            Position z: {props.objProps ? props.objProps.position.z : null}
          </Typography>
        </Stack>
        <Divider
          orientation="vertical"
          flexItem
          style={{ marginLeft: "8px", marginRight: "8px" }}
        />
        <Stack direction={"column"}>
          <Typography>
            Scale x: {props.objProps ? props.objProps.scale.x : null}
          </Typography>
          <Typography>
            Scale y: {props.objProps ? props.objProps.scale.y : null}
          </Typography>
          <Typography>
            Scale z: {props.objProps ? props.objProps.scale.z : null}
          </Typography>
        </Stack>
      </Stack>

      <Typography fontSize={8}>
        Wird bis jetzt nur aktuallisiert wenn man auf das Object klickt. Die
        Daten bei onDrag weiterleiten geht (noch) irgendwie nicht. Also nach dem
        Draggen nochmal anklicken, erst dann wird es aktuallisiert und auch dann
        erst kommen die neuen Daten.
      </Typography>
      <Button variant="outlined" onClick={() => {}}>
        Test Button
      </Button>
    </Stack>
  );
}

export default PropertieContainer;
