import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Button, TextField } from "@material-ui/core"

interface IPanelTextProps {
	idTask: number;
	textTask: string;
	flag: boolean;
	handlerPropertyTask: (ev: any, typeName?: string) => void;
	changePropertyTask: (
		idx: number,
		name: string,
		value: string | number
	) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: 150,
			},
		},
		button: {
			backgroundColor: "#57b53f",
			marginTop: 10,
		},
	})
)

export const PanelEditorText: React.FC<IPanelTextProps> = props => {
	const {
		idTask,
		textTask,
		flag,
		handlerPropertyTask,
		changePropertyTask,
	} = props

	const classes = useStyles()

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<div>
				<TextField
					id="standard-size-normal"
					name="text"
					value={textTask}
					onChange={ev => handlerPropertyTask(ev)}
				/>
				<Button
					className={classes.button}
					disabled={textTask === ""}
					size="small"
					variant="contained"
					color="primary"
					onClick={() => {
						changePropertyTask(idTask, "text", textTask)
						const newfields = {
							idx: 888,
							text: textTask,
							panelText: !flag,
						}
						handlerPropertyTask(newfields, "updateText")
					}}
				>
					Save
				</Button>
			</div>
		</form>
	)
}
