const bounceCanvas = document.getElementById('bounceCanvas');
const bounceCtx = bounceCanvas.getContext('2d');

class BouncingBall {
    constructor() {
        this.radius = 20;
        this.x = bounceCanvas.width / 2;
        this.y = bounceCanvas.height / 2;
        this.dx = 4;
        this.dy = -4;
        this.color = '#ff6b6b';
    }

    update() {
        if (this.x + this.radius > bounceCanvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > bounceCanvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        bounceCtx.beginPath();
        bounceCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        bounceCtx.fillStyle = this.color;
        bounceCtx.fill();
        bounceCtx.closePath();
    }
}

const bouncingBall = new BouncingBall();

function animateBounce() {
    bounceCtx.fillStyle = 'white';
    bounceCtx.fillRect(0, 0, bounceCanvas.width, bounceCanvas.height);
    
    bouncingBall.update();
    bouncingBall.draw();
    
    requestAnimationFrame(animateBounce);
}

bounceCanvas.addEventListener('click', () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7af', '#96ceb4', '#ffeead'];
    bouncingBall.color = colors[Math.floor(Math.random() * colors.length)];
});

animateBounce(); 