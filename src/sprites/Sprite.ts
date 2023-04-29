import { Vector } from '../types';

export class Sprite {
    private image: HTMLImageElement = new Image();

    constructor(private width: number, private height: number, private position: Vector, imagePath: string) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.image.src = imagePath;
    }

    getWidth(): number {
        return this.width;
    }
    getHeight(): number {
        return this.height;
    }
    getPosition(): Vector {
        return this.position;
    }
    getImage(): HTMLImageElement {
        return this.image;
    }
}
