import React from 'react';
import NavBar from '../NavBar';
import Form from './form';

class Feedback extends React.Component {
    render() {
        return (
         <div className="body-container"   className="image">
            <NavBar/>
            <center>
            <div id="login-page" className="col s12 z-depth-4 card-panel reset feed">
                <Form/>
            </div>
            </center>
        </div>

        )
    }
}
export default Feedback