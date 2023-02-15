import React, { useRef, useState } from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddModelForm({
  addModel,
}: {
  addModel: (name: string, path: string) => void;
}) {
  const modelFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");

  const whitelistedFileTypes = ["fbx"];

  return (
    <>
      <input
        ref={modelFileRef}
        onChange={(e) => {
          if (e.target.files) {
            if (
              !whitelistedFileTypes.includes(
                e.target.files[0].name
                  .split(".")
                  .reverse()[0]
                  .toLocaleLowerCase()
              )
            ) {
              alert(
                `Only Files with extension "${whitelistedFileTypes.toString()}" are allowed`
              );
              return;
            }
            name && addModel(name, URL.createObjectURL(e.target.files[0]));
          }
        }}
        type="file"
        style={{ display: "none" }}
      />

      <Button
        color="success"
        variant="contained"
        style={{ margin: "4px" }}
        onClick={() => {
          const name = window.prompt("Model Name", "");
          if (!name) {
            alert("Please add a Name");
            return;
          }
          setName(name ?? "");
          modelFileRef.current?.click();
        }}
      >
        <AddIcon></AddIcon>
      </Button>
    </>
  );
}
