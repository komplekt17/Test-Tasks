/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { ListTasks } from "../components"
import { IAppProps, ITasks } from "../types"
import "../styles/App.sass"

const App: React.FC<IAppProps> = props => {
	const { store, anyHandler } = props
	const { positions, tasks } = store

	// сортировка тасков по статусу (ToDo, InProgress, Done)
	const getTasksByStatus = (status: string): ITasks[] => {
		// находим индекс элемента со значением === status
		const idx = positions.indexOf(status)
		const arr = tasks.filter(task => task.label === +idx)

		return arr
	}

	return (
		<div className="App">
			<ListTasks
				tasks={getTasksByStatus(positions[0])}
				status={positions[0]}
			/>
			<ListTasks
				tasks={getTasksByStatus(positions[1])}
				status={positions[1]}
			/>
			<ListTasks
				tasks={getTasksByStatus(positions[2])}
				status={positions[2]}
			/>
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		anyHandler: (payload: any) =>
			dispatch(actions.anyHandlerAction(payload)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
