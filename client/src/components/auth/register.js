import React, { Component } from 'react'
import axios from 'axios';

export default class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{},
        }
        this.onSubmit = this.onSubmit.bind(this);
    }


onSubmit = (e) => {
e.preventDefault();

const newUser = {
    "name":this.state.name,
    "email":this.state.email,
    "password":this.state.password,
    "password2":this.state.password2,
}

axios.post('/api/users/register',newUser).then(res => console.log(res.data)).catch(e => {console.log(e.response.data); this.setState({errors:e.response.data})})
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
