import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { TypeObjectProps } from "../../3D-Objects/SceneModel";
import { TypeRoomDimensions } from "../../Scene/Scene";
import NumberInput from "./NumberInput";

// https://mui.com/material-ui/react-typography/#main-content
// links oben auf die 2 Striche klicken,
// dann sieht man alle Komponenten, mit beispielen, von MUI die man verwenden kann

// in objProps stehen die properties des currentObjects + funktionen wie z.B showPivotControlAxis
function PropertieContainer({
  objProps,
  setObjProps,
  roomDimensions,
  setRoomDimensions,
}: {
  setObjProps: Function;
  objProps: TypeObjectProps;
  roomDimensions: TypeRoomDimensions;
  setRoomDimensions: Function;
}) {
  function handlePositionChange(position: string, value: number) {
    let newPosition: any = { ...objProps.position };
    newPosition[position] = value;

    setObjProps((prev: TypeObjectProps) => {
      return {
        ...prev,
        position: newPosition,
      };
    });
  }

  function handleScaleChange(position: string, value: number) {
    let newScale: any = { ...objProps.scale };
    newScale[position] = value;

    setObjProps((prev: TypeObjectProps) => {
      return {
        ...prev,
        scale: newScale,
      };
    });
  }

  return (
    <Stack style={{ width: "20%", gap: "1rem" }}>
      <b>
        <Typography fontSize="20px" textAlign={"center"}>
          Properties
        </Typography>
      </b>
      <Stack direction={"column"} gap="0.5rem" padding="0.5rem">
        <Typography fontSize="20px">Room</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <NumberInput
              label="width"
              value={roomDimensions ? roomDimensions.width : ""}
              onChange={(e) =>
                setRoomDimensions((prev: TypeRoomDimensions) => {
                  return {
                    ...prev,
                    width: e.target.value,
                  };
                })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <NumberInput
              label="height"
              value={roomDimensions ? roomDimensions.height : ""}
              onChange={(e) =>
                setRoomDimensions((prev: TypeRoomDimensions) => {
                  return {
                    ...prev,
                    height: e.target.value,
                  };
                })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <NumberInput
              label="depth"
              value={roomDimensions ? roomDimensions.depth : ""}
              onChange={(e) =>
                setRoomDimensions((prev: TypeRoomDimensions) => {
                  return {
                    ...prev,
                    depth: e.target.value,
                  };
                })
              }
            />
          </Grid>
        </Grid>
      </Stack>
      <Divider />
      {objProps ? (
        <Stack direction={"column"} padding="0.5rem">
          <Typography fontSize="20px">Selected Object</Typography>
          <Typography>Position</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <NumberInput
                label="x"
                value={objProps ? objProps.position.x : ""}
                onChange={(e) =>
                  handlePositionChange("x", parseFloat(e.target.value) || 0)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                label="y"
                value={objProps ? objProps.position.y : ""}
                onChange={(e) =>
                  handlePositionChange("y", parseFloat(e.target.value) || 0)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                label="z"
                value={objProps ? objProps.position.z : ""}
                onChange={(e) =>
                  handlePositionChange("z", parseFloat(e.target.value) || 0)
                }
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
              <Grid item xs={4}>
                <NumberInput
                  label="width"
                  value={objProps ? objProps.scale.x : ""}
                  onChange={(e) =>
                    handleScaleChange("x", parseFloat(e.target.value) || 0)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  label="height"
                  value={objProps ? objProps.scale.y : ""}
                  onChange={(e) =>
                    handleScaleChange("y", parseFloat(e.target.value) || 0)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  label="depth"
                  value={objProps ? objProps.scale.z : ""}
                  onChange={(e) =>
                    handleScaleChange("z", parseFloat(e.target.value) || 0)
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
}

export default PropertieContainer;
