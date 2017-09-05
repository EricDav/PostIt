import React from 'react';
import { browserHistory } from 'react-router';

class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        this.props.logout();
    }
    render() {
        const firstName = this.props.user.fullname.split(' ')[0];
        return (
    <div>
            <a className='dropdown-button btn drop' href='#' data-activates='dropdown1'>{firstName}</a>
            <ul id='dropdown1' className='dropdown-content'>
                 <li><a href="#!">Profile</a></li>
                <li onClick={this.onClick}><a href="#!">Logout</a></li>
                 <li><a href="#!">Feedback</a></li>
            </ul>
    </div>

        )
    }
}
export default Drop;