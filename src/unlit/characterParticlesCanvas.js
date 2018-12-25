const gridX = 3;
const gridY = 3;
const fontSize = 50;
const radius = 1;
const max = 3;
const colors = [
	'#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
	'#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
	'#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
	'#FF5722'
];
const W = window.screen.width;
const H = window.screen.availHeight;
let time = 0;
let TEXT = '';
let maxLen = Math.floor((W - 40) / fontSize);


export class Shape{
	constructor(x, y, text, ctx){
		this.x = x;
		this.y = y;
		TEXT = text;
		this.size = fontSize;
		this.text = text;
		this.placement = [];
		this.ctx = ctx;
		this.getValue();
	}
	getValue(){
		let ctx = this.ctx;
		if(this.text.length > maxLen){
			this.text = this.text.substring(0,maxLen) + '...'
		}
		ctx.textAlign = "left";
		ctx.font =  this.size + "px arial";
		ctx.fillText(this.text, 50, fontSize);
		let data = ctx.getImageData(0, 0, W, H);
		let buffer32 = new Uint32Array(data.data.buffer);
		for(let j=0; j < H; j += gridY){
			for(let i=0 ; i < W; i += gridX){
				if(buffer32[j * W + i]){
					let particle = new Particle(i, j, ctx);
					this.placement.push(particle);
				}
			}
		}
		ctx.clearRect(0, 0, W, H);
	}
}

class Particle{
	constructor(x, y, ctx){
		this.ctx = ctx;
		this.radius = this.randomRange(0.1, max);
		this.x = x;
		this.y = y;
		this.fontWidth = -(TEXT.length * fontSize);
		this.flag = true;
		this.speed = this.randomRange(0.1, 1);
		this.color = colors[Math.floor(Math.random() * colors.length)];
	}
	randomRange(min, max) {
		return min + Math.random() * (max - min);
	}
	update(){
		time++
		let ctx = this.ctx;
		this.x -= 0.1;
		if(this.x < this.fontWidth / 2){
			this.x = W;
		}
		if(time%10 === 0){
			if(this.flag === true) {
				this.radius += this.speed;
				if (this.radius > max) {
					this.flag = false
				}
			}else{
				this.radius -= this.speed;
				if(this.radius < 1){
					this.radius = 1;
					this.flag = true
				}
			}
		}
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius,  0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
}
