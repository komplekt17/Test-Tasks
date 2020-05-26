import { IState } from "../types"

const initialState = {
	positions: ["ToDo", "InProgress", "Done"],
	tasks: [
		{
			id: 0,
			label: 0,
			text: "Task-1",
			priority: 1,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 1,
			label: 1,
			text: "Task-2",
			priority: 2,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 2,
			label: 2,
			text: "Task-3",
			priority: 3,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 3,
			label: 0,
			text: "Task-4",
			priority: 1,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 4,
			label: 1,
			text: "Task-5",
			priority: 2,
			createDate: "2019-09-07T16:06:48.517Z",
		},
		{
			id: 5,
			label: 2,
			text: "Task-6",
			priority: 3,
			createDate: "2019-09-07T16:06:48.517Z",
		},
	],
}

export const Reducer = (state: IState = initialState, action: any) => {
	switch (action.type) {
		case "ANY_HANDLER_ACTION":
			return {
				...state,
			}

		default:
			return state
	}
}
