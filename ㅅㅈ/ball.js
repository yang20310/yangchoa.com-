const ballCanvas = document.getElementById('ballCanvas');
const ballCtx = ballCanvas.getContext('2d');

class Ball {
    constructor() {
        this.radius = 15;
        this.x = ballCanvas.width / 2;
        this.y = 50;
        this.vy = 0;
        this.gravity = 0.5;
        this.dampening = 0.8;
        this.isDropping = true;
    }

    update() {
        if (this.isDropping) {
            this.vy += this.gravity;
            this.y += this.vy;
            
            if (this.y + this.radius > ballCanvas.height) {
                this.y = ballCanvas.height - this.radius;
                this.vy *= -this.dampening;
                
                if (Math.abs(this.vy) < 0.5) {
                    this.vy = 0;
                    this.isDropping = false;
                }
            }
        }
    }

    draw() {
        ballCtx.beginPath();
        ballCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ballCtx.fillStyle = '#4ecdc4';
        ballCtx.fill();
        ballCtx.strokeStyle = '#45b7ae';
        ballCtx.stroke();
        ballCtx.closePath();
    }

    reset() {
        this.y = 50;
        this.vy = 0;
        this.isDropping = true;
    }
}

const ball = new Ball();

ballCanvas.addEventListener('click', () => {
    ball.reset();
});

function animateBall() {
    ballCtx.fillStyle = 'white';
    ballCtx.fillRect(0, 0, ballCanvas.width, ballCanvas.height);
    
    ballCtx.beginPath();
    ballCtx.strokeStyle = '#333';
    ballCtx.moveTo(0, ballCanvas.height);
    ballCtx.lineTo(ballCanvas.width, ballCanvas.height);
    ballCtx.stroke();
    
    ball.update();
    ball.draw();
    
    requestAnimationFrame(animateBall);
}

animateBall(); 