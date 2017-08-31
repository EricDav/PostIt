import React from 'react';
import connect from 'react-redux';

import Button from './button';

class SearchedUser extends React.Component {
    render() {
        const Buton = <Button id={this.props.userId} groupId = {this.props.groupId} fullname={this.props.fullname}/>
            return (
            <li className="collection-item avatar email-unread group-channel">
                <a><span className="group-title">{this.props.fullname}</span>
                 { !this.props.members.includes(this.props.username) && Buton }</a>
                <a href="#!" className="secondary-content"></a>
            </li>
        );
    }
}

export default SearchedUser;