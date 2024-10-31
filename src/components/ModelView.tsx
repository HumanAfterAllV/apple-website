import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import { Suspense } from "react";
import Iphone from "./iPhone";

import * as THREE from 'three';

interface ModelViewProps {
    index: number;
    groupRef: React.RefObject<THREE.Group>;
    gsapType: string;
    controlRef: React.RefObject<THREE.OrbitControls>;
    setRotationState: (angle: number) => void;
    size: number[];
    item: any;
}

export default function ModelView({index, groupRef, gsapType, controlRef, setRotationState, size, item}: ModelViewProps): JSX.Element {
    return(
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full ${index === 2 }? 'right-[-100%] : ''`}
        >
            <ambientLight intensity={0.3}/>
            <PerspectiveCamera makeDefault position={[0, 0, 4]}/>   
            <Lights/>
            <OrbitControls 
                ref={controlRef} 
                enableZoom={false} 
                enablePan={false} 
                rotateSpeed={0.4} 
                target={new THREE.Vector3(0,0,0)}
                onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
                 />
            <group ref={groupRef} name={`${index === 1}`}>
                <Suspense fallback={<Html><div>Loading</div></Html>}>
                    <Iphone scale={index===1 ? [15,15,15] : [17,17,17]} item={item} size={size}/>
                </Suspense>    
            </group>
        </View>
    )
}