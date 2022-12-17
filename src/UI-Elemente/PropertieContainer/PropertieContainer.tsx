import { Button, Divider, Grid, Slider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { TypeCurrentObjectProps } from "../../ModelLoaders/SceneObject";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

// in objProps stehen die properties des currentObjects + funktionen wie z.B showPivotControlAxis
function PropertieContainer({
  objProps,
  setObjProps,
}: {
  setObjProps: Function;
  objProps: TypeCurrentObjectProps;
}) {
  function handleChange(position: string, value: number) {
    let newPosition: any = { ...objProps.position };
    newPosition[position] = value;

    setObjProps((prev: TypeCurrentObjectProps) => {
      return {
        ...prev,
        position: newPosition,
      };
    });
  }

  if (!objProps)
    return (
      <Stack style={{ width: "20%" }}>
        <Typography fontSize="20px">No Object Selected</Typography>
      </Stack>
    );

  return (
    <Stack style={{ width: "20%" }}>
      <b>
        <Typography fontSize="20px">Properties</Typography>
      </b>
      <Stack direction={"column"}>
        <Typography>Position</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            x:
            <input
              type="number"
              style={{ width: "100%" }}
              value={objProps ? objProps.position.x : ""}
              onChange={(e) => handleChange("x", parseInt(e.target.value) || 0)}
            />
          </Grid>
          <Grid item xs={3}>
            y:
            <input
              type="number"
              style={{ width: "100%" }}
              value={objProps ? objProps.position.y : ""}
              onChange={(e) => handleChange("y", parseInt(e.target.value) || 0)}
            />
          </Grid>
          <Grid item xs={3}>
            z:
            <input
              type="number"
              style={{ width: "100%" }}
              value={objProps ? objProps.position.z : ""}
              onChange={(e) => handleChange("z", parseInt(e.target.value) || 0)}
            />
          </Grid>
        </Grid>
        <Divider
          orientation="horizontal"
          flexItem
          style={{ marginLeft: "8px", marginRight: "8px" }}
        />
        <Stack direction={"column"}>
          <Typography>Scale</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              x:
              <input
                type="number"
                style={{ width: "100%" }}
                value={objProps ? objProps.scale.x : ""}
              />
            </Grid>
            <Grid item xs={3}>
              y:
              <input
                type="number"
                style={{ width: "100%" }}
                value={objProps ? objProps.scale.y : ""}
              />
            </Grid>
            <Grid item xs={3}>
              z:
              <input
                type="number"
                style={{ width: "100%" }}
                value={objProps ? objProps.scale.z : ""}
              />
            </Grid>
          </Grid>
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
