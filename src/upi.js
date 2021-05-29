import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
import './upi.css';
class Upi extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
                      emailId:'',
                      name:'',
                      comment:'',
                      amount:'',
                      bookingId:this.props.bookingId
                      };
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        const target=event.target;
        const value=target.type;
        this.setState({ amount: event.target.value });    
      }
      handleTextChange(event){
        this.setState({ comment: event.target.value });
      }
      handleSubmit(event) {
        event.preventDefault();
        alert("A name is submitted" + this.state.name);
        
        const user = {};
        user.bookingId=this.state.bookingId;
        user.emailId = this.state.emailId;
        user.pay=this.state.amount;
        console.log(user);
        Axios.post("https://waman-api.azurewebsites.net/scav/closeOrder", user).then((res) => {
        });
      }
      
    render(){
        return(
            <div className="upi">
                    
                    <h1 className="upi_signin">GIVE YOUR FEEDBACK</h1>
                    <form className="upi_form" onSubmit={this.handleSubmit}>
                        <label className="upi_label">
                            COMMENTS :
                            <textarea
                            placeholder="  CLICK TO ADD COMMENT" 
                            className="upi_field1" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="  CLICK TO ADD COMMENT"}
                            value={this.state.comment}
                            onChange={this.handleTextChange}
                            rows="10"
                            cols="50"
                            />
                        </label>
                        <label className="upi_label">
                            AMOUNT PAYABLE :
                            <input 
                            type="text" 
                            placeholder="  ENTER AMOUNT" 
                            className="upi_field2" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="  ENTER AMOUNT"}
                            value={this.state.amount}
                            onChange={this.handleChange}
                            />
                        </label>
                      
                      <input type="submit" value="PAY" className="upi_button"></input>
                    </form>
                    
                           
          </div>
        );
    }
}
export default withRouter(Upi);