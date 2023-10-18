import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/model/LamaGlama.glb");
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  useEffect(() => {
    if (gltf && gltf.scene) {
      const bbox = new Box3().setFromObject(gltf.scene);
      const cent = bbox.getCenter(new Vector3());
      const size = bbox.getSize(new Vector3());

      const maxAxis = Math.max(size.x, size.y, size.z);
      gltf.scene.scale.multiplyScalar(10.0 / maxAxis);
      bbox.setFromObject(gltf.scene);

      gltf.scene.position.copy(cent).multiplyScalar(-1);
    }
  }, [gltf]);

  return <primitive object={gltf.scene} ref={mesh} />;
};

const VicugnaModel = () => {
  return (
    <div id="canvas-container">
      <Canvas
        style={{ height: "100vh" }}
        camera={{ position: [10, 5, 10] }}
        antialias="true"
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={150} />
        <spotLight position={[10, 10, 5]} lookAt={[0, 0, 0]} intensity={300} />
        <Model />
      </Canvas>
    </div>
  );
};

export default VicugnaModel;
