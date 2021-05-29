import React,{PureComponent} from 'react';
import './sca_history.css';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
class Sca_history extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
                  userHistory:[],
                  emailId:''
                  };
                
    // this.baseState = this.state;
      this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(event){
    window.location.reload(false);
  }
  componentDidMount() {
        const name = reactLocalStorage.get('emailId');
        this.setState({ emailId: name});
    Axios.get(`https://waman-api.azurewebsites.net/scav/history?emailId=`+name)
    .then(res => {
        const userHistory = res.data;
        this.setState({ userHistory:userHistory });  
      })
      
  }
  render(){
    const userHistory=this.state.userHistory;
    return(
      <div className="sca_history_box">
          <div className="sca_history_header">
              <h2 className="sca_history_header_name">ORDERS HISTORY</h2>
              <div className="sca_history_refresh">
                <button className="sca_history_button" onClick={this.handleClick}>REFRESH <RefreshIcon className="sca_history_refreshicon"/></button>  
              </div>
          </div>
          <div className="sca_history">
                {userHistory.map((userHistory,index)=>{
                return(
                  <div className="sca_history_body">
                    <div className="sca_history_body_head">
                        <div className="sca_history_body_head_status"> 
                            <span className="sca_history_body_sidehead"> BOOKING ID : </span>
                            <span>{userHistory.bookingId}</span>
                        </div>
                        <div className="sca_history_body_head_status">
                            <span className="sca_history_body_sidehead">STATUS :</span>
                            <span>{userHistory.bookingStatus}</span>
                        </div>  
                    </div>
                    <div className="sca_history_body_sidebody">
                          <span className="sca_history_body_sidehead"> LIST OF ITEMS :</span>
                          <span>{userHistory.postDetails}</span>
                    </div>
                    
                    <div className="sca_history_time">
                        <div className="sca_history_time_pick">
                            <span className="sca_history_body_sidehead">PICK UP TIME</span>
                            <span>{userHistory.pickUpTime}</span>
                        </div>
                        {/* <div className="sca_history_time_book">
                            <span className="sca_history_body_sidehead">BOOKING TIME</span>
                            <span>{userHistory.bookedAt}</span>
                        </div> */}
                    </div>
                  </div>
                );
                })}
          </div>
      </div>
      // "bookingId": "1vpFHw8pL9eyrpbP3d6nej",
      // "emailId": "lalli@gmail.com",
      // "postDetails": "things",
      // "pickUpTime": "1900-01-01T00:00:00.000Z",
      // "bookingStatus": "OPEN",
      // "bookedAt": "2021-05-16T07:15:05.100Z"
    );
  }
}
export default withRouter(Sca_history);