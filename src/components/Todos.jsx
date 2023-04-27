import { useState } from 'react'
import axios from 'axios'

const Todos = ({ tasks, state, dispatch, setTasks }) => {
	const [newTodo, setNewTodo] = useState('')

	function handleOnClick(e) {
		e.preventDefault()
		const newTaskData = {
			task: newTodo,
			description: newTodo,
		}
		const jsonData = JSON.stringify(newTaskData)
		console.log(jsonData)

		axios
			.post('https://todo.paydali.uz/api/tasks', jsonData, {
				headers: {
					Authorization: 'Bearer ' + state.token,
					'Content-Type': 'Application/json',
				},
			})
			.then(res => console.log(res))
			.catch(err => console.log(err))
			.finally(() =>
				axios
					.get('https://todo.paydali.uz/api/tasks', {
						headers: {
							Authorization: 'Bearer ' + state.token,
						},
					})
					.then(res => {
						setTasks(res.data.payload)
						console.log(setNewTodo, newTodo)
					})
			)
	}

	return (
		<>
			<form>
				<h1>To Do App</h1>
				<div>
					<input
						value={newTodo.task}
						onChange={e => setNewTodo(e.target.value)}
						placeholder='Enter new task ...'
						type='text'
					/>
					<button onClick={handleOnClick}>Save</button>
				</div>
				<ul>
					{tasks.map(todo => {
						return (
							<li key={todo.id}>
								{todo.task}
								<span>
									{todo.is_done ? (
										<box-icon name='check'></box-icon>
									) : (
										<box-icon name='checkbox'></box-icon>
									)}

									<box-icon name='edit-alt'></box-icon>
									<box-icon name='trash'></box-icon>
								</span>
							</li>
						)
					})}
					{/* <li>
						asdasd
						<span>
							<box-icon name='checkbox'></box-icon>
							<box-icon name='check'></box-icon>
							<box-icon name='edit-alt'></box-icon>
							<box-icon name='trash'></box-icon>
						</span>
					</li> */}
				</ul>
			</form>
		</>
	)
}

export default Todos
