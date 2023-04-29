import { Vector } from '../types';
import { Sprite } from './Sprite';

export class Ball extends Sprite {
    private speed: Vector;

    constructor(ballSize: number, position: Vector, imagePath: string, speed: number) {
        super(ballSize, ballSize, position, imagePath);
        this.speed = { x: speed, y: -speed };
    }

    changeYDirection(): void {
        this.speed.y = -this.speed.y;
    }
    changeXDirection(): void {
        this.speed.x = -this.speed.x;
    }

    moveBall(): void {
        this.getPosition().x += this.speed.x;
        this.getPosition().y += this.speed.y;
    }
}
