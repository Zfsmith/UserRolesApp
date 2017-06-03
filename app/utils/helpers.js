import React from "react";

import axios from "axios";

export default class helpers{

  getUser(){
    return axios.get("/users")
    .then(function(response){
      console.log(response.data);
      return response.data;
    });
  }

  postRegister(firstName, lastName, email, userName, password, password2){

    var newUser = {firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userName: userName,
                    password: password,
                    password2: password2};
    return axios.post("/users/register", newUser)
    .then(function(response){
      console.log("axios results", response.data);
      return response.data;
    });
  }

  postLogin(userName, password){
    console.log('loging in');
    var user = {
      username: userName,
      password: password
    };
    return axios.post("/users/login",user)
    .then(function(response){
      return response.data;
    });
  }

  getLogout(){
    return axios.get("/users/logout")
    .then(function(response){
      return response.data;
    });
  }
}
