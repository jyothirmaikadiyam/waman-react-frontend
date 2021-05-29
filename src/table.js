import React,{PureComponent} from 'react';
import './table.css';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
class Table extends PureComponent{
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
  componentDidMount() {
        const name = reactLocalStorage.get('emailId');
        this.setState({ emailId: name});
    Axios.get(`https://waman-api.azurewebsites.net/cust/history?emailId=`+name)
    .then(res => {
        const userHistory = res.data;
        this.setState({ userHistory:userHistory });  
      })
      
  }
  
  handleClick(event){
    window.location.reload(false);
  }
  // "bookingId": "dJPPK5tGhZjs5BNNwCNMke",
  // "emailId": "c@m.com",
  // "postDetails": "NewsPapers",
  // "pickUpTime": "2022-05-16T17:00:00.000Z",
  // "bookingStatus": "OPEN",
  // "bookedAt": "2021-05-15T10:49:15.707Z"
  render(){
    const userHistory=this.state.userHistory;
    return(
      <div className="table_box">
          <div className="table_header">
              <h2 className="table_header_name">ORDERS HISTORY</h2>
              <div className="table_refresh">
                <button className="table_button" onClick={this.handleClick}>REFRESH <RefreshIcon className="table_refreshicon"/></button>  
              </div>
          </div>
          <div className="table">
                {userHistory.map((userHistory,index)=>{
                return(
                  <div className="table_body">
                    <div className="table_body_head">
                        <div className="table_body_head_status"> 
                            <span className="table_body_sidehead"> BOOKING ID : </span>
                            <span>{userHistory.bookingId}</span>
                        </div>
                        <div className="table_body_head_status">
                            <span className="table_body_sidehead">STATUS :</span>
                            <span>{userHistory.bookingStatus}</span>
                        </div>  
                        <DeleteTwoToneIcon/>
                    </div>
                    <div className="table_body_sidebody">
                          <span className="table_body_sidehead"> LIST OF ITEMS :</span>
                          <span>{userHistory.postDetails}</span>
                    </div>
                    
                    <div className="table_time">
                        <div className="table_time_pick">
                            <span className="table_body_sidehead">PICK UP TIME</span>
                            <span>{userHistory.pickUpTime}</span>
                        </div>
                        <div className="table_time_book">
                            <span className="table_body_sidehead">BOOKING TIME</span>
                            <span>{userHistory.bookedAt}</span>
                        </div>
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
export default withRouter(Table);