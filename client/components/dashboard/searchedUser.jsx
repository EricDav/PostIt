import React from 'react';

import Button from './Button.jsx';

const SearchedUser = (props) => {
  const Buton = <Button id={props.userId} groupId =
    {props.groupId} fullName={props.fullName}/>;
  return (
    <li className="collection-item avatar email-unread group-channel">
      <a><span className="group-title">{props.fullName}</span>
        { !props.members.includes(props.userName) && Buton }</a>
      <a href="#!" className="secondary-content"></a>
    </li>
  );
};

export default SearchedUser;
