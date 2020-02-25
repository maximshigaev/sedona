import { showModal, failureModal } from './feedback.js';
import { submitForm, showSpinner } from './backend.js';

const formFields = Array.from(document.querySelectorAll(`input:not([type="radio"]):not([type="checkbox"])`));
const TEL_REG_EXP = /\d{11}/;
const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const PERSONAL_REG_EXP = /^[А-яA-z]{2,20}$/;
const FIELD_REG_EXP_MAP = {
	firstName: PERSONAL_REG_EXP,
	secondName: PERSONAL_REG_EXP,
	thirdName: PERSONAL_REG_EXP,
	tel: TEL_REG_EXP,
	email: EMAIL_REG_EXP
};
const invalidFields = new Set();
let isValid = true;

const createHint = (field, mode) => {
	const hint = document.createElement(`div`);
	let content = null;

	hint.classList.add(`hint`);

	switch (mode) {
	case `empty`:
		content = `Данное поле обязательно для заполнения`;
		break;

	case `tel`:
		content = `Телефон должен состоять ровно из 11 цифр`;
		break;

	case `email`:
		content = `Email должен содержать символ @ и доменную зону`;
		break;

	case `firstName`:
		content = `Имя должно содержать не менее 2 и не более 20 букв русского или латинского алфавита`;
		break;

	case `secondName`:
		content = `Фамилия должна содержать не менее 2 и не более 20 букв русского или латинского алфавита`;
		break;

	case `thirdName`:
		content = `Отчество должно содержать не менее 2 и не более 20 букв русского или латинского алфавита`;
		break;
	}

	hint.textContent = content;
	hint.style = `width: ${field.clientWidth}px; left: ${field.offsetLeft}px;
			top: ${field.offsetTop + field.clientHeight - 5}px;`;
	field.insertAdjacentElement(`afterend`, hint);
};

const showMistake = (field, mode = `empty`) => {
	field.style.boxShadow = `0 0 0 1px red`;
	createHint(field, mode);
	invalidFields.add(field);
	isValid = false;
};

const inputFocusHandler = (evt) => {
	const hint = evt.target.nextElementSibling;
	evt.target.style = ``;

	if (hint && hint.classList.contains(`hint`)) {
		hint.remove();
	}
};

const validateField = (value, regExp) => regExp.test(value);

const checkValidity = (input) => {
	const isFieldValid = (input.name === `tel`)
		? validateField(input.value.replace(/-|\+|\(|\)/g, ``), FIELD_REG_EXP_MAP[input.name])
		: validateField(input.value, FIELD_REG_EXP_MAP[input.name]);

	if (!isFieldValid) {
		if (!invalidFields.has(input)) {
			input.addEventListener(`focus`, inputFocusHandler);
		}

		showMistake(input, input.name);
	}
};

const validateForm = () => {
	const hints = document.querySelectorAll(`.hint`);
	hints.forEach((hint) => hint.remove());

	formFields.forEach((field) => {
		field.style = ``;

		if (field.hasAttribute(`data-required`) && !field.value) {
			if (!invalidFields.has(field)) {
				field.addEventListener(`focus`, inputFocusHandler);
			}

			showMistake(field);

		} else if (invalidFields.has(field)) {
			invalidFields.delete(field);
		}

		if (field.value) {
			checkValidity(field);
		}
	});

	isValid = (!invalidFields.size)
		? true
		: false;

	if (isValid) {
		const formData = new FormData(document.forms[0]);

		showSpinner();
		submitForm(formData);
	} else {
		showModal(failureModal);
	}
};

export { validateForm, isValid };
