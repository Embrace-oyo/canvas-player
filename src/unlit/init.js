import {createAudioElement, staticDraw} from './audioAndCanvas';
import {snowsArray, drawSnows} from './snowAndCanvas';
import { Shape } from './characterParticlesCanvas.js';

/* 全局变量 */


// 设备宽
const width = window.screen.availWidth;
// 设备高
const height = window.screen.availHeight;
// 配置
let OPTION;
// 播放容器
let AUDIO;
// 音频数据
let AUDIODDEVICE;
// dom
let canvas;
// 画布
let context;
// 雪花
let shape;
// 是否加载完成
let isLoad = false;
// 是否播放
let isPlay = false;
// 是否切歌
let isCutSong = false;
// 是否第一次加载
let firstLoad = true;
// 是否第一次播放
let firstPlay = true;
// 总时长
let duration  = 0;
// 计时器
let timer = null;
// 当前时长
let currentTime = 0;
// 移动距离
let distance = 0;
// 歌曲下标
let index = 0;
// 歌曲列表
let musicList = [];


/* 进入页面初始化 */
export function init(option){
	// 雪花初始化
	snowsArray(context);
	OPTION = option;
	musicList = option.AUDIO;
	canvas = option.CANVAS;
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext('2d');
	play(option);
	draw();
	slider(OPTION, AUDIO);
}

/* 播放器必须经过用户点击才能创建 */
function clickInitPlay(){
	AUDIO = new Audio();
	AUDIO.src = musicList[index].src;
	AUDIODDEVICE = new createAudioElement(AUDIO, context);
	console.log(AUDIODDEVICE);
	/* 歌曲加载完毕获取歌曲时长信息 */
	AUDIO.addEventListener('canplay', () => {
		duration = songTime(AUDIO.duration);
		OPTION.TOTALDURATION.innerText = duration;
		playTime(AUDIO, OPTION);
		isLoad = true;
		console.log('加载完成,可以播放');
		if(firstPlay === true){
			AUDIO.play();
			firstPlay = false;
		}
		if(isCutSong === true){
			OPTION.PLAY.classList.add('pasue');
			AUDIO.play();
			isCutSong = false;
			console.log('切歌完成');
		}
	});
}

/* 播放按钮 */
function play(option){
	option.PLAY.onclick = () => {
		//是否是第一次点击播放按钮
		if(isLoad === false && isPlay === false){
			if(firstLoad === true){
				clickInitPlay();
				firstLoad = false;
				option.PLAY.classList.add('pasue');
			}
		}
		if(isLoad === true && isPlay === false) {
			AUDIO.play();
			option.PLAY.classList.add('pasue');
			console.log('播放');
		}else if(isPlay === true){
			AUDIO.pause();
			option.PLAY.classList.remove('pasue');
			console.log('暂停');
		}
		isPlay = !isPlay;
	}
	option.NEXT.onclick = () => {
		index++;
		isPlay = true;
		isCutSong = true;
		option.PLAY.classList.remove('pasue');
		option.CURRRENTDURATION.innerText = '00:00';
		if(index > musicList.length -1){index = 0;}
		if(firstLoad === true){
			clickInitPlay();
			firstLoad = false;
			option.PLAY.classList.add('pasue');
		}
		AUDIO.src = musicList[index].src;
		console.log('下一曲');
	};
	option.PREV.onclick = () => {
		index--;
		isPlay = true;
		isCutSong = true;
		option.PLAY.classList.remove('pasue');
		option.CURRRENTDURATION.innerText = '00:00';
		if(index < 0){index = musicList.length - 1;}
		if(firstLoad === true){
			clickInitPlay();
			firstLoad = false;
			option.PLAY.classList.add('pasue');
		}
		AUDIO.src = musicList[index].src;
		console.log('上一曲');
	};
}

/* 绘制画面 */
function draw(){
	context.clearRect(0, 0, width, height);
	if(AUDIODDEVICE != undefined){
		AUDIODDEVICE.analyser.getByteFrequencyData(AUDIODDEVICE.dataArray);
	}
	shape = new Shape(width/2, 50, musicList[index].title, context);
	shape.placement.map(x =>{
		x.update();
	});
	staticDraw(AUDIODDEVICE, context);
	drawSnows(context);
	requestAnimationFrame((timetamps) => {
		draw(AUDIODDEVICE);
	});
}

/* 当前播放时长 */
function playTime(audio, opt){
	timer = setInterval(() => {
		currentTime = songTime(audio.currentTime);
		opt.CURRRENTDURATION.innerText = currentTime;
		opt.SLIDE.style.left = (Math.floor(audio.currentTime) * getDistance(audio.duration, opt) - opt.DOT.offsetWidth) + 'px';
		opt.COVERSLIDE.style.width = Math.floor(audio.currentTime) * getDistance(audio.duration, opt) + 'px';
	}, 500);
}

/* 播放距离获取 */
function getDistance(duration, opt){
	let w = opt.PRO.offsetWidth;
	return w / duration
}

/* 歌曲时间格式转换 */
function songTime(duration){
	let m = Math.floor(duration / 60);
	let s = parseInt(duration % 60);
	if(m < 10){
		m = '0' + m;
	}
	if(s < 10){
		s = '0' + s;
	}
	return m + ':' + s
}

/* 音乐进度条滑块操作 */
function slider(opt) {
	let X = 0;
	let MOVE = 0;
	let MOVEX = 0;
	let percentage = 0;
	opt.PRO.addEventListener('touchstart', (e) =>{
		MOVEX = 0;
		X = e.touches[0].pageX - opt.PRO.offsetLeft;
		clearInterval(timer);
	});
	opt.SLIDE.addEventListener('touchmove', (e) =>{
		MOVE = e.touches[0].pageX - opt.PRO.offsetLeft;
		if(MOVE < 0){
			MOVE = 0;
		}else if(MOVE > opt.PRO.offsetWidth){
			MOVE = opt.PRO.offsetWidth;
		}
		MOVEX = MOVE - X;
		opt.SLIDE.style.left = MOVE - opt.SLIDE.offsetWidth/2  + 'px';
		opt.COVERSLIDE.style.width = MOVE + 'px';
		if(AUDIO !== undefined){
			percentage = (X + MOVEX)/opt.PRO.offsetWidth;
			currentTime = songTime(AUDIO.duration * percentage);
			opt.CURRRENTDURATION.innerText = currentTime;
		}
	});
	opt.PRO.addEventListener('touchend', (e) =>{
		if(X < 0){
			X = 0;
		}
		opt.SLIDE.style.left = X + MOVEX - opt.SLIDE.offsetWidth/2  + 'px';
		opt.COVERSLIDE.style.width = X + MOVEX + 'px';
		percentage = (X + MOVEX)/opt.PRO.offsetWidth;
		if(AUDIO !== undefined){
			AUDIO.currentTime = AUDIO.duration * percentage;
		}else{
			opt.SLIDE.style.left = - opt.SLIDE.offsetWidth/2  + 'px';
			opt.COVERSLIDE.style.width = 0 + 'px';
		}
	});
}

