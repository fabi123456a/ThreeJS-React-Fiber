import { Object3D } from "three";
import * as THREE from "three";
import { GLTFExporter } from "three-stdlib";

export default function exportToGLTF(scene: Object3D) {
  const gltfExporter = new GLTFExporter();
  const options = {
    binary: false,
  };
  gltfExporter.parse(
    scene,
    function (result) {
      if (result instanceof ArrayBuffer) {
        saveArrayBuffer(result, "scene.glb");
      } else {
        const output = JSON.stringify(result, null, 2);
        saveString(output, "scene.gltf");
      }
    },
    options
  );
}

const link = document.createElement("a");
document.body.appendChild(link);

function save(blob: Blob, filename: string) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveString(text: string, filename: string) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function saveArrayBuffer(buffer: any, filename: string) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}
