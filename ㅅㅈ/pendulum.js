const pendulumCanvas = document.getElementById('pendulumCanvas');
const pendulumCtx = pendulumCanvas.getContext('2d');

let angle = Math.PI/4;
let angleVelocity = 0;
let angleAcceleration;
const length = 100;
const gravity = 0.5;
const damping = 0.995;
const origin = {x: 150, y: 50};

function drawPendulum() {
    pendulumCtx.fillStyle = 'white';
    pendulumCtx.fillRect(0, 0, pendulumCanvas.width, pendulumCanvas.height);
    
    const bobX = origin.x + length * Math.sin(angle);
    const bobY = origin.y + length * Math.cos(angle);
    
    pendulumCtx.beginPath();
    pendulumCtx.strokeStyle = '#333';
    pendulumCtx.lineWidth = 2;
    pendulumCtx.moveTo(origin.x, origin.y);
    pendulumCtx.lineTo(bobX, bobY);
    pendulumCtx.stroke();
    
    pendulumCtx.beginPath();
    pendulumCtx.fillStyle = '#ff6b6b';
    pendulumCtx.arc(bobX, bobY, 20, 0, Math.PI * 2);
    pendulumCtx.fill();
    
    angleAcceleration = (-gravity/length) * Math.sin(angle);
    angleVelocity += angleAcceleration;
    angleVelocity *= damping;
    angle += angleVelocity;
    
    requestAnimationFrame(drawPendulum);
}

let isDragging = false;

pendulumCanvas.addEventListener('mousedown', (e) => {
    const rect = pendulumCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const bobX = origin.x + length * Math.sin(angle);
    const bobY = origin.y + length * Math.cos(angle);
    
    const distance = Math.sqrt((mouseX-bobX)**2 + (mouseY-bobY)**2);
    if(distance < 20) {
        isDragging = true;
        angleVelocity = 0;
    }
});

pendulumCanvas.addEventListener('mousemove', (e) => {
    if(isDragging) {
        const rect = pendulumCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        angle = Math.atan2(mouseX - origin.x, mouseY - origin.y);
        angleVelocity = 0;
    }
});

pendulumCanvas.addEventListener('mouseup', () => {
    isDragging = false;
});

drawPendulum();
