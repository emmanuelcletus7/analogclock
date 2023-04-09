// Get the canvas element and context
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Calculate the clock radius based on the canvas size
const radius = Math.min(canvas.width, canvas.height) / 2 * 0.9;

// Draw the clock face
function drawClock() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the outer circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw the inner circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Draw the hour markers
    for (let i = 1; i <= 12; i++) {
        const angle = i * Math.PI / 6;
        const x = canvas.width / 2 + Math.sin(angle) * radius * 0.8;
        const y = canvas.height / 2 - Math.cos(angle) * radius * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.04, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }

    // Get the current time
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Draw the hour hand
    const hourAngle = (hours + minutes / 60 + seconds / 3600) * Math.PI / 6;
    const hourX = canvas.width / 2 + Math.sin(hourAngle) * radius * 0.5;
    const hourY = canvas.height / 2 - Math.cos(hourAngle) * radius * 0.5;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(hourX, hourY);
    ctx.lineWidth = radius * 0.06;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw the minute hand
    const minuteAngle = (minutes + seconds / 60) * Math.PI / 30;
    const minuteX = canvas.width / 2 + Math.sin(minuteAngle) * radius * 0.7;
    const minuteY = canvas.height / 2 - Math.cos(minuteAngle) * radius * 0.7;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(minuteX, minuteY);
    ctx.lineWidth = radius * 0.04;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw the second hand
    const secondAngle = seconds * Math.PI / 30;
    const secondX = canvas.width / 2 + Math.sin(secondAngle) * radius * 0.8;
    const secondY = canvas.height / 2 - Math.cos(secondAngle) * radius * 0.8;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(secondX, secondY);
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = radius * 0.02;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Request the next animation frame
    requestAnimationFrame(drawClock);
}

// Start the clock
requestAnimationFrame(drawClock);
