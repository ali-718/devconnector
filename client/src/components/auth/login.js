import React, { Component } from 'react'
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authAction';
import PropTypes from 'prop-types';

 class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{},
            newUser:[]
           }
    }

componentWillReceiveProps(props){
  if(props.auth.isAuthenticated){
    this.props.history.push('/signup')
  }

  if(props.errors){
    this.setState({errors:props.errors})
  }
}

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
          email:this.state.email,
          password:this.state.password
        }
       
        this.props.loginUser(newUser);
         }
    
    render() {
        return (
          <div className="login">
            <div className="container">
              {console.log(this.props)}{console.log(this.state.errors)}
              <div className="row">
                <div className="col-md-8 m-auto"> 
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input onChange={(val) => this.setState({email:val.target.value})} value={this.state.email} type="email" className={this.state.errors.email ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder="Email Address" name="email" />
                      {<small className="form-text text-danger">{this.state.errors.email}</small>}
                    </div>
                    <div className="form-group">
                      <input value={this.state.password} onChange={(val) => this.setState({password:val.target.value})} type="password" className={this.state.errors.password ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder="Password" name="password" />
                      {this.state.errors.password ?  <small className="form-text text-danger">{this.state.errors.password}</small> :
                      ""
                      }
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
  loginUser:PropTypes.func.isRequired,
  errors:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{loginUser})(Login);
