import React, { useRef } from "react";
import { Button } from "@mui/material";

export default function AddModelForm({ addModel }: { addModel: Function }) {
  const modelFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={modelFileRef}
        onChange={(e) => {
          if (e.target.files) {
            addModel(URL.createObjectURL(e.target.files[0]));
          }
        }}
        type="file"
        style={{ display: "none" }}
      />
      <Button variant="outlined" onClick={() => modelFileRef.current?.click()}>
        Add Model
      </Button>
    </>
  );
}
