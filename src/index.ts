import { CanvasTexture, Color, NearestFilter, RepeatWrapping, Texture, Uniform } from 'three';
import { Effect } from 'postprocessing';

import fragment from './ascii.frag';

export interface IASCIIEffectProps {
    characters?: string;
    fontSize?: number;
    cellSize?: number;
    color?: string;
    opacity?: boolean;
    invert?: boolean;
}

export class ASCIIEffect extends Effect {
    constructor({
        characters = ` .,'^:-=+*?!|0%#XWM@`,
        fontSize = 54,
        cellSize = 16,
        color = '#ffffff',
        invert = false
    }: IASCIIEffectProps) {
        const uniforms = new Map<string, Uniform>([
            ['uCharacters', new Uniform(new Texture())],
            ['uCellSize', new Uniform(cellSize)],
            ['uCharactersCount', new Uniform(characters.length)],
            ['uColor', new Uniform(new Color(color))],
            ['uInvert', new Uniform(invert)]
        ]);

        super('ASCIIEffect', fragment, { uniforms });

        const charactersTextureUniform = this.uniforms.get('uCharacters');

        if (charactersTextureUniform) {
            charactersTextureUniform.value = this.createCharactersTexture(characters, fontSize);
        }
    }

    /** Draws the characters on a Canvas and returns a texture */
    public createCharactersTexture(characters: string, fontSize: number): THREE.Texture {
        const canvas = document.createElement('canvas');

        const SIZE = 1024;
        const MAX_PER_ROW = 16;
        const CELL = SIZE / MAX_PER_ROW;

        canvas.width = canvas.height = SIZE;

        const texture = new CanvasTexture(
            canvas,
            undefined,
            RepeatWrapping,
            RepeatWrapping,
            NearestFilter,
            NearestFilter
        );

        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('Context not available');
        }

        context.clearRect(0, 0, SIZE, SIZE);
        context.font = `${fontSize}px arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#fff';

        for (let i = 0; i < characters.length; i++) {
            const char = characters[i];
            const x = i % MAX_PER_ROW;
            const y = Math.floor(i / MAX_PER_ROW);

            context.fillText(char, x * CELL + CELL / 2, y * CELL + CELL / 2);
        }

        texture.needsUpdate = true;

        return texture;
    }
}
