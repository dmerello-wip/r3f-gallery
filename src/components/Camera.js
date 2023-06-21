import {useRef, forwardRef} from "react";
import {PerspectiveCamera, OrbitControls} from '@react-three/drei';

const Camera = ({position}, ref) => {


  return (
    <>
    <PerspectiveCamera castShadow
      ref={ref}
      position={position}
      makeDefault={true}
    />
    {/*<OrbitControls camera={myCamera.current}/>*/}
    </>
  );
};

export default forwardRef(Camera);

