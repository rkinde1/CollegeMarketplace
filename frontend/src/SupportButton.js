import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import IconButton from '@mui/material/IconButton';

const LiveHelpButton =()=>{
    //working support button popup, find way to connect button to support page
    return (
        <div>
            <Popup trigger=
                {<IconButton
                    color="secondary"
                > 
                    <LiveHelpIcon /> 
                </IconButton>} 
                modal nested>
                {
                    close => (
                        <div style={{ position:"relative", height: "300px", width: "300px"  }}>
                            <div className='content'>
                                <div className="App">
                                    
                                </div>
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
}
export default LiveHelpButton