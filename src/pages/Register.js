import React from 'react';
import { useState, useEffect } from 'react';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, registerUser } from '../features/user/userSlice';

// redux toolkit and useNavigate later

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

const Register = () => {
	const [values, setValues] = useState(initialState);

	const { isLoading, user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues({ ...values, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			toast.error('Please fill out all fields');
			return;
		}
		if (isMember) {
			dispatch(LoginUser({ email, password }));
			return;
		}
		dispatch(registerUser({ name, email, password }));
	};

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{/* name field */}
				{!values.isMember && (
					<FormRow
						value={values.name}
						type='text'
						name='name'
						handleChange={handleChange}
					/>
				)}
				{/* email field */}
				<FormRow
					value={values.email}
					type='email'
					name='email'
					handleChange={handleChange}
				/>
				{/* password field */}
				<FormRow
					value={values.password}
					type='password'
					name='password'
					handleChange={handleChange}
				/>
				<button type='submit' className='btn btn-block'>
					submit
				</button>
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}
					<button className='member-btn' type='button' onClick={toggleMember}>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
