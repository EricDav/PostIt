import React from 'react';

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="container">
              <div className="section">
                <div className="row">
            <div className="col s6 offset-s3 valign">
          <div className="row">
          <ul className="tabs tab-profile z-depth-1 purple darken-1" >
              <li className="tab"><a className="white-text waves-effect waves-light active" href="#login-page"><i className="mdi-editor-border-color"></i>Login</a>
              </li>
              <li className="tab" ><a className="white-text waves-effect waves-light" href="#signup-page"><i className="mdi-image-camera-alt"></i> Register</a>
              </li>                    
          <div className="indicator" ></div>
          </ul>
          
          </div>
        </div>
      </div>

    </div>
    <br></br>
  </div>
        );
    }
}

export default NavigationBar;