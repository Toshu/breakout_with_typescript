import { CanvasView } from './view';
import { Ball, Brick, Paddle } from './sprites';

import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';

import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';

import { createBricks } from './helpers';
import { Collision } from './Collision';

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView): void {
    view.drawInfo('Game Over!');
    gameOver = false;
}

function setGameWin(view: CanvasView): void {
    view.drawInfo('Game Won!');
    gameOver = false;
}

function gameLoop(view: CanvasView, bricks: Brick[], paddle: Paddle, ball: Ball, collDec: Collision) {
    view.clear();

    view.drawBricks(bricks);

    // move and draw Ball
    ball.moveBall();
    view.drawSprite(ball);

    // Move and draw paddle
    if (
        (paddle.isMovingLeft && paddle.getPosition().x > 0) ||
        (paddle.isMovingRght && paddle.getPosition().x < view.getCanvas().width - paddle.getWidth())
    ) {
        paddle.movePaddle();
    }
    view.drawSprite(paddle);

    // collision checks
    collDec.checkBallCollision(ball, paddle, view);
    const collidingBrick = collDec.isCollidingBricks(ball, bricks);
    if (collidingBrick) {
        score += 1;
        view.drawScore(score);
    }

    // Gamer over?
    if (ball.getPosition().y > view.getCanvas().height) {
        return setGameOver(view);
    }
    if (bricks.length === 0) {
        return setGameWin(view);
    }

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collDec));
}

function startGame(view: CanvasView) {
    // Reset displays
    score = 0;
    view.drawScore(score);
    view.drawInfo('');

    // create Collision-detection-Instance
    const collDec = new Collision();

    // create bricks
    const bricks = createBricks();

    // creatre ball
    const ball = new Ball(BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_IMAGE, BALL_SPEED);

    // create paddel
    const paddel = new Paddle(
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        { x: PADDLE_STARTX, y: view.getCanvas().height - PADDLE_HEIGHT - 5 },
        PADDLE_IMAGE,
        PADDLE_SPEED
    );

    gameLoop(view, bricks, paddel, ball, collDec);
}

// Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);
