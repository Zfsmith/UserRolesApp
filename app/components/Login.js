import React from "react";

import Helpers from '../utils/helpers'
import Header from './Header'

const helpers = new Helpers();

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userName: "",
      password: "",
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

    console.log(this.state.userName);
    helpers.postLogin(this.state.userName,
                        this.state.password).then((item) => {
                          console.log(item);

                          helpers.getUser().then((item) => {

                                                if(item === ""){
                                                    this.setState({error: 'Invalid login'});
                                                }else{
                                                    this.props.history.push('/');
                                                }

                            });

                          // if(item === true){
                          //   this.props.history.push('/login');
                          // }else{
                          //   this.setState({error: item[0].msg});
                          // }
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
          <h1 className="col-sm-4">Login</h1>
        </header>
        <artical className="row">
          <form onSubmit={this.handleSubmit} className="col-sm-4">
            <div className="form-group">
              {msg}
              <h4 className="col-form-label col-form-label-lg">Username</h4>
              <input
                type="text"
                value={this.state.userName}
                className="form-control"
                id="userName"
                onChange={this.handleChange}
                required
              />

              <h4 className="col-form-label col-form-label-lg">Password</h4>
              <input
                type="password"
                value={this.state.password}
                className="form-control"
                id="password"
                onChange={this.handleChange}
                required
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
