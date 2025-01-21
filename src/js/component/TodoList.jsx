import React, {useState} from "react";

const TodoList = () => {
	const [ taskList , setTaskList ] = useState([])
	const [ newTask , setNewTask ] = useState("")
	return (
		<>
			<h1>todos</h1>
			<div className="list">
				<ul>
					<li><input 
					type="text" 
					className="form-control" 
					placeholder="What needs to be done?"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && newTask.trim() !== "") {
							setTaskList([...taskList, newTask.trim()])
							setNewTask('')
						}
					}}
				/></li>
					{taskList.map((item, index ) => (
						<li>
							<span>{item}</span>
							<div className="trashIcon">
								<i 
									className="fa-solid fa-trash"
									onClick={() => setTaskList(
										taskList.filter(
											(t, currentIndex) =>
												index !== currentIndex
										)
									)}
								></i>
							</div>
						</li>
					))}
				</ul>
				<div>
					<p>{taskList.length === 0 ? "No pending task" : `${taskList.length} pending ${taskList.length === 1 ? "task" : "tasks"}`}</p>
				</div>
			</div>
			<div className="borderOne"></div>
			<div className="borderTwo"></div>
		</>
	);
};

export default TodoList;
