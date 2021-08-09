import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';


function Home() {


  return (
    <div className='home-container'>
      <div className='home-image-container' >
        {/* <img src={'potluck-landing.jpg'} ></img> */}
        <div className='welcome-msg'>
          <div className='overlay'>
            <div className='overlay-msg'>
              <h1 className='text'>Welcome to <h1 className=' brand-text red '>Potluck</h1></h1>
              <Link to='/events'>
                <button className='create button font yellow-bg'>Create an Event</button>
              </Link>
            </div>
            <div className='about-me-container'>
              <Link exact to='https://github.com/Byoo522'>
                <button>
                  Github
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
