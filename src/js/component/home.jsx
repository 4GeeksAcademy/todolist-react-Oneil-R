import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const apiUrl = 'https://playground.4geeks.com/todo'
  
	const handleInputChange = (e) => {
	  setInputValue(e.target.value);
	};
	const createTaskList = async ()=>{
		let response = await fetch (apiUrl + '/users/Oneil-R', {method:'POST'})
		if(response.status == 201){
			getTaskList()
		}else{
			alert('An error occurred while trying to create your list. Please try again later')
		}

	}
	const getTaskList = async ()=>{
		let response = await fetch (apiUrl + '/users/Oneil-R')
		if (response.status == 200){
		let data = await response.json()
		setTasks(data.todos)
		}else if (response.status ==404){
			createTaskList()
		}else{
			alert('An error occurred while trying to get todo list. Please try again later')
		}

	}
	useEffect(()=>{
		getTaskList()
	} , [])

	const handleAddTask = async (e) => {
	  if (e.key === 'Enter' && inputValue.trim() !== '') {
		let response = await fetch (apiUrl + '/todos/Oneil-R', {method:'POST', headers:{'Content-Type':'application/json' }, body:JSON.stringify({label:inputValue, is_done:false}) })
		if(response.status == 201){
			setInputValue('')
			getTaskList()
		}else{
			alert('An error occurred while trying to add task to the list. Please try again later')
		}
	  }
	};
  
	const handleDeleteTask = async (id) => {
		let response = await fetch (apiUrl + '/todos/' + id , {method:'DELETE' })
		if(response.status == 204){
			getTaskList()
		}else{
			alert('An error occurred while trying to delete task to the list. Please try again later')
		}
	};
  

	return (
	  <div className="todo-container">
		<h1 className="todo-title">todos</h1>
		<div className="todo-input-container">
		  <input
			type="text"
			className="todo-input"
			placeholder="What needs to be done?"
			value={inputValue}
			onChange={handleInputChange}
			onKeyDown={handleAddTask}
		  />
		</div>
		<ul className="todo-list">
		  {tasks.length === 0 ? (
			<li className="todo-item no-tasks">No tasks, add a task</li>
		  ) : (
			tasks.map((task, index) => (
			  <li key={index} className="todo-item">
				{task.label}
				<span
				  className="delete-icon"
				  onClick={() => handleDeleteTask(task.id)}
				>
				  &#x2716;
				</span>
			  </li>
			))
		  )}
		</ul>
		<div className="todo-footer">
		  {tasks.length} item{tasks.length !== 1 && 's'} left
		</div>
	  </div>
	);
  };
  export default Home;
