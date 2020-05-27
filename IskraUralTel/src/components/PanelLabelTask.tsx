import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { red, blue, green } from "@material-ui/core/colors"
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

const BlueRadio = withStyles({
	root: {
		color: blue[400],
		"&$checked": {
			color: blue[600],
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

interface IPanelLabelProps {
	idTask: number;
	flag: boolean;
	handlerPropertyTask: (ev: any, typeName?: string) => void;
	changePropertyTask: (
		idx: number,
		name: string,
		value: string | number
	) => void;
}

export const PanelLabelTask: React.FC<IPanelLabelProps> = props => {
	const { idTask, flag, handlerPropertyTask, changePropertyTask } = props

	return (
		<div>
			<RedRadio
				onChange={() => {
					changePropertyTask(idTask, "label", 0)
					const newfields = { panelPriority: !flag }
					handlerPropertyTask(newfields, "udatePosition")
				}}
				value="0"
				name="priority"
				inputProps={{ "aria-label": "0" }}
			/>
			<BlueRadio
				onChange={() => {
					changePropertyTask(idTask, "label", 1)
					const newfields = { panelPriority: !flag }
					handlerPropertyTask(newfields, "udatePosition")
				}}
				value="1"
				inputProps={{ "aria-label": "1" }}
			/>
			<GreenRadio
				onChange={() => {
					changePropertyTask(idTask, "label", 2)
					const newfields = { panelPosition: !flag }
					handlerPropertyTask(newfields, "udatePosition")
				}}
				value="2"
				inputProps={{ "aria-label": "2" }}
			/>
		</div>
	)
}
