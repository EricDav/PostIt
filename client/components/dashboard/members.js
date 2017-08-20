import React from 'react';

class Member extends React.Component {
    render() {
            return (
            <li className="collection-item avatar email-unread group-channel">
                <a><span className="group-title">{this.props.fullname}</span></a>
                <a href="#!" className="secondary-content"><span className ="mine">          
                </span></a>
            </li>
        );
    }
}

export default Member;