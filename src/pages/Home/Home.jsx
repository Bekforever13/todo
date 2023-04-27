import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import 'boxicons'
import './Home.scss'
import Todos from '../../components/Todos'

const Home = () => {
	const { state, dispatch } = useContext(AuthContext)
	const [tasks, setTasks] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		if (!state.token) {
			navigate('/login', { replace: true })
		} else {
			axios
				.get('https://todo.paydali.uz/api/tasks', {
					headers: {
						Authorization: 'Bearer ' + state.token,
					},
				})
				.then(res => setTasks(res.data.payload))
				.catch(err => {
					if (err.response.status === 401) {
						navigate('/login', { replace: true })
					}
				})
		}
	}, [state])

	return (
		<>
			<Todos
				tasks={tasks}
				state={state}
				dispatch={dispatch}
				setTasks={setTasks}
			/>
		</>
	)
}

export default Home
