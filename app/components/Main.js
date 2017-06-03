import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import Helpers from '../utils/helpers'
const helpers = new Helpers();

export default class Main extends React.Component {

  constructor(){
    super();
    this.state = {
      user: "",
      msg: null
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    helpers.getUser().then((user) => {
      this.setState({user:user})
      this.setState({msg:this.state.user.firstName})
      if(this.state.user === ""){

        this.props.history.push('/login');

      }
    });

    // if(this.state.user === null){
    //   //this.props.history.push('/login');
    // }else{
    //   this.setState({msg:this.state.user.firstName})
    // }
  }




  render() {




    return (
      <div>
        <Header/>
        <div className="container">
          <div className="row">
            <h2 className="col-sm-4">Welcome {this.state.msg} </h2>
          </div>
        </div>

      </div>

    );
  }
}
