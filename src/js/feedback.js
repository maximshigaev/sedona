import Inputmask from "inputmask";
import { validateForm, isValid } from './validateForm.js';

const form = document.querySelector(`.feedback__form`);
const successModal = document.querySelector(`.modal--success`);
const failureModal = document.querySelector(`.modal--failure`);
const failureBtn = document.querySelector(`.modal--failure .modal__button`);
const successBtn = document.querySelector(`.modal--success .modal__button`);
const submitBtn = document.querySelector(`.feedback__button`);
const overlay = document.querySelector(`.overlay`);
const links = Array.from(document.querySelectorAll(`a`));
const TEL_MASK = new Inputmask(`+7(999)999-99-99`);

const disableScreen = () => {
	overlay.classList.remove(`hidden`);
	document.body.style.overflow = `hidden`;

	links.forEach((link) => {
		link.tabIndex = (!link.classList.contains(`modal__button`))
			? -1
			: 0;
	});

	Array.from(form.elements).forEach((field) => {
		field.disabled = true;
	});
};

const enableScreen = (modal) => {
	document.body.style.overflow = `visible`;
	overlay.classList.add(`hidden`);

	links.forEach((link) => {
		link.tabIndex = 0;
	});

	Array.from(form.elements).forEach((field) => {
		field.disabled = false;

		if (modal.classList.contains(`modal--success`)) {
			field.value = ``;
			field.checked = false;
		}
	});
};

const showModal = (modal) => {
	disableScreen();
	modal.classList.remove(`hidden`);
	window.addEventListener(`keydown`, windowEscDownHandler);
};

const windowEscDownHandler = (evt) => {
	if (evt.code === `Escape`) {
		const serverFailure = document.querySelector(`.serverFailure`);

		if (serverFailure) {
			enableScreen(serverFailure);
			serverFailure.remove();
			window.removeEventListener(`keydown`, windowEscDownHandler);
		} else {
			(isValid)
				? closeModal(successModal)
				: closeModal(failureModal);
		}
	}
};

const closeModal = (modal) => {
	enableScreen(modal);

	modal.classList.add(`hidden`);
	window.removeEventListener(`keydown`, windowEscDownHandler);
};

if (form) {
	TEL_MASK.mask(form.tel);

	form.addEventListener(`submit`, function(evt) {
		evt.preventDefault();
		validateForm();
	});

	submitBtn.addEventListener(`mousedown`, validateForm);
	failureBtn.addEventListener(`click`, () => closeModal(failureModal));
	successBtn.addEventListener(`click`, () => closeModal(successModal));
}

export { windowEscDownHandler, showModal, successModal, failureModal, disableScreen, enableScreen };
