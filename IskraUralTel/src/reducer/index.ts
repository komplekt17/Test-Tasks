import { IState, ITasks } from "../types"

const initialState = {
	positions: ["ToDo", "InProgress", "Done"],
	priorities: ["Red", "Yellow", "Green"],
	tasks: [
		{
			id: 0,
			label: 0,
			text: "Task-01",
			priority: 1,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 1,
			label: 1,
			text: "Task-02",
			priority: 2,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 2,
			label: 2,
			text: "Task-03",
			priority: 3,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 3,
			label: 0,
			text: "Task-04",
			priority: 1,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 4,
			label: 1,
			text: "Task-05",
			priority: 2,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 5,
			label: 2,
			text: "Task-06",
			priority: 3,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 6,
			label: 1,
			text: "Task-07",
			priority: 2,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 7,
			label: 2,
			text: "Task-08",
			priority: 3,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 8,
			label: 0,
			text: "Task-09",
			priority: 1,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 9,
			label: 0,
			text: "Task-10",
			priority: 3,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 10,
			label: 1,
			text: "Task-11",
			priority: 1,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 11,
			label: 2,
			text: "Task-12",
			priority: 2,
			createDate: "2019-09-07T16:06:48.517Z",
		},
	],
}

// добавление таска
const addTask = (state: IState, obj: ITasks): ITasks[] => {
	const arr = state.tasks.slice()
	arr.push(obj)

	return arr
}

// изменение статуса выполнения, приоритетности и текста таска
const changePropertyTask = (
	state: IState,
	idx: number | undefined,
	nameProperty: string | undefined,
	valueProperty: string | undefined
): ITasks[] => {
	const arr = state.tasks.slice()

	const index = arr.findIndex(task => task.id === idx)

	const taskObj: any = arr[index]
	for (const key in taskObj) {
		if (key === nameProperty) {
			taskObj[key] = valueProperty
		}
	}

	return arr
}

export const Reducer = (
	state: IState = initialState,
	action: {
		type: string,
		obj?: any,
		idx?: number,
		name?: string,
		value?: string,
		text?: string,
	}
) => {
	switch (action.type) {
		case "ADD_TODO_ACTION":
			return {
				...state,
				tasks: addTask(state, action.obj),
			}

		case "CHANGE_PROPERTY_TASK_ACTION":
			return {
				...state,
				tasks: changePropertyTask(
					state,
					action.idx,
					action.name,
					action.value
				),
			}

		default:
			return state
	}
}
