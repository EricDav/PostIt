import React from 'react';

export default () => {
            return (
            <li className="collection-item avatar email-unread group-channel Me">
                <a><span className="group-title">{this.props.member.fullname}</span></a>
               {this.props.member.active && <a href="#!" className="secondary-content"><span className ="mine">          
                </span></a>}
            </li>
        );
}
