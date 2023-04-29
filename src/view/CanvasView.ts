import { Brick, Sprite } from '../sprites';

export class CanvasView {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private start: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;

    constructor(canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.start = document.querySelector('#start');
        this.info = document.querySelector('#info');
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    initStartButton(startFunction: (view: CanvasView) => void): void {
        this.start?.addEventListener('click', () => startFunction(this));
    }

    drawScore(score: number): void {
        if (this.scoreDisplay) {
            this.scoreDisplay.innerHTML = score.toString();
        }
    }

    drawInfo(text: string): void {
        if (this.info) {
            this.info.innerHTML = text;
        }
    }

    drawSprite(sprite: Sprite): void {
        if (!sprite) {
            return;
        }

        this.context?.drawImage(
            sprite.getImage(),
            sprite.getPosition().x,
            sprite.getPosition().y,
            sprite.getWidth(),
            sprite.getHeight()
        );
    }

    drawBricks(bricks: Brick[]): void {
        bricks.forEach((brick) => this.drawSprite(brick));
    }
}
