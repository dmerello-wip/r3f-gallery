'use client'

import {Suspense, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Box} from "@react-three/drei";
import Gallery from '@/components/Gallery';
import Camera from '@/components/Camera';
import Floor from '@/components/Floor';
import gsap, {TweenMax, Power2} from 'gsap';
import styles from '@/scss/components/stage.module.scss'

const Stage = ({contents}) => {

  const cameraRef = useRef(null);
  const lightRef = useRef(null);


  const ambientColor = '#000';
  const radius = contents.length / 2.5;
  const cameraPosition = [0, 1, radius + 3];
  const fogDistance = radius * 2.5;


  return (
    <div className={styles.stage} id="stage">
      <Canvas shadows={true} shadows>
        <color attach="background" args={[ambientColor]}/>
        <Camera position={cameraPosition} ref={cameraRef}/>
        <fog attach="fog" args={[ambientColor, 0, fogDistance]}/>
        <ambientLight intensity={1} ref={lightRef}/>
        <spotLight intensity={1} position={[0, 10, radius / 2]} angle={2} penumbra={1} castShadow/>
        <Suspense fallback={null}>
          <Gallery
            contents={contents}
            radius={radius}
          />
        </Suspense>
        <Floor color={ambientColor}/>
        {/*
        <color attach="background" args={ambientColor}/>
        <fog attach="fog" args={[ambientColor, 0, fogDistance]}/>
        <Camera position={cameraPosition} ref={cameraRef}/>
        <ambientLight intensity={1} ref={lightRef}/>
        <spotLight intensity={1} position={[0, 10, radius / 2]} angle={2} penumbra={1} castShadow/>
        <Floor color={ambientColor}/>
        <Suspense fallback={null}>
          <Gallery
            contents={contents}
            radius={radius}
          />
        </Suspense>
        */}
      </Canvas>
    </div>
  )
};

export default Stage;

