# ASCII

An ASCII effect for THREE.js - which runs as a fragment shader on the GPU.

### Supported Props

```typescript
interface IASCIIEffectProps {
    characters?: string; // The ASCII characters to use in brightness order dark -> light
    fontSize?: number; // Font Size of the characters drawn to the texture
    cellSize?: number; // Size of each cell in the grid
    color?: string; // Color of the characters
    invert?: boolean; // Flag which inverts the effect
}
```

### Example with @react-three/fiber

```jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

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
};
```
