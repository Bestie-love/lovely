const cube = document.querySelector('.cube');
let isDragging = false;
let startX, startY;
let rotationX = 0, rotationY = 0;
let animationId; // To hold the requestAnimationFrame ID

// Automatic rotation function
function rotateCube() {
    rotationY += 0.5; // Adjust the rotation speed
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    animationId = requestAnimationFrame(rotateCube); // Loop the animation
}

// Start automatic rotation
rotateCube();

// Event listeners for manual rotation
cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cancelAnimationFrame(animationId); // Stop automatic rotation when dragging
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    rotateCube(); // Resume automatic rotation when mouse is released
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    rotationY += deltaX * 0.5; // Adjust rotation speed
    rotationX -= deltaY * 0.5; // Adjust rotation speed

    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
});

// Button click to reveal message
const button = document.querySelector('.reveal-button');
const message = document.querySelector('.hidden-message');

button.addEventListener('click', () => {
    button.style.display = 'none'; // Hide the button
    message.style.display = 'block'; // Show the love message
    startHeartAnimation(); // Start heart particles animation
});

// Heart particle animation
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function startHeartAnimation() {
    setInterval(() => {
        hearts.push(new Heart());
    }, 300);
    animateHearts();
}

function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * -3 - 2;
    this.alpha = Math.random() * 0.5 + 0.5;
}

Heart.prototype.draw = function () {
    ctx.fillStyle = `rgba(255, 64, 129, ${this.alpha})`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size / 2, this.y + this.size / 2, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y + this.size / 2, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
    ctx.closePath();
    ctx.fill();
};

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, i) => {
        heart.draw();
        heart.y += heart.speedY;
        if (heart.y < -heart.size) {
            hearts.splice(i, 1);
        }
    });
    requestAnimationFrame(animateHearts);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
