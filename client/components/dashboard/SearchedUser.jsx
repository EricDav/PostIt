import React from 'react';
import connect from 'react-redux';

import Button from './Button';

const SearchedUser = (props) => {
        const Buton = <Button id={props.userId} groupId = {props.groupId} fullname={props.fullname}/>
            return (
            <li className="collection-item avatar email-unread group-channel">
                <a><span className="group-title">{props.fullname}</span>
                 { !props.members.includes(props.username) && Buton }</a>
                <a href="#!" className="secondary-content"></a>
            </li>
        );
}

export default SearchedUser;