import { ITasks } from "./TypesReducer"

export interface IAppProps {
	store: {
		positions: string[],
		tasks: ITasks[],
	};
	anyHandler: (payload: any) => void;
}
