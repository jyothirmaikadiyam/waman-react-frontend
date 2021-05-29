import React, { PureComponent } from "react";
import './login.css';
import Header from "./header.js";
import Registration from "./registration";
import login from "./images/login.jpg";
import login1 from "./images/clip-1744.png";
import login2 from "./images/clip-1716 (1).png";
import './App.css';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
class Login extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
                  email:'',
                  password:'',
                  };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target=event.target;
    const value=target.type;
    if(value==='email')
    {
      this.setState({ email: event.target.value });
    }
    else if(value==='password')
    {
      this.setState({ password: event.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    alert("Login Successful !!!");
    const user = {};
    user.emailId = this.state.email;
    user.password = this.state.password;
    console.log(user);
    Axios.post("https://waman-api.azurewebsites.net/login", user).then((res) => {
      if(res.data.type==="Customer")
      {
        const { history } = this.props;
        reactLocalStorage.set('name', res.data.name);
        reactLocalStorage.set('emailId', res.data.emailId);
        if(history) history.push('/customer');
      }
      else if(res.data.type==="Scavenger"){
        reactLocalStorage.set('name', res.data.name);
        reactLocalStorage.set('emailId', res.data.emailId);
        const { history } = this.props;
        if(history) history.push('/scavenger');
      }
      else
      {
        const { history } = this.props;
        this.setState(this.baseState)
        if(history) history.push('/login');
      }
    });
  }
  redirectToRegistration = () => {
    const { history } = this.props;
    if(history) history.push('/registration');
   }
  render(){
    const { history } = this.props;

        return (
          <div className="login">
                    
                    <h1 className="login_signin">SIGN IN</h1>
                    <p>Use your account</p>
                    <form className="login_form" onSubmit={this.handleSubmit}>
                      <input
                            type="email" 
                            placeholder="  USERNAME" 
                            className="login_field" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="  USERNAME"}
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                            />
                      <input 
                            type="password" 
                            placeholder="  PASSWORD" 
                            className="login_field" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="  PASSWORD"}
                            value={this.state.fullname}
                            onChange={this.handleChange}
                            />
                      <input type="submit" value="SIGN IN" className="login_button"></input>
                    </form>
                    
                    <p>____________________ or ____________________</p>
                    <div className="login_registration">
                        <p>Don't have an account? </p>
                        <button className="login_button" onClick={this.redirectToRegistration}>SIGN UP</button>
                    </div>       
          </div>
        );
      }
}

export default withRouter(Login);
