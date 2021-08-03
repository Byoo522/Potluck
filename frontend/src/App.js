import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import EventPage from './components/EventPage';
import EventFormPage from './components/EventFormPage';
import * as sessionActions from './store/session';

import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/events'>
            <EventPage />
          </Route>
          <Route exact path='/event/new'>
            <EventFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
