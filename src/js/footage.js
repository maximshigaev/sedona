const likeBtns = Array.from(document.querySelectorAll(`.footage__button`));

likeBtns.forEach((btn) => {
	let isLiked = false;

	btn.addEventListener(`click`, function() {
		const likesSvg = btn.firstElementChild;

		if (!isLiked) {
			isLiked = true;
			likesSvg.style.fill = `green`;
			likesSvg.style.fillOpacity = 1;
			btn.previousElementSibling.textContent = +btn.previousElementSibling.textContent + 1;
		} else {
			isLiked = false;
			likesSvg.style = ``;
			btn.previousElementSibling.textContent = +btn.previousElementSibling.textContent - 1;
		}
	});
});
