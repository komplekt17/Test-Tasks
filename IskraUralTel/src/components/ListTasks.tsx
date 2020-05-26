import React from "react"
import { ITasks } from "../types"
import { ItemTask } from "./ItemTask"
import "../styles/ListTasks.sass"

interface IListTasksProps {
	tasks: ITasks[];
	status: string;
}

export const ListTasks: React.FC<IListTasksProps> = ({
	tasks,
	status,
}) => {
	let listTasks: any = null
	if (tasks && tasks.length > 0) {
		listTasks = tasks.map(item => {
			return <ItemTask key={item.id} item={item} />
		})
	}
	return (
		<>
			<div className="card-tasks">
				<div className="card-header">{status}</div>
				{listTasks}
			</div>
		</>
	)
}
