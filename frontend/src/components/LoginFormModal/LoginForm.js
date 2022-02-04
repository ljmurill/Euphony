import React, {useState} from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

function LoginForm(){
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])

        return dispatch(sessionActions.login({credential, password}))
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    };

    return(
        <div className='loginFormChildren'>
            <form onSubmit={handleSubmit} className='loginForm'>

                <ul className='loginHeader'>
                    Login
                    {errors.length > 0 && errors.map((error, i)=> {
                        return <li key={i}>{error}</li>
                    })}
                </ul>
                <label htmlFor='credential'>
                    Username or Email
                </label>
                <input
                    type='text'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <label htmlFor='password'>
                    Password
                </label>
                <input
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Login</button>

            </form>
        </div>
    );
}

export default LoginForm;
