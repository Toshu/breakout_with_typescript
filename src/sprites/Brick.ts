import { Vector } from '../types';
import { Sprite } from './Sprite';

export class Brick extends Sprite {
    constructor(
        brickWidth: number,
        brickHeight: number,
        position: Vector,
        imagePath: string,
        private brickEnergy: number
    ) {
        super(brickWidth, brickHeight, position, imagePath);
        this.brickEnergy = brickEnergy;
    }

    get energy(): number {
        return this.brickEnergy;
    }

    set energy(energy: number) {
        this.brickEnergy = energy;
    }
}
