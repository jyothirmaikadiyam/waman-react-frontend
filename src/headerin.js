import React from 'react';
import "./headerin.css";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
function headerin() {
  return (
        <div className="headerin">
            <h1 className="headerin_name">WAMAN</h1>
            <div className="header_logout">
                <span className="logout">LOGOUT</span>
                <PowerSettingsNewIcon/>
            </div>
        </div>   
  );
}

export default headerin;
