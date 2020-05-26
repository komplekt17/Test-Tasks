import React from "react"
import { ITasks } from "../types"
import "../styles/ItemTask.sass"

interface ITaskItemProps {
	item: ITasks;
}

export const ItemTask: React.FC<ITaskItemProps> = ({ item }) => {
	return <div className="task-item">{item.text}</div>
}
