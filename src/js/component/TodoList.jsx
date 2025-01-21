import React, {useState} from "react";

const TodoList = () => {
	const [ taskList , setTaskList ] = useState([])
	const [ newTask , setNewTask ] = useState("")
	return (
		<>
			<h1>todos</h1>
			<div className="list">
				<input 
					type="text" 
					className="form-control" 
					placeholder="What needs to be done?"
					onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setTaskList([...taskList, newTask])
						}
					}}
				/>
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
