import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navigation.css';

function ProfileButton({user}){
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);
    const history = useHistory();

    const openMenu =() => {
        if(menu) return;
        setMenu(true);
    };

    useEffect(() => {
        if (!menu) return;

        const closeMenu = () => {
          setMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [menu]);

    const logout = (e) => {
        e.preventDefault();
        // window.localStorage.removeItem('Songs');
        dispatch(sessionActions.logout());
        history.push('/');

    };

    return (
      <div className="loggedInSection">
            <button onClick={openMenu} className="profileButton">
              <i className="fas fa-user-circle fa-2x"></i>
            </button>
        <div className="dropDown">
            {menu && (
              <div className="profile-dropdown">
                <div className="profile-section">
                  <FontAwesomeIcon icon="fa-solid fa-circle-user" color="black" className="profileNavSection"/>
                  <div className="nameAndEmail">
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                  </div>
                </div>

                <div className='logout-section' onClick={logout}>Log Out</div>

              </div>
              // <ul className="profile-dropdown">
              //   <li className="profileList">{user.username}</li>
              //   <li className="profileList">{user.email}</li>
              //   <li className="profileList">
              //     <button onClick={logout} className='logoutButton'>Log Out</button>
              //   </li>
              // </ul>
            )}
        </div>
      </div>


    );

}


export default ProfileButton;
