import React from "react";
import { Route, Redirect } from 'react-router'
import Header from './Header'

import Helpers from '../utils/helpers'

const helpers = new Helpers();

export default class Register extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      password2: "",
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('clicked');

    console.log(this.state.firstName);
    helpers.postRegister(this.state.firstName,
                        this.state.lastName,
                        this.state.email,
                        this.state.userName,
                        this.state.password,
                        this.state.password2).then((item) => {
                          if(item === true){
                            this.props.history.push('/login');
                          }else{
                            this.setState({error: item[0].msg});
                          }
                        });
  }


  render() {

    let msg = null;
    if (this.state.error != null) {
      msg = <div className="alert alert-danger">{this.state.error}</div>;
    } else {
      msg = null;
    }


    return (



      <div>
        <Header/>
        <section className="container">
          <header className="row">
            <h1 className="col-sm-4">Register</h1>
          </header>
          <artical className="row">
            <form onSubmit={this.handleSubmit} className="col-sm-4">
              <div className="form-group">
                {msg}
                <h4 className="col-form-label col-form-label-lg">First Name</h4>
                <input
                  type="text"
                  value={this.state.firstName}
                  className="form-control"
                  id="firstName"
                  onChange={this.handleChange}
                />

                <h4 className="col-form-label col-form-label-lg">Last Name</h4>
                <input
                  type="text"
                  value={this.state.lastName}
                  className="form-control"
                  id="lastName"
                  onChange={this.handleChange}
                />

                <h4 className="col-form-label col-form-label-lg">Email</h4>
                <input
                  type="text"
                  value={this.state.email}
                  className="form-control"
                  id="email"
                  onChange={this.handleChange}
                />

                <h4 className="col-form-label col-form-label-lg">Username</h4>
                <input
                  type="text"
                  value={this.state.userName}
                  className="form-control"
                  id="userName"
                  onChange={this.handleChange}
                />

                <h4 className="col-form-label col-form-label-lg">Password</h4>
                <input
                  type="password"
                  value={this.state.password}
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                />

                <h4 className="col-form-label col-form-label-lg">Enter Password Again</h4>
                <input
                  type="password"
                  value={this.state.password2}
                  className="form-control"
                  id="password2"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </artical>
        </section>
      </div>

    );
  }
}
