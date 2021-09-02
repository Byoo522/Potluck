import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';



function Home() {
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <div className='home-container'>
      <div className='home-image-container' >
        <div className='welcome-msg'>
          <div className='overlay'>
            <div className='overlay-msg'>
              <h1 className='text'>Welcome to <h1 className=' brand-text red '>Potluck</h1></h1>
              <Link to='/events'>
                <button className='create button font yellow-bg'>Create Event</button>
              </Link>
            </div>
            <div className='about-me-container'>
              <a href='https://github.com/Byoo522'>
                <i class="fab fa-github-square"></i>
              </a>
              <a href='https://www.linkedin.com/in/benjaminyoo/'>
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
