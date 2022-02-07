import React, {useState} from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';


import './SignupForm.css'

function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.user)

    // if(currentUser){
    //     return <Redirect to='/'/>
    // };


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
        <div className='signupChildren'>
            <form onSubmit={handleSubmit} className='signUpForm'>
                <i class="fab fa-soundcloud fa-3x login"/>
                <ul className='signupHeader'>
                    {errors.length > 0 && errors.map((error, i) => {
                        return <li key={i}>{error}</li>
                    })}
                </ul>

                <input
                    type='text'
                    className='signupInput'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />


                <input
                    type='text'
                    className='signupInput'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type='text'
                    className='signupInput'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type='text'
                    className='signupInput'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

               <button type='submit' className='signupButton'>Create Account</button>

            </form>
        </div>
    );

}


export default SignupForm;
