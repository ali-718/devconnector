import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../App.css';
import { logoutUser } from './../../actions/authAction';

class Navbar extends Component {

   onLogoutClick = (e) => {
      e.preventDefault();
      this.props.logoutUser()
  }


  render() {

    const {isAuthenticated,user} = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="ali" className="nav-link" onClick={this.onLogoutClick}>
                  <img className="rounded-circle logoutButton" src={user.avatar} alt={user.name} style={{width:"25px",marginRight:"15px"}} title="logout" />
                   {' '}Logout
                </a>
              </li>
            </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html">
                  {' '}
                  Developers
                </a>
              </li>
            </ul>

           {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes ={
  auth:PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
auth:state.auth
})

export default connect(mapStateToProps,{logoutUser})(Navbar);
