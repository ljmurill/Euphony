import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <ProfileButton user={sessionUser}/>
        )
    }else{
        sessionLinks = (
            <>
              <NavLink to="/login" className='link'>Log In</NavLink>
              <NavLink to="/signup" className='link'>Sign Up</NavLink>
            </>
        )
    }

    return (
        <ul className="navigation">
            <li className="total_link">
                <NavLink exact to="/" className='link'>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;
