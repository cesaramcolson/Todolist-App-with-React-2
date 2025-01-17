import React from "react";

const TodoList = () => {
	return (
		<>
			<h1>todos</h1>
			<div className="list">
				<input type="text" className="form-control" placeholder="What needs to be done?"/>
				<ul>
					<li>My first todo</li>
					<li>My first todo</li>
					<li>My first todo</li>
				</ul>
			</div>
			<div className="borderOne"></div>
			<div className="borderTwo"></div>
		</>
	);
};

export default TodoList;
