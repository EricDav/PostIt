import React from 'react';

class Group extends React.Component {
    render() {
        return (
            <li className="collection-item avatar email-unread group-channel">
                <a href=""><span className="group-title">{this.props.name}</span></a>
                <a href="#!" className="secondary-content"><span className="new badge reddish">6</span></a>
            </li>
        )
    }
}

export default Group;