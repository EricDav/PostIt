import React from 'react';

class Member extends React.Component {
    render() {
            return (
            <li className="collection-item avatar email-unread group-channel">
                <a><span className="group-title">{this.props.fullname}</span></a>
                <a href="#!" className="secondary-content"><span className="new badge reddish">6</span></a>
            </li>
        );
    }
}

export default Member;