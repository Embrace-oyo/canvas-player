<template>
	<div class="wrapper">
		<div class="background"></div>
		<canvas id="canvas"></canvas>
		<div class="control">
				<div class="progress">
					<span id="currentDuration">00:00</span>
					<span id="pro">
						<span id="slide">
							<i id="dot"></i>
						</span>
						<span id="coverSlide"></span>
					</span>
					<span id="totalDuration">00:00</span>
				</div>
				<div class="box">
					<div id="prev"></div>
					<div class="play" id="play"></div>
					<div id="next"></div>
				</div>
		</div>
	</div>
</template>

<script>
	import mp3_0 from '@/mp3/1.mp3';
	import mp3_1 from '@/mp3/2.mp3';
	import mp3_2 from '@/mp3/3.mp3';
	import mp3_3 from '@/mp3/4.mp3';
	import mp3_4 from '@/mp3/5.mp3';
	import { init } from '@/unlit/init';
	export default {
		name: "auidoAndCanvas",
		mounted(){
			let mp3 = [
				{title: '歌曲0', src: mp3_0},
				{title: '歌曲1', src: mp3_1},
				{title: '歌曲2', src: mp3_2},
				{title: '歌曲3', src: mp3_3},
				{title: '歌曲4', src: mp3_4},
				];
			init({
				AUDIO: mp3,
				CANVAS: document.getElementById('canvas'),
				PLAY: document.getElementById('play'),
				TOTALDURATION: document.getElementById('totalDuration'),
				CURRRENTDURATION: document.getElementById('currentDuration'),
				PRO: document.getElementById('pro'),
				SLIDE: document.getElementById('slide'),
				DOT: document.getElementById('dot'),
				COVERSLIDE: document.getElementById('coverSlide'),
				PREV: document.getElementById('prev'),
				NEXT: document.getElementById('next'),
			});
		}
	}
</script>

<style scoped>
	.wrapper{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	.background{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
		background: url("../asset/images/20181212102127.jpg") center no-repeat;
		background-size: cover;
		filter: blur(5px);
	}
	#canvas{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		pointer-events:none
	}
	.control{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 6rem;
		z-index: 3;
	}
	.progress{
		width: 100%;
		height: 2rem;
		float: left;
		display: flex;
		align-items: center;
		justify-content:space-around;
		color: #fff;
		font-size: 0.9rem;
	}
	#pro{
		width: 12.5rem;
		height: 0.3rem;
		border-radius: 5rem;
		background: #C2C2C4;
		position: relative;
	}
	#slide{
		content: '';
		width: 0.75rem;
		height: 0.75rem;
		border: 1px solid #C4BDBD;
		box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.18);
		position: absolute;
		left: -0.4rem;
		top: -0.3rem;
		border-radius: 50%;
		background: #fff;
	}
	#slide i{
		width: 0.25rem;
		height: 0.25rem;
		position: absolute;
		top: 0.25rem;
		left: 0.25rem;
		background: #E83C3C;
		border-radius: 50%;
	}
	#coverSlide{
		display: block;
		float: left;
		width: 0;
		background: #E83C3C;
		height: 100%;
		border-radius: 5rem;
	}
	.box{
		width: 100%;
		float: left;
		display: flex;
		align-items: center;
		justify-content:space-evenly;
	}
	.play{
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: rgb(225,56,56);
		display: flex;
		align-items: center;
	}
	.play:before{
		content: '';
		display: block;
		width: 1rem;
		border-width:0.7rem;
		border-style: solid;
		border-color:transparent transparent transparent #fff;
		margin-left: 1rem;
	}
	.pasue:before{
		content: '';
		display: block;
		width: 1rem;
		height: 1rem;
		border-style: double;
		border-width: 0px 0px 0px 0.75rem;
		border-color: #fff;
		margin-left: 0.85rem;
	}
	.play:active{
		background: #D33030;
	}
	#prev, #next{
		width: 2rem;
		height: 2rem;
		background: rgb(225,56,56);
		border-radius: 50%;
	}
	#prev:after{
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background: url('../asset/images/previous.png');
		background-size: cover;
		transform: scale(0.5);
	}
	#next:after{
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background: url('../asset/images/next.png ');
		background-size: cover;
		transform: scale(0.5);
	}
</style>
