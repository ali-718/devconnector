import React, { Component } from 'react'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import PropTypes from 'prop-types';
import TextFieldInput from './../common/TextFieldInput';
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

componentDidMount(){
      if(this.props.auth.isAuthenticated === true) {
       this.props.history.push('/dashboard')
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
                    <TextFieldInput 
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={(val) => this.setState({name:val.target.value})}
                    error={this.state.errors.name}
                    />
                    
                    <TextFieldInput 
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={(val) => this.setState({email:val.target.value})}
                    error={this.state.errors.email}
                    info="Use gravatar email to automatically import image"
                    />

                    <TextFieldInput 
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={(val) => this.setState({password:val.target.value})}
                    error={this.state.errors.password}
                    />

                    <TextFieldInput 
                    placeholder="Confirm Password"
                    name="Password"
                    type="password"
                    value={this.state.password2}
                    onChange={(val) => this.setState({password2:val.target.value})}
                    error={this.state.errors.password2}
                    />
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
