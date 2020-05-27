import React from "react"
import { connect } from "react-redux"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import * as actions from "../actions"
import { ListTasks, CreaterTodo } from "../components"
import { IAppProps, ITasks } from "../types"
import "../styles/App.sass"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginTop: 100,
			paddingRight: 150,
			paddingLeft: 150,
		},
		paper: {
			padding: theme.spacing(1),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
	})
)

const App: React.FC<IAppProps> = props => {
	const classes = useStyles()
	const { store, addNewTodo, changePropertyTask } = props
	const { positions, priorities, tasks } = store

	// сортировка тасков по статусу (ToDo, InProgress, Done)
	const getTasksByStatus = (status: string): ITasks[] => {
		// находим индекс элемента со значением === status
		const idx = positions.indexOf(status)
		const arr = tasks.filter(task => task.label === +idx)

		return arr
	}

	const listCard = positions.map((i, idx) => {
		return (
			<Grid key={idx} item xs={12} md={4} className="App">
				<Paper className={classes.paper}>
					<ListTasks
						tasks={getTasksByStatus(positions[idx])}
						status={positions[idx]}
						position={idx}
						changePropertyTask={changePropertyTask}
					/>
				</Paper>
			</Grid>
		)
	})

	return (
		<div className={classes.root}>
			<Grid container spacing={10}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<CreaterTodo priorities={priorities} addNewTodo={addNewTodo} />
					</Paper>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={3}
				direction="row"
				justify="center"
				alignItems="baseline"
			>
				{listCard}
			</Grid>
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		addNewTodo: (obj: any) => dispatch(actions.addNewTodoAction(obj)),
		changePropertyTask: (
			idx: number,
			name: string,
			value: string | number
		) => dispatch(actions.changePropertyTaskAction(idx, name, value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
