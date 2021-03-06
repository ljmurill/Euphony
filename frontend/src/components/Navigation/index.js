import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import SignUpModal from "../SignupFormPage";

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
              <LoginFormModal />
              <SignUpModal/>
              {/* <NavLink to="/signup" className='link'><button className="signup-button">Sign Up</button></NavLink> */}
            </>
        )
    }

    return (
        <div className="top_container">
            <nav className="navigation">
                <div className="total_link">
                    <NavLink exact to="/" className='link'><i className="fab fa-soundcloud fa-2x"> Euphony </i></NavLink>
                </div>
                <div className='right-navigation'>
                    {isLoaded && sessionLinks}
                </div>
            </nav>
        </div>

    )
}

export default Navigation;
