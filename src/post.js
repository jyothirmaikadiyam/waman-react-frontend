import React, { PureComponent } from "react";
import './post.css';
import Header from "./header.js";
import Registration from "./registration";
import './App.css';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
class Post extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
                  emailId:'',
                  name:'',
                  items:'',
                  datetime:'',
                  };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    
    const emailId = reactLocalStorage.get('name');
    const name = reactLocalStorage.get('emailId');
    this.setState({ name:emailId });
    this.setState({ emailId: name});
  }
  handleChange(event) {
    const target=event.target;
    const value=target.type;
    this.setState({ date: event.target.value });    
  }
  handleTextChange(event){
    this.setState({ items: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    alert("Request Successful");
    this.setState({ items:'' });
    this.setState({ date: ''});
    const user = {};
    user.emailId=this.state.emailId;
    user.postDetails = this.state.items;
    user.pickUpTime=this.state.datetime;
    console.log(user);
    Axios.post("https://waman-api.azurewebsites.net/cust/postAd", user).then((res) => {
        const { history } = this.props;
        if(history) history.push('/customer');
    });
  }
  
  render(){
    const { history } = this.props;

        return (
          <div className="post">
                    
                    <h1 className="post_signin">GIVE ORDER DETAILS</h1>
                    <form className="post_form" onSubmit={this.handleSubmit}>
                        <label className="post_label">
                            LIST OF ITEMS:
                            <textarea
                            placeholder="  CLICK TO ADD ITEMS" 
                            className="post_field1" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="  CLICK TO ADD ITEMS"}
                            value={this.state.items}
                            onChange={this.handleTextChange}
                            rows="10"
                            cols="50"
                            required
                            />
                        </label>
                        <label className="post_label">
                            DATE AND TIME OF PICKUP:
                            <input 
                            type="datetime-local" 
                            placeholder="  DATE OF PICKUP" 
                            className="post_field2" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="  DATE OF PICKUP"}
                            value={this.state.date}
                            onChange={this.handleChange}
                            required
                            />
                        </label>
                      
                      <input type="submit" value="POST ORDER" className="post_button"></input>
                    </form>
                    
                           
          </div>
        );
      }
}

export default withRouter(Post);
