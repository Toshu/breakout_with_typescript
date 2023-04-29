import { Vector } from '../types';
import { Sprite } from './Sprite';

export class Paddle extends Sprite {
    private moveLeft: boolean = false;
    private moveRight: boolean = false;

    constructor(paddleWidth: number, paddleHeigth: number, position: Vector, imagePath: string, private speed: number) {
        super(paddleWidth, paddleHeigth, position, imagePath);
        this.speed = speed;

        // Eventlisteners
        document.addEventListener('keydown', (event: KeyboardEvent): void => {
            if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') {
                this.moveLeft = true;
            } else if (event.code === 'ArrowRight' || event.key === 'ArrowRight') {
                this.moveRight = true;
            }
        });
        document.addEventListener('keyup', (event: KeyboardEvent): void => {
            if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') {
                this.moveLeft = false;
            } else if (event.code === 'ArrowRight' || event.key === 'ArrowRight') {
                this.moveRight = false;
            }
        });
    }

    get isMovingLeft(): boolean {
        return this.moveLeft;
    }
    get isMovingRght(): boolean {
        return this.moveRight;
    }

    movePaddle(): void {
        if (this.moveLeft) {
            this.getPosition().x -= this.speed;
        } else if (this.moveRight) {
            this.getPosition().x += this.speed;
        }
    }
}
