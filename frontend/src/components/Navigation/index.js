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
        <NavLink to="/signup" className='nav-li black'>Signup</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      {isLoaded && sessionLinks}
      <div className='brand-wrapper'>
        <img src={'pot-icon.jpg'} className='nav-logo'></img>
        <h1 className='brand-name red'>Potluck</h1>
      </div>
      <div className='nav-wrapper'>
        <ul className='nav-ul'>
          <li>
            <NavLink exact to="/" className='nav-li black'>Home</NavLink>
          </li>
          <li>
            <NavLink to="/events" className='nav-li black'>Events</NavLink>
          </li>
          <li>
            <NavLink to="/search" className='nav-li black'>Search</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
