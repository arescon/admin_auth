import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';

import { setStatusAuth } from 'src/redux/actions/main';

import Home from './home';

import LoginForm from './login';

import { Get } from 'src/libs/api';

const App = ({ status_auth, setStatusAuth }) => {

  useEffect(() => {
    if(status_auth !== 2 ) {
      Get('/auth/checkout').then( result => {
        setStatusAuth(status_auth !== 2 ? 2 : 1)
      }).catch( error => {
        setStatusAuth(1);
      })
    }
  }, [status_auth])

  switch (status_auth) {
    case 1:
      return <LoginForm />
      break;
    case 2:
      return <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
      break;
    default:
      return <>Loading</>;
      break;
  }
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    status_auth: state.main.status_auth
  }
}

const mapDispatchToProps = { setStatusAuth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);