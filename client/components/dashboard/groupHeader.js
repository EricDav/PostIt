import React from 'react';

class groupHeader extends React.Component {
    render() {
        return (
            <li className="collection-item avatar email-unread">
            <span className="email-title"></span>
          <p className="truncate grey-text ultra-small">Created By </p>
          <p className="grey-text ultra-small"><a href="">Edit group Details</a></p>
        </li>
        )
    }
}

export default groupHeader;