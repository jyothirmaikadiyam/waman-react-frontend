import React,{PureComponent} from "react";
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import './customer.css';
import ReactTable from "react-table"; 
import Table from './table';
import Post from './post';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {reactLocalStorage} from 'reactjs-localstorage';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import FormatListNumberedRtlTwoToneIcon from '@material-ui/icons/FormatListNumberedRtlTwoTone';
import order from './images/kingdom-1137.png';
import  money from './images/pale-32.png';
class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <CancelOutlinedIcon onClick={this.props.closePopup} className="cancel"></CancelOutlinedIcon>
            <Post  />
          </div>
        </div>
      );
    }
  }
class Customer extends PureComponent{
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
      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
      componentDidMount() {
        const emailId = reactLocalStorage.get('emailId');
        const name = reactLocalStorage.get('name');
        this.setState({ emailId:emailId });
        this.setState({ name: name});
        Axios.get(`https://waman-api.azurewebsites.net/cust/dashboard/orders?emailId=`+emailId)
          .then(res => {
          const orders = res.data;
          console.log(orders)
          this.setState({ orders:orders });  
        })
      Axios.get(`https://waman-api.azurewebsites.net/cust/dashboard/earning?emailId=`+emailId)
          .then(res => {
          const points = res.data;
          this.setState({ points:points });  
        })
      }
    render(){
      const points=this.state.points;
      const orders=this.state.orders;
        return(
            <div className="customer">
                <span className="customer_head">Hello {this.state.name}, What's your main focus today</span>
                <div className="body">
                    <div className="customer_details">
                        <button className="order_button" onClick={this.togglePopup.bind(this)}>NEWORDER</button>
                                {this.state.showPopup ? 
                                <Popup
                                    closePopup={this.togglePopup.bind(this)}
                                />
                                : null
                                }
                        <div className="customer_details_points">
                            <div className="customer_details_points_name">
                                <span className="count_name">TOTALPOINTS:</span>
                                <img className="count_image" src={money}/>
                            </div>
                            <span className="count">{points.map((points,index)=>{return <span>{points.accBalance}</span>})}</span>
                        </div>

                        <div className="customer_details_orders">
                            <div className="customer_details_points_name">
                                <span className="count_name">TOTAL ORDERS :</span>
                                <img className="count_image" src={order}/>
                            </div>
                            <span className="count">{orders.map((orders,index)=>{return <span>{orders.count}</span>})}</span>
                        </div>
                    </div>

                    <div className="customer_history">
                        <Table/>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Customer);