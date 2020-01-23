const handlerInputAction = (name, value, idx) => {
	console.log(name, value, idx);
	return {
		type: 'SAVE_VALUE_INPUT',
		name,
		value,
		idx
	};
};

const addNewNoteAction = text => {
	return {
		type: 'HANDLER_ADD_NOTE',
		text
	};
};

const buttonsOperationAction = (name, idx) => {
	return {
		type: 'BUTTONS_OPERATION_NOTE',
		name,
		idx
	};
};

const saveEditNoteAction = (idx, value) => {
	return {
		type: 'SAVE_EDITABLE_NOTE',
		idx,
		value
	};
};

const handlerFilterAction = idx => {
	return {
		type: 'HANDLER_FILTER',
		indexFilter: idx
	};
};

export {
	handlerInputAction, // общий обработчик input`ов
	addNewNoteAction, // обработчик добавления новой заметки
	buttonsOperationAction, // обработчик кнопок ToggleDone, importantNote, deleteNote
	saveEditNoteAction, // сохранение редактируемой записи
	handlerFilterAction // смена активного фильтра и подсвечивание его кнопки
};
