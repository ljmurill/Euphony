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
                <i className="fab fa-soundcloud fa-3x login"/>
                <ul className='loginHeader'>
                    {errors.length > 0 && errors.map((error, i)=> {
                        return <li key={i}>{error}</li>
                    })}
                </ul>
                <input
                    type='text'
                    className='credentialsInput'
                    placeholder='Username or Email'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <input
                    type='text'
                    className='passwordInput'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit' className='loginModalButton'>Login</button>
                <button type='submit' className='demoUserButton' onClick={() => {
                    setCredential('Demolicious')
                    setPassword('password')
                }}>Demo User</button>

            </form>
        </div>
    );
}

export default LoginForm;
