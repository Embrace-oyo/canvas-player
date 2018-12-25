const SNOWS = [];
const SNOW_LENGTH = 100;
const W = window.screen.width;
const H = window.screen.availHeight;
let CTX;

function random(min, max){
	return Math.random() * (max - min) + min;
}

class Snow{
	constructor(ctx){
		this.ctx = ctx;
		this.radius = random(2, 5);
		this.ax = Math.random() < 0.5 ? 0.1 : -0.1;
		this.speed = random(0.5, 1);
		this.x = random(0, W);
		this.y = random(0, H);
	}
	rest(){
		this.speed = random(0.5, 1);
		this.ax = Math.random() < 0.5 ? 0.1 : -0.1;
		this.radius = random(2, 5);
		this.x = random(0, W);
		this.y = -this.radius*2;
	}
	draw(ctx){
		ctx.restore();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.arc(this.x, this.y + this.radius, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();
		ctx.save();
		this.update();
	}
	update(){
		this.y += this.speed;
		this.x += this.ax;
		if(this.y > H + this.radius*2 || this.x > W + this.radius*2 || this.x < -this.radius*2){
			this.rest();
		}
	}
}

export function snowsArray(ctx){
	for(let i = 0; i< SNOW_LENGTH; i++){
		let snow = new Snow(CTX);
		SNOWS.push(snow);
	}
}

export function drawSnows(ctx){
	for(let i = 0; i< SNOWS.length; i++){
		SNOWS[i].draw(ctx);
	}
}



