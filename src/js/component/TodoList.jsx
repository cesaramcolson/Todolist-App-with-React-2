import React, {useEffect, useState} from "react";

const TodoList = () => {
	const [ taskList , setTaskList ] = useState([])
	const [ newTask , setNewTask ] = useState("")

	const apiRoute= 'https://playground.4geeks.com/todo/'

	const createUser = async () => {
		try {
				const response = await fetch(`${apiRoute}users/cesar`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (!response.ok) {
					console.error('Error: ', response.status, response.statusText);	
				}
				return response.json();
		} catch (error) {
			console.error('Request Failed: ', error.message);
		}
	};

	const fetchTasks = async () => {
		try {
			const response = await fetch(`${apiRoute}users/cesar`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!response.ok) {
				if (response.status === 404) {
					await createUser();
					return fetchTasks();
				}
				console.error('Error: ', response.status, response.statusText)
				return;
			}
			const body = await response.json();
			if (body && body.todos) {
				setTaskList(body.todos.map(task => ({ label: task.label, id: task.id })));
			}
			
		} catch (error) {
			console.error('Request Failed: ', error.message);
		}
	};

	const addTask = async () => {
		if (!newTask.trim()) {
			console.error("Task cannot be empty");
			return;
		}
		try {
			const response = await fetch(`${apiRoute}todos/cesar`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"label": newTask,
                    "is_done": false
				})
			});
			if (!response.ok) {
				console.error('Error: ', response.status, response.statusText);	
				return;
			}
			const body = await response.json();
			const newTaskWithId = { label: newTask, id: body.id };
            setTaskList(prevTasks => [...prevTasks, newTaskWithId]);
            setNewTask("");

		} catch (error) {
			console.error('Request Failed: ', error.message);
		}
	}

	const removeTask = async (index) => {
		const taskToRemove = taskList[index]
		const updatedTasks = taskList.filter((t, currentIndex) => index !== currentIndex);
		try {
			const response = await fetch(`${apiRoute}todos/${taskToRemove.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
                setTaskList(updatedTasks);
			} else {
                console.error("Failed to delete task:", response.statusText);
            }
        } catch (error) {
            console.error("Request Failed: ", error.message);
        }
    };

	const deleteUser = async () => {
		try {
			const response = await fetch(`${apiRoute}users/cesar`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				setTaskList([]);
				await createUser()
				return fetchTasks();
			} else {
                console.error("Failed to delete tasks:", response.statusText);
            }
        } catch (error) {
            console.error("Request Failed: ", error.message);
        }
    };

	useEffect(() => {
		fetchTasks();
	}, []);

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
							addTask();
						}
					}}
				/></li>
					{taskList.map((item, index ) => (
						<li key={item.id}>
							<span>{item.label}</span>
							<div className="trashIcon">
								<i 
									className="fa-solid fa-trash"
									onClick={() => removeTask(index)}
								></i>
							</div>
						</li>
					))}
				</ul>
				<div>
					<p>{taskList.length === 0 ? "No pending task" : `${taskList.length} pending ${taskList.length === 1 ? "task" : "tasks"}`}</p>
				</div>
				<div className="deleteAll">
					<button type="button" className="deleteButton btn btn-danger" onClick={() => deleteUser()}>Clear All <i className="fa-solid fa-trash"></i></button>
				</div>
			</div>
			<div className="borderOne"></div>
			<div className="borderTwo"></div>
		</>
	);
};

export default TodoList;
