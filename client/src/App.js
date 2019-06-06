import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {GET_ERRORS,SET_CURRENT_USER} from './actions/types';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import store from './store';


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);

  var decode = jwt_decode(localStorage.jwtToken);

  store.dispatch({
    type:SET_CURRENT_USER,
    payload:decode
  })
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>  
    );
  }
}

export default App;
