import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import './Register.scss'
const Register = () => {
	const { state, dispatch } = useContext(AuthContext)
	const navigate = useNavigate()
	console.log(state, dispatch)

	useEffect(() => {
		if (state.isLogged) {
			navigate('/', { replace: true })
		}
	})

	return (
		<div className='auth-container'>
			<form className='auth-form'>
				<h1>Register</h1>
				<input type='text' placeholder='Enter your name' required />
				<input type='text' placeholder='Enter phone number' required />
				<input type='password' placeholder='Enter your password' required />
				<button>Register</button>
			</form>
		</div>
	)
}

export default Register
