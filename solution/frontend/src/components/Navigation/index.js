import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className='nav-li'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      <ul className='nav-ul'>
        <li>
          <NavLink exact to="/" className='nav-li'>Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
        <li>
          <NavLink to="/event" className='nav-li'>Events</NavLink>
        </li>
        <li>
          <NavLink to="/search" className='nav-li'>Search</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
