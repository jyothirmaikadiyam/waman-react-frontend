import React from 'react';
import './App.css';
import Header from "./header.js";
import Login from './login';
import Customer from './customer';
import Scavenger from './scavenger';
import Post from './post';
import login1 from "./images/clip-1744.png";
import login2 from "./images/clip-1716 (1).png";
import Executeorder from "./executeorder";
import Headerin from './headerin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import login from "./images/login.jpg";
import Registration from "./registration";
function App() {
  return (
    <Router>
    <Switch>
        <Route exact path="/login" component={userLogin}/>
        <Route exact path="/registration" component={userRegistration}/>
        <Route exact path="/customer" component={userCustomer}/>
        {/* <Route exact path="/myapp" component={() =><userCustomer name="jyothirmai" />} /> */}
        <Route exact path="/scavenger" component={userScavenger}/>
        <Route exact path="/post" component={userPost}/>
        <Route exact path="/executeorder" component={userExecuteorder}/>
    </Switch>
</Router>
         
  );
}
function userLogin(){
  return(
    <div className="App_main">
           <Header/>
            <div className="App">
                <div className="app_images_align">
                    <img className="app_image" src={login1}/>
                    <img className="app_image" src={login2}/>
                </div>
                <div className="app_login_align">
                    <Login classname="app_login"/>
                </div>
                
            </div>

        </div>  
  )
}
function userCustomer(props){
  return(
    <div className="App_main">
          <Headerin/>
          <Customer/>
        </div>  
  )
}
function userScavenger(){
  return(
    <div className="App_main">
          <Headerin/>
          <Scavenger/>
        </div>  
  )
}
function userPost(){
  return(
    <div className="App_main">
           <Headerin/>
            <Post/>

        </div>  
  )
}
function userRegistration(){
  return(
    <div className="App_main">
           <Header/>
            <div className="App">
                
                <div className="app_images_align">
                    <img className="app_image" src={login1}/>
                    <img className="app_image" src={login2}/>
                </div>
                <Registration className="app_login"/>
            </div>

        </div>  
  )
}
function userExecuteorder(){
  return(
    <div className="App_main">
           <Headerin/>
            <Executeorder/>

        </div>  
  )
}
export default App;
