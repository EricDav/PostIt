import React from 'react';

class groupHeader extends React.Component {
    render() {
        let groupOption;
        if (this.props.group.creator === this.props.user.username) {
            groupOption = 'Edit group Details'
        } else {
            groupOption = 'Leave Group';
        }
        return (
            <li className="collection-item avatar email-unread">
            <span className="email-title"></span>
          <p className="truncate grey-text ultra-small">Created By {this.props.user.username}</p>
          <p className="grey-text ultra-small"><a href="">{groupOption}</a></p>
        </li>
        )
    }
}

export default groupHeader;