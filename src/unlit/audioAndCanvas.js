const width = window.screen.width;
const height = window.screen.availHeight;
const radius = 150;
const radius2 = 140;
let Clockwise = 360;
let AntiClockwise = 0;
let isFont = false;


/* 设备设置 */
export function createAudioElement(audio, ctx){
	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
	let context = new window.AudioContext();
	let source = context.createMediaElementSource(audio); // 音源
	let analyser = context.createAnalyser(); // 分析器
	source.connect(analyser); // 音源连接分析器
	analyser.connect(context.destination); // 分析器连接扬声器
	analyser.fftSize = 4096; //快速傅里叶变换
	let dataArray = new Uint8Array(analyser.fftSize);
	staticDraw(dataArray, ctx);
	return {analyser: analyser, dataArray: dataArray}
}


/* 静态绘图 */
export function staticDraw(data, ctx){
	if(data !== undefined){
		data = data.dataArray
	}
	if(Clockwise <= 0){
		Clockwise = 360;
		AntiClockwise = 0
	}
	Clockwise-=0.1;
	AntiClockwise+=0.1;
	ctx.beginPath();
	ctx.fillStyle = 'rgba(255, 255, 255, 0)';
	for (let i = 0; i < 360; i++){
		let value;
		let value2;
		if(data !== undefined){
			 value = data[i] / 6;
			 value2 = data[i] / 6;
		}else{
			 value = 1;
			 value2 = 1;
		}
		/* 外圈 */
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = color(i);
		ctx.lineCap="round";
		ctx.moveTo(Math.cos((i + Clockwise) / 180 * Math.PI) * radius + width/2, (- Math.sin((i + Clockwise) / 180 * Math.PI) * radius + height/2));
		ctx.lineTo(Math.cos((i + Clockwise) / 180 * Math.PI) * (radius + value + 1) + width/2, (- Math.sin((i + Clockwise) / 180 * Math.PI) * (radius + value + 1) + height/2));
		ctx.stroke();
		/* 内圈 */
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = color(i);
		ctx.lineCap="round";
		ctx.moveTo(Math.cos((i + AntiClockwise) / 180 * Math.PI) * radius2 + width/2, (- Math.sin((i + AntiClockwise) / 180 * Math.PI) * radius2 + height/2));
		ctx.lineTo(Math.cos((i + AntiClockwise) / 180 * Math.PI) * (radius2 - value2 - 1) + width/2, (- Math.sin((i + AntiClockwise - 1) / 180 * Math.PI) * (radius2 - value2 - 1) + height/2));
		ctx.stroke();
	}
}

/* 每个柱子的颜色 */
function color(i){
	const full = 360;
	let r = 0;
	let g = 0;
	let b = 0;
	if(i<full/3){
		r = 255;
		g = Math.ceil(255*3*i/full);
		b = 0;
	}else if(i<full/2){
		r = Math.ceil(750-i*(250*6/full));
		g = 255;
		b = 0;
	}else if(i<full*2/3){
		r = 0;
		g = 255;
		b = Math.ceil(i*(250*6/full)-750);
	}else if(i<full*5/6){
		r = 0;
		g = Math.ceil(1250-i*(250*6/full));
		b = 255;
	}else{
		r = Math.ceil(150*i*(6/full)-750);
		g = 0;
		b = 255;
	}
	return 'rgb('+r+','+g+','+b+')';

/*	if(i < 50){
		return '#ff0000'
	}else if(50 <= i && i < 100){
		return '#ffa500'
	}else if(100 <= i && i < 150){
		return '#ffff00'
	}else if(150 <= i && i < 200){
		return '#00ff00'
	}else if(200 <= i && i < 250){
		return '#007fff'
	}else if(250 <= i && i < 300){
		return '#0000ff'
	}else if(300 <= i && i < 360){
		return '#8b00ff'
	}*/

}
