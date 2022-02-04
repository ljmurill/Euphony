import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({user}){
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);

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
        dispatch(sessionActions.logout());
    };

    return (
        <>
          <button onClick={openMenu} className="profileButton">
            <i className="fas fa-user-circle fa-2x"></i>
          </button>
          {menu && (
            <ul className="profile-dropdown">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          )}
        </>
    );

}


export default ProfileButton;
