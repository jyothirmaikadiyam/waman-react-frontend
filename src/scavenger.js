import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';
import './scavenger.css';
import Activelist from './activelist';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Sca_history from './sca_history';
class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <CancelOutlinedIcon onClick={this.props.closePopup} className="cancel"></CancelOutlinedIcon>
            <Sca_history />
          </div>
        </div>
      );
    }
  }
class Scavenger extends PureComponent{
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
        Axios.get(`https://waman-api.azurewebsites.net/scav/dashboard/orders?emailId=`+emailId)
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
      redirectToexecuteorder = () => {
        const { history } = this.props;
        if(history) history.push('/executeorder');
       }
    render(){
        const orders=this.state.orders;
        return(
            <div className="sca">
                <span className="sca_head">Hello , What's your main focus today</span>
                <div className="sca_body">
                    <div className="sca_details">
                        <button className="sca_order_button" onClick={this.redirectToexecuteorder}>YOUR ORDERS</button>
                        <button className="sca_order_button" onClick={this.togglePopup.bind(this)}>HISTORY</button>
                                {this.state.showPopup ? 
                                <Popup
                                    closePopup={this.togglePopup.bind(this)}
                                />
                                : null
                                }
                        <div className="sca_details_points">
                            <div className="sca_details_points_name">
                                <span className="sca_count_name">TOTAL ORDERS TO BE DONE:</span>
                                {/* <img className="count_image" src={money}/> */}
                            </div>
                            <span className="sca_count">20</span>
                        </div>

                        <div className="sca_details_orders">
                            <div className="sca_details_points_name">
                                <span className="sca_count_name">TOTAL ORDERS DONE :</span>
                                {/* <img className="count_image" src={order}/> */}
                            </div>
                            <span className="sca_count">{orders.map((orders,index)=>{return <span>{orders.count}</span>})}</span>
                        </div>
                    </div>

                    <div className="sca_orders_list">
                        <Activelist/>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Scavenger);