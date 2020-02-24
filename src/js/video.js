const video = document.querySelector(`.video__clip`);

if (video) {
	const playBtn = document.querySelector(`.video__play`);
	const replayBtn = document.querySelector(`.video__replay`);
	const pauseBtn = document.querySelector(`.video__pause`);
	const videoPin = document.querySelector(`.video__pin`);
	const videoLine = document.querySelector(`.video__line`);
	const currentLine = document.querySelector(`.video__currentLine`);
	const fullScreenBtn = document.querySelector(`.video__fullScreen`);
	const halfPinWidth = videoPin.clientWidth / 2;
	const INT_MSC = 100;
	let interval = null;

	const startVideo = () => {
		video.play();

		interval = setInterval(() => {
			const playedRatio = videoLine.clientWidth * video.currentTime / video.duration;

			videoPin.style.left = playedRatio - halfPinWidth + `px`;
			currentLine.style.width = playedRatio + `px`;
		}, INT_MSC);

		playBtn.classList.add(`hidden`);
		replayBtn.classList.add(`hidden`);
		pauseBtn.classList.remove(`hidden`);
	};

	const stopVideo = () => {
		video.pause();

		pauseBtn.classList.add(`hidden`);
		playBtn.classList.remove(`hidden`);

		clearInterval(interval);
	};

	playBtn.addEventListener(`click`, startVideo);
	pauseBtn.addEventListener(`click`, stopVideo);
	replayBtn.addEventListener(`click`, startVideo);

	fullScreenBtn.addEventListener(`click`, function() {
		video.requestFullscreen();
	});

	video.addEventListener(`ended`, function() {
		pauseBtn.classList.add(`hidden`);
		replayBtn.classList.remove(`hidden`);
		clearInterval(interval);
		videoPin.style.left = videoLine.clientWidth - halfPinWidth + `px`;
		currentLine.style.width = videoLine.clientWidth + `px`;
	});

	video.addEventListener(`click`, function() {
		video.paused
			? startVideo()
			: stopVideo();
	});

	const videoLineX = videoLine.getBoundingClientRect().left;
	const leftBorder = videoLineX - halfPinWidth;
	const rightBorder = videoLine.getBoundingClientRect().right - halfPinWidth;

	const moveAt = (pageX, shiftX, isDragged) => {
		if (isDragged) {
			videoPin.style.left = pageX - shiftX - videoLineX + `px`;
			currentLine.style.width = pageX - shiftX - videoLineX + halfPinWidth + `px`;
		} else {
			videoPin.style.left = pageX - shiftX - videoLineX - halfPinWidth + `px`;
			currentLine.style.width = pageX - shiftX - videoLineX + `px`;
		}
	};

	const setTime = () => {
		video.currentTime = currentLine.clientWidth * video.duration / videoLine.clientWidth;
	};

	const mouseDownHandler = (downEvt) => {
		const shift = downEvt.clientX - downEvt.target.getBoundingClientRect().left;

		const mouseMoveHandler = (moveEvt) => {
			const relativeMoveX = moveEvt.pageX - shift;

			if (relativeMoveX >= leftBorder && relativeMoveX <= rightBorder) {
				moveAt(moveEvt.pageX, shift, true);

				setTime();
			}
		};

		const mouseUpHandler = () => {
			document.removeEventListener(`mousemove`, mouseMoveHandler);
			document.removeEventListener(`mousemup`, mouseUpHandler);
		};

		document.addEventListener(`mousemove`, mouseMoveHandler);
		document.addEventListener(`mouseup`, mouseUpHandler);
	};

	videoPin.addEventListener(`mousedown`, (downEvt) => mouseDownHandler(downEvt));

	videoLine.addEventListener(`click`, function(clickEvt) {
		moveAt(clickEvt.pageX, 0, false);

		setTime();
	});
}
