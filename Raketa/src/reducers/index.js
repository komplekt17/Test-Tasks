// получаем данные из localStorage
let localNotes = JSON.parse(localStorage.getItem('notes'));
let initialNotes = [
	{
		id: '0',
		note: 'Make homework React',
		datetime: '23.05.2019, 11:11',
		done: false,
		important: true,
		visible: true
	},
	{
		id: '1',
		note: 'Create homework Redux',
		datetime: '23.05.2019, 16:12',
		done: true,
		important: false,
		visible: true
	},
	{
		id: '2',
		note: 'Get a react`s practice',
		datetime: '26.05.2019, 14:32',
		done: false,
		important: false,
		visible: true
	},
	{
		id: '3',
		note: 'Have a lunch',
		datetime: '22.05.2019, 11:12',
		done: false,
		important: false,
		visible: true
	}
];

const initialState = {
	notes: localNotes ? localNotes : [], // [] or initialNotes
	buttonsArr: [
		{ nameFilter: 'all', labelFilter: 'All' },
		{ nameFilter: 'active', labelFilter: 'Active' },
		{ nameFilter: 'important', labelFilter: 'Important' },
		{ nameFilter: 'done', labelFilter: 'Done' }
		//{ nameFilter: "total", labelFilter: "Total" }
	],
	valueInput: '',
	filter: 'all',
	searchInput: ''
};

// генератор случайного ID
const idRand = () => {
	const id = Math.random();
	return id.toString();
};

// обработка дат с одним знаком
const addZero = val => {
	var valString = val + '';
	if (valString.length < 2) {
		return '0' + valString;
	} else {
		return valString;
	}
};

// получение отформатированной даты
const getTimeDate = () => {
	const d = new Date().getDate();
	const m = addZero(new Date().getMonth() + 1);
	const y = new Date().getFullYear();
	const hh = addZero(new Date().getHours());
	const mm = addZero(new Date().getMinutes());

	return d + '.' + m + '.' + y + ', ' + hh + ':' + mm;
};

// обработчик input редактируемой записи
const editNote = (state, value, idx) => {
	const arr = state.notes.slice();
	const index = arr.findIndex(param => param.id === idx);
	arr[index].note = value;

	return arr;
};

// сохранение редактируемой записи
const saveEditNote = (state, value, idx) => {
	const arr = state.notes.slice();
	const index = arr.findIndex(param => param.id === idx);
	arr[index].note = value;
	arr[index].visible = !arr[index].visible;

	return arr;
};

// обработчик добавления новой заметки
const addNewNote = (state, text) => {
	const arr = state.notes.slice();
	const newNote = {
		id: idRand(),
		note: text,
		datetime: getTimeDate(),
		done: false,
		important: false,
		visible: true
	};
	arr.push(newNote);
	return arr;
};

// обработчик кнопок ToggleDone, importantNote, deleteNote
const buttonsOperations = (state, name, idx) => {
	const arr = state.notes.slice();
	const index = arr.findIndex(param => param.id === idx);
	if (name === 'importantNote') {
		arr[index].important = !arr[index].important;
	} else if (name === 'deleteNote') {
		arr.splice(index, 1);
	} else if (name === 'ToggleDone') {
		arr[index].done = !arr[index].done;
	} else {
		// name === editNote
		arr[index].visible = !arr[index].visible;
	}
	return arr;
};
// смена активного фильтра и подсвечивание его кнопки
const onFilter = (state, indexFilter) => {
	let filter = '';
	if (state.buttonsArr[indexFilter].nameFilter === 'all') {
		filter = 'all';
	}
	if (state.buttonsArr[indexFilter].nameFilter === 'active') {
		filter = 'active';
	}
	if (state.buttonsArr[indexFilter].nameFilter === 'important') {
		filter = 'important';
	}
	if (state.buttonsArr[indexFilter].nameFilter === 'done') {
		filter = 'done';
	}
	return filter;
};

export const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_VALUE_INPUT':
			if (action.name === 'addNote') {
				return {
					...state,
					valueInput: action.value
				};
			} else if (action.name === 'editNote') {
				return {
					...state,
					notes: editNote(state, action.value, action.idx)
				};
			}
			// name === searchNote
			else {
				return {
					...state,
					searchInput: action.value
				};
			}

		case 'HANDLER_ADD_NOTE':
			return {
				...state,
				notes: addNewNote(state, action.text),
				valueInput: ''
			};

		case 'BUTTONS_OPERATION_NOTE':
			return {
				...state,
				notes: buttonsOperations(state, action.name, action.idx)
			};

		case 'SAVE_EDITABLE_NOTE':
			return {
				...state,
				notes: saveEditNote(state, action.value, action.idx),
				valueInput: ''
			};

		case 'HANDLER_FILTER':
			return {
				...state,
				filter: onFilter(state, action.indexFilter)
			};

		default:
			return state;
	}
};
