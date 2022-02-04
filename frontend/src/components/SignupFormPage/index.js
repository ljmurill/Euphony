import React, {useState} from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css'

function SignupFormPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    if(currentUser){
        return <Redirect to='/'/>
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === confirmPassword){
            setErrors([]);
            return dispatch(sessionActions.signup({username, email, password}))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors(['Confirm Password must be the same as Password.'])
    }


    return (
        <>
            <form onSubmit={handleSubmit} className='signUpForm'>
                <ul>
                    {errors.length > 0 && errors.map((error, i) => {
                        return <li key={i}>{error}</li>
                    })}
                </ul>
                <label htmlFor='username'>
                    Username
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor='email'>
                    Email
                    <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor='password'>
                    Password
                    <input
                        type='text'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor='confirmPassword'>
                    Confirm Password
                    <input
                        type='text'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <button type='submit'>Create Account</button>
                </label>
            </form>
        </>
    );

}


export default SignupFormPage;
