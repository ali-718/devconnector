import React, { Component } from 'react'

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{},
            newUser:[]
           }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            newUser:this.state.newUser.push({
                email:this.state.email,
                password:this.state.password
            })

        })
        console.log(this.state.newUser);
    }
    
    render() {
        return (
          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto"> 
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input onChange={(val) => this.setState({email:val.target.value})} value={this.state.email} type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" />
                    </div>
                    <div className="form-group">
                      <input value={this.state.password} onChange={(val) => this.setState({password:val.target.value})} type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
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
