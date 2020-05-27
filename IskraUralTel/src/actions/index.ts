export const addNewTodoAction = (obj: {
	text: string,
	priority: number,
}) => {
	return {
		type: "ADD_TODO_ACTION",
		obj,
	}
}

export const changePropertyTaskAction = (
	idx: number,
	name: string,
	value: string | number
) => {
	return {
		type: "CHANGE_PROPERTY_TASK_ACTION",
		idx,
		name,
		value,
	}
}
