import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import './activelist.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
class Activelist extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
                      listAd:[],
                      emailId:''
                      }; 
        this.handleClick=this.handleClick.bind(this);
      }
      handleClick(event){
        window.location.reload(false);
      }
    componentDidMount() {
        const name = reactLocalStorage.get('emailId');
        this.setState({ emailId: name});
    Axios.get(`https://waman-api.azurewebsites.net/scav/listAds`)
    .then(res => {
        const listAd = res.data;
        this.setState({ listAd:listAd });  
      })   
  }
    render(){
        const listAd=this.state.listAd;
        return (
            <div className="activelist_box">
          <div className="activelist_header">
              <h2 className="activelist_header_name">ACTIVE REQUESTS</h2>
              <div className="activelist_refresh">
                <button className="activelist_button" onClick={this.handleClick}>REFRESH <RefreshIcon className="activelist_refreshicon"/></button>  
              </div>
          </div>
          <div className="activelist">
                {listAd.map((listAd,index)=>{
                return(
                  <div className="activelist_body">
                    {/* <div className="activelist_body_head">
                        <div className="activelist_body_head_status"> 
                            <span className="activelist_body_sidehead"> BOOKING ID : </span>
                            <span>{listAd.bookingId}</span>
                        </div>
                        <div className="activelist_body_head_status">
                            <span className="activelist_body_sidehead">STATUS :</span>
                            <span>{listAd.bookingStatus}</span>
                        </div>  
                        <DeleteTwoToneIcon/>
                    </div> */}
                    <div className="activelist_body_sidebody">
                          <span className="activelist_body_sidehead"> LIST OF ITEMS :</span>
                          <span>{listAd.postDetails}</span>
                    </div>
                    
                    <div className="activelist_time">
                        <div className="activelist_time_pick">
                            <span className="activelist_body_sidehead">PICK UP TIME</span>
                            <span>{listAd.pickUpTime}</span>
                        </div>
                        {/* <div className="activelist_time_book">
                            <span className="activelist_body_sidehead">BOOKING TIME</span>
                            <span>{listAd.bookedAt}</span>
                        </div> */}
                    </div>
                    <div className="activelist_accept">
                        <div className="activelist_time_book">
                                <span className="activelist_body_sidehead">ADDRESS</span>
                                <span>{listAd.address}</span>
                        </div> 
                        <button className="activelist_accept_button" onClick={() => sayHello(listAd.bookingId,this.state.emailId)}>ACCEPT</button>
                    </div>  
                  </div>
                );
                })}
          </div>
      </div>
        );
    }
}
function sayHello(name,email) {
    
    alert(`hello, ${name}, ${email}`);
    const user = {};
    user.emailId = email;
    user.bookingId = name;
    Axios.post("https://waman-api.azurewebsites.net/scav/bookAd", user).then((res) => {
         window.location.reload(false);
    });
    
  }
export default withRouter(Activelist);