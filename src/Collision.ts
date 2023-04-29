import { Ball, Brick, Paddle } from './sprites';
import { CanvasView } from './view';

export class Collision {
    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        // 1. check collision with paddle
        if (
            ball.getPosition().x + ball.getWidth() > paddle.getPosition().x &&
            ball.getPosition().x < paddle.getPosition().x + paddle.getWidth() &&
            ball.getPosition().y + ball.getHeight() > paddle.getPosition().y
        ) {
            ball.changeYDirection();
        }

        // 2. check collision with walls
        // 2.a x-collisions
        if (ball.getPosition().x > view.getCanvas().width - ball.getWidth() || ball.getPosition().x < 0) {
            ball.changeXDirection();
        }
        // 2.b y-collisions
        if (ball.getPosition().y <= 0) {
            ball.changeYDirection();
        }
    }

    isCollidingBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.getPosition().x < brick.getPosition().x + brick.getWidth() &&
            ball.getPosition().x + ball.getWidth() > brick.getPosition().x &&
            ball.getPosition().y < brick.getPosition().y + brick.getHeight() &&
            ball.getPosition().y + ball.getHeight() > brick.getPosition().y
        ) {
            return true;
        }
        return false;
    }

    isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
        let colliding = false;

        bricks.forEach((brick, i) => {
            if (this.isCollidingBrick(ball, brick)) {
                ball.changeYDirection();

                if (brick.energy === 1) {
                    bricks.splice(i, 1);
                } else {
                    brick.energy -= 1;
                }

                colliding = true;
            }
        });

        return colliding;
    }
}
