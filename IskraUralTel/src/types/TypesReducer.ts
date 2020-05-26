export interface ITasks {
	id: number;
	label: number;
	text: string;
	priority: number;
	createDate: string; // Date
}

export interface IState {
	positions: string[];
	tasks: ITasks[];
}
