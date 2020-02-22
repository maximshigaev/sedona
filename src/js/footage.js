const likeBtns = Array.from(document.querySelectorAll(`.footage__button`));
let isLiked = false;

likeBtns.forEach((btn) => {
	btn.addEventListener(`click`, function() {
		const likesSvg = btn.firstElementChild;

		if (!isLiked) {
			isLiked = true;
			likesSvg.style.fill = `green`;
			likesSvg.style.fillOpacity = 1;

			btn.previousElementSibling.textContent = +btn.previousElementSibling.textContent + 1;
		} else {
			isLiked = false;

			if (window.innerWidth > 1200) {
				likesSvg.style.fill = `#ffffff`;
				likesSvg.style.fillOpacity = 1;
			} else {
				likesSvg.style.fill = `#000000`;
				likesSvg.style.fillOpacity = 0.3;
			}

			btn.previousElementSibling.textContent = +btn.previousElementSibling.textContent - 1;
		}
	});
});
