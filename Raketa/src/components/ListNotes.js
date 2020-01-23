import React from 'react';

import '../styles/ListNotes.sass';

export const ListNotes = props => {
	const {
		visibleItems,
		handlerInput,
		buttonsOperation,
		saveEditNote
	} = props;

	const list = visibleItems.map((item, index) => {
		let classNames1 = 'todo-list-item-label';
		let classNames2 = 'input-group';
		let classNames3 = 'todo-list-item buttons';
		if (item.done) classNames1 += ' done';
		if (item.important) classNames1 += ' important';
		if (!item.visible) {
			classNames1 += ' done-3';
			classNames3 += ' done-3';
		} else {
			classNames2 += ' done-3';
		}

		return (
			<div key={index} className="list-group-item">
				<div className="todo-list-item">
					<span className="datetime">{item.datetime}</span>
					<div
						className={classNames1}
						onClick={() => buttonsOperation('ToggleDone', item.id)}
					>
						{item.note}
					</div>
					<div className={classNames2}>
						<input
							value={item.note}
							onChange={ev => {
								handlerInput('editNote', ev.target.value, item.id);
							}}
							className="form-control"
							placeholder="Enter answer number"
							type="text"
						/>
						<div className="input-group-append">
							<button
								onClick={() => saveEditNote(item.id, item.note)}
								className="btn btn-primary"
							>
								Save Note
							</button>
						</div>
					</div>
				</div>
				<div className={classNames3}>
					<button
						type="button"
						className="btn btn-outline-success btn-sm"
						onClick={() => buttonsOperation('editNote', item.id)}
					>
						<i className="fa fa-edit" />
					</button>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() => buttonsOperation('deleteNote', item.id)}
					>
						<i className="fa fa-trash" />
					</button>
					<button
						type="button"
						className="btn btn-outline-warning btn-sm"
						onClick={() => buttonsOperation('importantNote', item.id)}
					>
						<i className="fa fa-exclamation" />
					</button>
				</div>
			</div>
		);
	});

	return <div className="list-group todo-list">{list}</div>;
};
