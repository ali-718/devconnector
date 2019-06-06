import React, { Component } from 'react'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{},
        }
    }

componentWillReceiveProps(nextProps){
if(nextProps.errors){
  this.setState({errors:nextProps.errors})
}
}

onSubmit = (e) => {
e.preventDefault();

const newUser = {
    name:this.state.name,
    email:this.state.email,
    password:this.state.password,
    password2:this.state.password2,
}

this.props.registerUser(newUser,this.props.history);
console.log(this.state.errors)
}

    render() {
        return (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input onChange={(val) => this.setState({name:val.target.value})} value={this.state.name} type="text" className={this.state.errors.name ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder="Name" name="name"  />
                      <small className="form-text text-danger">{this.state.errors.name}</small>
                    </div>
                    <div className="form-group">
                      <input onChange={(val) => this.setState({email:val.target.value})} value={this.state.email} type="text" className={this.state.errors.email ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder="Email Address" name="email" />
                      {this.state.errors.email ?  <small className="form-text text-danger">{this.state.errors.email}</small> :
                      <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                      }
                      </div>
                    <div className="form-group">
                      <input onChange={(val) => this.setState({password:val.target.value})} value={this.state.password} type="password" className={this.state.errors.password ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder="Password" name="password" />
                      { <small className="form-text text-danger">{this.state.errors.password}</small>}
                    </div>
                    <div className="form-group">
                      <input onChange={(val) => this.setState({password2:val.target.value})} value={this.state.password2} type="password" className={this.state.errors.password2 ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder="Confirm Password" name="password2" />
                      { <small className="form-text text-danger">{this.state.errors.password2}</small>}
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

Register.propTypes = {
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
