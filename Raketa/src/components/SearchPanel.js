import React from 'react';

import '../styles/SearchPanel.sass';

export const SearchPanel = ({ searchInput, handlerInput }) => {
	return (
		<div className="todo-list-item">
			<div className="input-group input-group-sm">
				<input
					value={searchInput}
					onChange={ev => handlerInput(ev.target.name, ev.target.value)}
					className="form-control search"
					name="searchNote"
					placeholder="Search note"
					type="text"
				/>
			</div>
		</div>
	);
};
