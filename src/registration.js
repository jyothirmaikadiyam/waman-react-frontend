import React, { PureComponent } from "react";
import './registration.css';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
class Registration extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {fullname: '',
                  email:'',
                  phonenumber:'',
                  typeofuser:'',
                  password:'',
                  proof:''
                  };
    this.baseState = this.state 
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange=this.handleSelectChange.bind(this);
    this.handleProofChange=this.handleProofChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target=event.target;
    const value=target.type;
    if(value==='text')
    {
      this.setState({ fullname: event.target.value });
    }
    else if(value==='email')
    {
      this.setState({ email: event.target.value });
    }
    else if(value==='tel')
    {
      this.setState({ phonenumber: event.target.value });
    }
    else if(value==='password')
    {
      this.setState({ password: event.target.value });
    }

  }
  handleSelectChange(event){
    this.setState({ typeofuser: event.target.value });
  
  }
  handleProofChange(event){
    this.setState({ proof: event.target.value });
  }
  renderSelectedForm (param) {
    switch(param) {
      case 'Customer':
        return (
              <textarea
                    
                      placeholder=" ADDRESS" 
                      className="registration_field" 
                      onFocus={(e)=>e.target.placeholder=""} 
                      onBlur={(e)=>e.target.placeholder=" ADDRESS"}
                      value={this.state.proof}
                      onChange={this.handleProofChange}
                      required
                      />
         )
      case 'Scavenger':
        return (
              <textarea 
                      placeholder=" LICENSE NUMBER" 
                      className="registration_field" 
                      onFocus={(e)=>e.target.placeholder=""} 
                      onBlur={(e)=>e.target.placeholder=" LICENSE NUMBER"}
                      value={this.state.proof}
                      onChange={this.handleProofChange}
                      required
                      />
        )
    
      default: return null;
     }
   }
   handleSubmit(event) {
    event.preventDefault();
    alert("Registration Successful....");
    const user = {};
    user.emailId = this.state.email;
    user.password = this.state.password;
    user.name = this.state.fullname;
    user.phone= this.state.phonenumber;
    user.type = this.state.typeofuser;
    user.proof = this.state.proof;
    Axios.post("https://waman-api.azurewebsites.net/register", user).then((res) => {
      console.log(res);
      if(res.status===200)
      {
        const { history } = this.props;
        if(history) history.push('/login');
      }
      else{
        alert("invalid creds");
        const { history } = this.props;
        this.setState(this.baseState)
        if(history) history.push('/registration');
      }
    });
  }
   redirectToLogin = () => {
    const { history } = this.props;
    if(history) history.push('/login');
   }
   
  render(){
    return (
      <div className="registration">
                
                <h1 className="registration_signin">SIGN UP</h1>
                {/* <p>Use your account</p> */}
                <form className="registration_form" onSubmit={this.handleSubmit}>
                  <input 
                      type="text" 
                      placeholder=" FULLNAME" 
                      className="registration_field" 
                      onFocus={(e)=>e.target.placeholder=""} 
                      onBlur={(e)=>e.target.placeholder=" FULLNAME"}
                      value={this.state.fullname}
                      onChange={this.handleChange}
                      required
                      />

                  <input 
                      type="email" 
                      placeholder=" E-MAIL" 
                      className="registration_field" 
                      onFocus={(e)=>e.target.placeholder=""} 
                      onBlur={(e)=>e.target.placeholder=" E-MAIL"}
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                      />

                  <input 
                      type="tel" 
                      placeholder=" PHONE NUMBER" 
                      className="registration_field" 
                      onFocus={(e)=>e.target.placeholder=""} 
                      onBlur={(e)=>e.target.placeholder=" PHONE NUMBER"}
                      value={this.state.phonenumber}
                      onChange={this.handleChange}
                      required
                      />
                  <div className="registration_select">
                    <label for="typeofuser" className="registration_select_label">TYPE OF USER:</label>
                    <select name="typeofuser" id="typeofuser" className="registration_select_button" value={this.state.typeofuser} onChange={this.handleSelectChange} required>
                      <option value="selectuser" selected>SELECT USER</option>
                      <option value="Customer" >Customer</option>
                      <option value="Scavenger">Scavenger</option>
                    </select>
                  </div>
                  {this.renderSelectedForm(this.state.typeofuser)}
                  <input 
                        type="password" 
                        placeholder=" PASSWORD" 
                        className="registration_field" 
                        onFocus={(e)=>e.target.placeholder=""} 
                        onBlur={(e)=>e.target.placeholder=" PASSWORD"}
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        />

                  <input 
                        type="submit" 
                        value="SUBMIT" 
                        className="registration_button"/>
                </form>
                
                <p>____________________ or ____________________</p>
                <div className="registration_registration">
                    <p>Already have an account?</p>
                    <button className="registration_button" onClick={this.redirectToLogin}>SIGN IN</button>   
                </div>       
      </div>
    );
  }
}

export default withRouter(Registration);
