import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { red, green, yellow } from "@material-ui/core/colors"
import Radio, { RadioProps } from "@material-ui/core/Radio"

const RedRadio = withStyles({
	root: {
		color: red[400],
		"&$checked": {
			color: red[600],
		},
	},
	checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const YellowRadio = withStyles({
	root: {
		color: yellow[400],
		"&$checked": {
			color: yellow[600],
		},
	},
	checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const GreenRadio = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600],
		},
	},
	checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

interface IPanelPriorityProps {
	idTask: number;
	flag: boolean;
	handlerPropertyTask: (ev: any, typeName?: string) => void;
	changePropertyTask: (
		idx: number,
		name: string,
		value: string | number
	) => void;
}

export const PanelPriorityTask: React.FC<IPanelPriorityProps> = props => {
	const { idTask, flag, handlerPropertyTask, changePropertyTask } = props

	return (
		<div>
			<RedRadio
				onChange={() => {
					changePropertyTask(idTask, "priority", 1)
					const newfields = { panelPriority: !flag }
					handlerPropertyTask(newfields, "udatePriority")
				}}
				value="1"
				inputProps={{ "aria-label": "1" }}
			/>
			<YellowRadio
				onChange={() => {
					changePropertyTask(idTask, "priority", 2)
					const newfields = { panelPriority: !flag }
					handlerPropertyTask(newfields, "udatePriority")
				}}
				value="2"
				inputProps={{ "aria-label": "2" }}
			/>
			<GreenRadio
				onChange={() => {
					changePropertyTask(idTask, "priority", 3)
					const newfields = { panelPriority: !flag }
					handlerPropertyTask(newfields, "udatePriority")
				}}
				value="3"
				inputProps={{ "aria-label": "3" }}
			/>
		</div>
	)
}
