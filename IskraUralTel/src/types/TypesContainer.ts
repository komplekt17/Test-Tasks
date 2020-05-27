import { ITasks } from "./TypesReducer"

export interface IAppProps {
	store: {
		positions: string[],
		priorities: string[],
		tasks: ITasks[],
	};
	addNewTodo: (obj: { text: string, priority: number }) => void;
	changePropertyTask: (
		idx: number,
		name: string,
		value: string | number
	) => void;
}
