import { Button, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { TypeObjectProps } from "../../3D-Objects/SceneModel";
import { TypeRoomDimensions } from "../../Scene/Scene";

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
      <Stack direction={"column"}>
        <Typography fontSize="20px">Room</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            width:
            <input
              type="number"
              style={{ width: "100%" }}
              value={roomDimensions ? roomDimensions.width : ""}
              step="0.01"
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
            height:
            <input
              type="number"
              style={{ width: "100%" }}
              value={roomDimensions ? roomDimensions.height : ""}
              step="0.01"
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
            depth:
            <input
              type="number"
              style={{ width: "100%" }}
              value={roomDimensions ? roomDimensions.depth : ""}
              step="0.01"
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
        <Stack direction={"column"}>
          <Typography fontSize="20px">Selected Object</Typography>
          <Typography>Position</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              x:
              <input
                type="number"
                style={{ width: "100%" }}
                value={objProps ? objProps.position.x : ""}
                step="0.01"
                onChange={(e) =>
                  handlePositionChange("x", parseFloat(e.target.value) || 0)
                }
              />
            </Grid>
            <Grid item xs={4}>
              y:
              <input
                type="number"
                style={{ width: "100%" }}
                value={objProps ? objProps.position.y : ""}
                step="0.01"
                onChange={(e) =>
                  handlePositionChange("y", parseFloat(e.target.value) || 0)
                }
              />
            </Grid>
            <Grid item xs={4}>
              z:
              <input
                type="number"
                style={{ width: "100%" }}
                value={objProps ? objProps.position.z : ""}
                step="0.01"
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
                width:
                <input
                  type="number"
                  style={{ width: "100%" }}
                  value={objProps ? objProps.scale.x : ""}
                  step="0.01"
                  onChange={(e) =>
                    handleScaleChange("x", parseFloat(e.target.value) || 0)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                height:
                <input
                  type="number"
                  style={{ width: "100%" }}
                  value={objProps ? objProps.scale.y : ""}
                  step="0.01"
                  onChange={(e) =>
                    handleScaleChange("y", parseFloat(e.target.value) || 0)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                depth:
                <input
                  type="number"
                  style={{ width: "100%" }}
                  value={objProps ? objProps.scale.z : ""}
                  step="0.01"
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
