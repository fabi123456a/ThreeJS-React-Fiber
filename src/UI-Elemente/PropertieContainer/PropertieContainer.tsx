import { Button, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeCurrentObjectProps } from "../../ModelLoaders/SceneObject";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

function PropertieContainer(props: { objProps: TypeCurrentObjectProps }) {
  useEffect(() => {
    //setPosXValue(props.objProps.position.x);
  }, [props.objProps]);

  return (
    <Stack>
      <Typography>
        Position x: {props.objProps ? props.objProps.position.x : null}
      </Typography>
      <Typography>
        Position y: {props.objProps ? props.objProps.position.y : null}
      </Typography>
      <Typography>
        Position z: {props.objProps ? props.objProps.position.z : null}
      </Typography>

      <Button
        onClick={() => {
          props.objProps.showWireFrame();
        }}
      >
        Test Button
      </Button>
    </Stack>
  );
}

export default PropertieContainer;
