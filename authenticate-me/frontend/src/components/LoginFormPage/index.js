import React, {useState} from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage(){
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log('SESSION USER',sessionUser)
    if(sessionUser){
        return <Redirect to='/'/>
    };

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
        <div>
            <form onSubmit={handleSubmit} className='loginForm'>
                <ul>
                    {errors.length > 0 && errors.map((error, i)=> {
                        return <li key={i}>{error}</li>
                    })}
                </ul>
                <label htmlFor='credential'>
                    Username or Email
                    <input
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor='password'>
                    Password
                    <input
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <button type='submit'>Login</button>
                </label>
            </form>
        </div>
    );
}

export default LoginFormPage;
