import React, { useRef, useState } from "react";
import { Button } from "@mui/material";

export default function AddModelForm({
  addModel,
}: {
  addModel: (name: string, path: string) => void;
}) {
  const modelFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");

  return (
    <>
      <input
        ref={modelFileRef}
        onChange={(e) => {
          if (e.target.files) {
            name && addModel(name, URL.createObjectURL(e.target.files[0]));
          }
        }}
        type="file"
        style={{ display: "none" }}
      />
      <Button
        variant="outlined"
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
        Add Model
      </Button>
    </>
  );
}
