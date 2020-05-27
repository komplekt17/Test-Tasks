import React, { useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core"

import { ITasks } from "../types"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: 200,
			},
		},
		button: {
			backgroundColor: "#57b53f",
			marginTop: 20,
			width: 150,
		},
	})
)

interface ICreaterTodoProps {
	priorities: string[];
	addNewTodo: (obj: ITasks) => void;
}

export const CreaterTodo: React.FC<ICreaterTodoProps> = props => {
	const { priorities, addNewTodo } = props
	const classes = useStyles()

	const initialState = { textTodo: "", priorityTodo: 1 }
	const [fields, setFields] = useState(initialState)

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<div>
				<TextField
					label="Text Todo"
					id="standard-size-normal"
					name="textTodo"
					value={fields.textTodo}
					onChange={ev =>
						setFields({ ...fields, [ev.target.name]: ev.target.value })
					}
				/>
				<TextField
					id="standard-select-currency-native"
					select
					name="priorityTodo"
					label="Choose priority"
					value={fields.priorityTodo}
					onChange={ev =>
						setFields({ ...fields, [ev.target.name]: Number(ev.target.value) })
					}
					SelectProps={{
						native: true,
					}}
				>
					{priorities.map((option, index) => (
						<option key={index} value={index + 1}>
							{option}
						</option>
					))}
				</TextField>
				<Button
					className={classes.button}
					disabled={fields.textTodo === ""}
					variant="contained"
					color="primary"
					onClick={() => {
						console.log(new Date())
						addNewTodo({
							id: Number(new Date()),
							label: 0,
							text: fields.textTodo,
							priority: Number(fields.priorityTodo),
							createDate: new Date().toString(),
						})
						setFields({
							...fields,
							textTodo: "",
							priorityTodo: 1,
						})
					}}
				>
					Add todo
				</Button>
			</div>
		</form>
	)
}
