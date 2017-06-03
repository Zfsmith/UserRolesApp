import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Main from "../components/Main";
import Login from "../components/Login";
import Register from "../components/Register";

import Helpers from '../utils/helpers'

const helpers = new Helpers();

const Routes = () =>(
  <Router>
    <div>

      <Route exact path="/" component={Main}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>

    </div>
  </Router>
)

export default Routes
