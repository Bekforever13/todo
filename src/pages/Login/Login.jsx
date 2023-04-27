import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import Swal from 'sweetalert2'
import './Login.scss'

const Login = () => {
	const { state, dispatch } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	const [dataForBackend, setDataForBackend] = useState({
		phone: '',
		password: '',
	})

	const navigate = useNavigate()

	useEffect(() => {
		if (state.token) {
			navigate('/', { replace: true })
		}
	})

	function login(e) {
		e.preventDefault()
		setLoading(true)
		axios
			.post('https://todo.paydali.uz/api/login', dataForBackend)
			.then(res => {
				Swal.fire({
					title: 'Welcome to our site',
					icon: 'success',
				})
				dispatch({
					type: 'LOGIN',
					payload: {
						user: res.data.payload,
						token: res.data.payload.token,
					},
				})
				localStorage.setItem('token', res.data.payload.token)
				navigate('/', { replace: true })
			})
			.catch(err => {
				Swal.fire({
					title: err.response.data.message,
					icon: 'error',
				})
			})
			.finally(() => setLoading(false))
	}

	return (
		<div className='auth-container'>
			<form className='auth-form' onSubmit={login}>
				<h1>Login</h1>

				<input
					onChange={e => {
						setDataForBackend({ ...dataForBackend, phone: e.target.value })
					}}
					value={dataForBackend.phone}
					type='text'
					placeholder='Enter phone number'
					required
				/>

				<input
					onChange={e => {
						setDataForBackend({ ...dataForBackend, password: e.target.value })
					}}
					value={dataForBackend.password}
					type='password'
					placeholder='Enter your password'
					required
				/>
				<button
					className='bg-indigo-500 hover:bg-indigo-600'
					disabled={loading}
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Login
