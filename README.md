# ASCII

An ASCII effect for THREE.js - which runs as a fragment shader on the GPU.

## Usage

```
import React from 'react';
import {Canvas} from '@react-three/fiber';
import {EffectComposer} from '@react-three/postprocessing';

const Scene = () => {
    const asciiEffect = React.useMemo(() => new ASCIIEffect(), []);

    return (
        <Canvas>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshPhongMaterial />
            </mesh>
            <pointLight position={[0, 0, 10]} />
            <EffectComposer>
                <primitive object={asciiEffect} />
            </EffectComposer>
        </Canvas>
    );
}
```
