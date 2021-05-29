import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
import './executeorder.css';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Upi from './upi';
class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <CancelOutlinedIcon onClick={this.props.closePopup} className="cancel"></CancelOutlinedIcon>
            <Upi bookingId={this.props.bookingId}/>
          </div>
        </div>
      );
    }
  }
class Executeorder extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
                      name:'',
                      emailId:'',
                      password:'',
                      showPopup: false,
                      points:[],
                      orders:[],
                      };
                        
        this.baseState = this.state;
      }
    componentDidMount() {
        const emailId = reactLocalStorage.get('emailId');
        const name = reactLocalStorage.get('name');
        this.setState({ emailId:emailId });
        this.setState({ name: name});
        Axios.get(`https://waman-api.azurewebsites.net/scav/openOrder?emailId=`+emailId)
            .then(res => {
            const orders = res.data;
            this.setState({ orders:orders });  
        })
      }
      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    render(){
        const orders=this.state.orders;
        return(
        <div className="eo">
                {orders.map((orders,index)=>{
                return(
                  <div className="eo_body">
                    <div className="eo_body_head">
                        <div className="eo_body_head_status"> 
                            <span className="eo_body_sidehead"> BOOKING ID : </span>
                            <span>{orders.bookingId}</span>
                        </div>
                        <div className="eo_body_head_status">
                            <span className="eo_body_sidehead">STATUS :</span>
                            <span className="eo_body_sidehead1">{orders.bookingStatus}</span>
                        </div>  
                        <DeleteTwoToneIcon/>
                    </div>
                    <div className="eo_body_sidebody">
                          <span className="eo_body_sidehead"> LIST OF ITEMS :</span>
                          <span>{orders.postDetails}</span>
                    </div>
                    
                    <div className="eo_time">
                        <div className="eo_time_pick">
                            <span className="eo_body_sidehead">PICK UP TIME</span>
                            <span>{orders.pickUpTime}</span>
                        </div>
                        <div className="eo_time_book">
                            <span className="eo_body_sidehead">BOOKING TIME</span>
                            <span>{orders.bookedAt}</span>
                        </div>
                        <button onClick={this.togglePopup.bind(this)} className="eo_execute_button">execute order</button>
                                {this.state.showPopup ? 
                                <Popup
                                    closePopup={this.togglePopup.bind(this)}
                                    bookingId={orders.bookingId}
                                />
                                : null
                                }
                    </div>
                    
                  </div>
                );
                })}
          </div>
          );
    }
}
export default withRouter(Executeorder);