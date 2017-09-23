import React from 'react';

const Member = props =>
  (
  <li className="collection-item avatar email-unread group-channel Me">
    <a><span className="group-title">{props.member.fullName}</span></a>
    {props.member.active && <a href="#!"
      className="secondary-content"><span className ="mine">
      </span></a>}
  </li>
  );

export default Member;
