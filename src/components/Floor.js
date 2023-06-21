import React  from 'react'
import * as THREE from 'three';
import {Plane} from '@react-three/drei';

export default function Floor({color}) {

  return (
    <Plane
      receiveShadow
      position={[0,0,0]}
      rotation={[-Math.PI/2,0,0]}
      args={[1000, 1000]}
      side={THREE.DoubleSide}
    >
      <meshStandardMaterial attach="material" color={color} />
    </Plane>
  )
}