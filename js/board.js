const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('#clear');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.lineJoin = 'round';
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function getStrokeVal() {
	ctx.lineWidth = this.value;
}

function getColor() {
	ctx.strokeStyle = this.value;
	console.log(ctx);
}

function draw(e) {
	console.log('draw');

	if (!isDrawing) return;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];

}

clear.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});


canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	console.log('mousdown',e);
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
