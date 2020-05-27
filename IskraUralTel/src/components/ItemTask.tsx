import React, { useState } from "react"
import {
	Tooltip,
	IconButton,
	ListItem,
	ListItemText,
} from "@material-ui/core"
import DoneOutlineIcon from "@material-ui/icons/DoneOutline"
import EditIcon from "@material-ui/icons/Edit"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import { PanelEditorText } from "./PanelEditorText"
import { PanelPriorityTask } from "./PanelPriorityTask"
import { PanelLabelTask } from "./PanelLabelTask"
import { ITasks } from "../types"

interface ITaskItemProps {
	tasks: ITasks[];
	changePropertyTask: (
		idx: number,
		name: string,
		value: string | number
	) => void;
}

export const GroupTasks: React.FC<ITaskItemProps> = props => {
	const { tasks, changePropertyTask } = props

	const initialState = {
		idx: 888,
		text: "",
		panelText: false,
		panelPriority: false,
		panelPosition: false,
	}
	const [flags, setFlags] = useState(initialState)

	const handlerPropertyTask = (ev: any, typeName?: string) => {
		// обновление text стейта после сохранения редактирования
		if (typeName === "updateText") {
			setFlags({
				...flags,
				idx: 888,
				text: ev.text,
				panelText: ev.panelText,
			})
		}
		// обновление priority стейта после сохранения редактирования
		else if (typeName === "udatePriority") {
			setFlags({
				...flags,
				idx: 888,
				panelPriority: ev.panelPriority,
			})
		}
		// обновление position стейта после сохранения редактирования
		else if (typeName === "udatePosition") {
			setFlags({
				...flags,
				idx: 888,
				panelPosition: ev.panelPosition,
			})
		}
		// обновление стейта после начала редактирования текста
		else {
			setFlags({ ...flags, [ev.target.name]: ev.target.value })
		}
	}

	const showPanels = (flags: any, item: ITasks) => {
		if (flags.panelText && item.id === flags.idx) {
			return (
				<PanelEditorText
					idTask={flags.idx}
					textTask={flags.text}
					flag={flags.panelText}
					changePropertyTask={changePropertyTask}
					handlerPropertyTask={handlerPropertyTask}
				/>
			)
		} else if (flags.panelPriority && item.id === flags.idx) {
			return (
				<PanelPriorityTask
					idTask={flags.idx}
					flag={flags.panelPriority}
					changePropertyTask={changePropertyTask}
					handlerPropertyTask={handlerPropertyTask}
				/>
			)
		} else if (flags.panelPosition && item.id === flags.idx) {
			return (
				<PanelLabelTask
					idTask={flags.idx}
					flag={flags.panelPosition}
					changePropertyTask={changePropertyTask}
					handlerPropertyTask={handlerPropertyTask}
				/>
			)
		} else {
			return (
				<>
					<ListItemText primary={item.text} />
					<Tooltip title="to Editor text" placement="top-start">
						<IconButton
							edge="end"
							aria-label="edit"
							onClick={() =>
								setFlags({
									...flags,
									idx: item.id,
									text: item.text,
									panelText: !flags.panelText,
								})
							}
						>
							<EditIcon style={{ color: "green", fontSize: 18 }} />
						</IconButton>
					</Tooltip>
					<Tooltip title="to Change priority" placement="top-start">
						<IconButton
							edge="end"
							aria-label="importExport"
							onClick={() => {
								setFlags({
									...flags,
									idx: item.id,
									panelPriority: !flags.panelPriority,
								})
							}}
						>
							<ImportExportIcon style={{ color: "tomato", fontSize: 18 }} />
						</IconButton>
					</Tooltip>
					<Tooltip title="to Change position" placement="top-start">
						<IconButton
							edge="end"
							aria-label="doneOutline"
							onClick={() =>
								setFlags({
									...flags,
									idx: item.id,
									panelPosition: !flags.panelPosition,
								})
							}
						>
							<DoneOutlineIcon style={{ color: "blue", fontSize: 18 }} />
						</IconButton>
					</Tooltip>
				</>
			)
		}
	}

	let listTasks: any = null
	if (tasks && tasks.length > 0) {
		listTasks = tasks.map(item => {
			return (
				<ListItem
					key={item.id}
					className={`priority-${item.priority}`}
					divider
					button
				>
					{showPanels(flags, item)}
				</ListItem>
			)
		})
	}

	return <>{listTasks}</>
}
