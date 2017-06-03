import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Helpers from '../utils/helpers'

const helpers = new Helpers();

//import Title from "./Header/Title"

export default class Header extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  // handleClick(){
  //   helpers.getLogout().then(
  //       this.setState({user:null})
  //   );
  // }

  componentWillMount(){
    helpers.getUser().then((user) => {
      this.setState({user:user})
    });
  }


  render() {

    let navs = null;

      if(this.state.user){
        navs =  <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link onClick={helpers.getLogout} to="/login">Logout</Link></li>
                </ul>;

      } else{
        navs = <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              </ul>;
      }

    return (

      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-ex1-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">React Login Page</Link>
          </div>

          <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav navbar-right">
              {navs}

            </ul>
          </div>
        </div>
      </nav>
    );

  }
}
