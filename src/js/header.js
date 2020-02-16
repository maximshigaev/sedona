const closeBtn = document.querySelector(`.header__closeButton`);
const openBtn = document.querySelector(`.header__openButton`);
const menu = document.querySelector(`.header__list`);

menu.classList.remove(`no-js`);

closeBtn.addEventListener(`click`, function(e) {
	menu.style.display = `none`;
	menu.style.paddingBottom = `0px`;
	openBtn.style.display = `block`;
	e.target.style.display = `none`;
});

openBtn.addEventListener(`click`, function(e) {
	menu.style.display = `block`;
	menu.style.paddingBottom = `56px`;
	closeBtn.style.display = `block`;
	e.target.style.display = `none`;
});
