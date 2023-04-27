import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import Swal from 'sweetalert2'
import './Register.scss'
import autoprefixer from 'autoprefixer'

const Register = () => {
	const { state, dispatch } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	const [dataForBackend, setDataForBackend] = useState({
		name: '',
		phone: '',
		password: '',
	})

	const navigate = useNavigate()

	useEffect(() => {
		if (state.token) {
			navigate('/', { replace: true })
		}
	})

	function register(e) {
		e.preventDefault()
		setLoading(true)
		axios
			.post('https://todo.paydali.uz/api/register', dataForBackend)
			.then(res => {
				Swal.fire({
					title: 'Registered successfully',
					icon: 'success',
				})
				navigate('/login', { replace: true })
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
		<div className='auth-container flex flex-col'>
			<form className='auth-form' onSubmit={register}>
				<h1>Register</h1>
				<input
					onChange={e =>
						setDataForBackend({ ...dataForBackend, name: e.target.value })
					}
					value={dataForBackend.name}
					type='text'
					placeholder='Enter your name'
					required
				/>
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
					Register
				</button>
				<div className='w-full flex justify-center align-center gap-5'>
					<button className='active:scale-90 active:opacity-70 disabled:opacity-40 w-full bg-red-500'>
						Login
					</button>
					<button className='active:scale-90 active:opacity-70 disabled:opacity-40 w-full bg-green-500'>
						Register
					</button>
				</div>
			</form>
		</div>
	)
}

export default Register
