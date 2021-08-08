import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import EventPage from './components/EventPage';
import EventFormPage from './components/EventFormPage';
import SingleEventPage from './components/SingleEventPage';
import EditEventForm from './components/EditEventForm';
import CommentEditForm from './components/CommentEditForm';
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
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/events'>
            <EventPage />
          </Route>
          <Route exact path='/events/new/'>
            <EventFormPage />
          </Route>
          <Route exact path='/events/:id/'>
            <SingleEventPage />
          </Route>
          <Route path='/events/:id/edit'>
            <EditEventForm />
          </Route>
          <Route path='/comments/edit/:id'>
            <CommentEditForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
