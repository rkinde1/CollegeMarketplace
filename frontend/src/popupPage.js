import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//how to make popup page in window
function popupPage(){

    return(
        <div>
            <h4>Popup page</h4>
            <Popup trigger=
                {<button> Click to open page </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                Page open
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close page
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )

}
export default popupPage 