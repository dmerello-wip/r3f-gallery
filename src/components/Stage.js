import {Suspense, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Box} from "@react-three/drei";
import Gallery from '@/components/Gallery';
import Camera from '@/components/Camera';
import Floor from '@/components/Floor';
import {useRouter} from 'next/router';
import gsap, {TweenMax, Power2} from 'gsap';

const Stage = ({contents, itemClickHandler}) => {

  const router = useRouter();
  const cameraRef = useRef(null);
  const lightRef = useRef(null);


  const ambientColor = '#000';
  const radius = contents.length / 2.5;
  const cameraPosition = [0, 1, radius + 3];
  const fogDistance = radius * 2.5;

  const goToWork = (slug) => {
    animateCamera().then(() => {
      router.push(`/works/${slug}`);
    });
  };

  const animateCamera = () => new Promise((resolve, reject) => {
    let cameraChoords = {
      posY: cameraRef.current.position.y,
      posZ: cameraRef.current.position.z,
      rotX: cameraRef.current.rotation.x,
    };
    let tl = gsap.timeline({
      onUpdate: () => {
        cameraRef.current.position.y = cameraChoords.posY;
        cameraRef.current.position.z = cameraChoords.posZ;
        cameraRef.current.rotation.x = cameraChoords.rotX;
      },
      onComplete: () => {
        resolve()
      }
    });
    tl.to(cameraChoords, {
      posY: 4,
      posZ: cameraChoords.posZ + 3,
      rotX: -Math.PI / 8,
      duration: 1,
      ease: Power2.easeOut
    });
    tl.to(cameraChoords, {
      posZ: 0,
      rotX: -Math.PI / 2,
      duration: 2,
      ease: Power2.easeInOut
    });
  });


  return (
    <div className="stage">
      <Canvas shadows={true} shadowMap>
        <color attach="background" args={ambientColor}/>
        <fog attach="fog" args={[ambientColor, 0, fogDistance]}/>
        <Camera position={cameraPosition} ref={cameraRef}/>
        <ambientLight intensity={1} ref={lightRef}/>
        /* also spotlight could be managed with radius relation: */
        <spotLight intensity={1} position={[0, 10, radius / 2]} angle={2} penumbra={1} castShadow/>
        <Floor color={ambientColor}/>
        <Suspense fallback={null}>
          <Gallery
            contents={contents}
            radius={radius}
            itemClick={goToWork}
          />
        </Suspense>
      </Canvas>
    </div>
  )
};

export default Stage;

