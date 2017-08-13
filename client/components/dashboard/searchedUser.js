import React from 'react';
import Button from './button';

class SearchedUser extends React.Component {
    render() {
            return (
            <li className="collection-item avatar email-unread group-channel">
                <a><span className="group-title">{this.props.fullname}</span> <Button /></a>
                <a href="#!" className="secondary-content"></a>
            </li>
        );
    }
}

export default SearchedUser;