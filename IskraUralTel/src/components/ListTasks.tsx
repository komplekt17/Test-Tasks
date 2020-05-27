import React, { useState } from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import { Tooltip, IconButton, List } from "@material-ui/core"
import SortIcon from "@material-ui/icons/Sort"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { ITasks } from "../types"
import { GroupTasks } from "./ItemTask"
import "../styles/ListTasks.sass"

interface IListTasksProps {
	tasks: ITasks[];
	status: string;
	position: number;
	changePropertyTask: (
		idx: number,
		name: string,
		value: string | number
	) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			backgroundColor: theme.palette.background.paper,
			color: "#000",
		},
	})
)

export const ListTasks: React.FC<IListTasksProps> = props => {
	const { tasks, status, position, changePropertyTask } = props
	const classes = useStyles()

	const [filter, setFilter] = useState(0)

	// получение сортированного массива tasks по значению фильтра
	const getTasksSorted = (tasks: ITasks[], filter: number): ITasks[] => {
		if (filter === 0) return tasks
		else {
			const arr = tasks.filter(task => task.priority === filter)
			return arr
		}
	}

	return (
		<List
			component="nav"
			className={classes.root}
			aria-label="mailbox folders"
		>
			<div className={`card-header color-header-${position}`}>
				{status}
				<Tooltip title="by Red" placement="top-start">
					<IconButton edge="end" aria-label="sort" onClick={() => setFilter(1)}>
						<SortIcon style={{ color: "red", fontSize: 20 }} />
					</IconButton>
				</Tooltip>

				<Tooltip title="by Yellow" placement="top-start">
					<IconButton edge="end" aria-label="sort" onClick={() => setFilter(2)}>
						<SortIcon style={{ color: "yellow", fontSize: 20 }} />
					</IconButton>
				</Tooltip>

				<Tooltip title="by Green" placement="top-start">
					<IconButton edge="end" aria-label="sort" onClick={() => setFilter(3)}>
						<SortIcon style={{ color: "green", fontSize: 20 }} />
					</IconButton>
				</Tooltip>

				<Tooltip title="by All" placement="top-start">
					<IconButton
						edge="end"
						aria-label="checkCircle"
						onClick={() => setFilter(0)}
					>
						<CheckCircleIcon style={{ color: "black", fontSize: 20 }} />
					</IconButton>
				</Tooltip>
			</div>
			<GroupTasks
				tasks={getTasksSorted(tasks, filter)}
				changePropertyTask={changePropertyTask}
			/>
		</List>
	)
}
