import {useEffect, useRef, useState, useMemo} from 'react';
import {Box, Html} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

const Work = ({position, initialRotation, picture, slug, title, clickHandler}) => {

  const baseSize = [1, 1, 0.02];

  const horizontalFormatBaseWidth = 1.8;
  const verticalFormatBaseWidth = 1.1;
  const workMesh = useRef();
  const [btnOpacity, setBtnOpacity] = useState(0);
  const [size, setSize] = useState(baseSize);
  const [hovered, setHovered] = useState(false);
  const absolutePositionInWorld = new THREE.Vector3();
  const absoluteRotationInWorld = new THREE.Quaternion();
  const inViewRangeX = 2;

  // TEXTURE: load picture as a texture and set proportions for horiz / vert
  const texture = useMemo(() => new THREE.TextureLoader().load(picture, (txtr) => {
    let isHorizontal = (txtr.image.width > txtr.image.height);
    let w = (isHorizontal) ? horizontalFormatBaseWidth : verticalFormatBaseWidth;
    let h = (w * txtr.image.height) / txtr.image.width;
    setSize([w, h, baseSize[2]]);
    return false;
  }, undefined, (error) => {
    return false;
  }), [picture]);

  useEffect(()=>{
    document.body.style.cursor =  (hovered) ? 'pointer' : 'inherit';
  }, [hovered]);

  useFrame(() => {
      workMesh.current.getWorldPosition(absolutePositionInWorld);
      workMesh.current.getWorldQuaternion(absoluteRotationInWorld);
      // if obj is in frontal quadrant and if obj is centered in x (for an expected range):
      if(absolutePositionInWorld.z > 0 && -inViewRangeX < absolutePositionInWorld.x && absolutePositionInWorld.x < inViewRangeX) {
        // rotate obj y accordingly on how precisely it's centered in x
        workMesh.current.rotation.y = THREE.Math.degToRad( ( 180 / inViewRangeX ) * ( inViewRangeX - absolutePositionInWorld.x ) );
        // opacity as invert of distance of x from 0 -1
        setBtnOpacity( - (Math.abs(absolutePositionInWorld.x) - 1) );
      }
  });



  return (
    <group
      position={position}
      rotation={initialRotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerUp={()=>{clickHandler(slug)}}
    >
      <Html position={[0,-1,0]}>
        <div className="work__content" style={{opacity:btnOpacity}}>
            {title}
        </div>
      </Html>
      <Box castShadow ref={workMesh} args={size}>
        <meshStandardMaterial attachArray="material" color="white"/>
        <meshStandardMaterial attachArray="material" color="white"/>
        <meshStandardMaterial attachArray="material" color="white"/>
        <meshStandardMaterial attachArray="material" color="white"/>
        <meshStandardMaterial
          attachArray="material"
          map={texture}
          transparent={true}
        />
        <meshStandardMaterial attachArray="material" color="white"/>
      </Box>
    </group>
  );
};


export default Work;

