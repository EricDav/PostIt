import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <li className="collection-item avatar ">
                    <span className="circle indigo darken-1">A</span>
                        <span className="email-title"><a href="">{this.props.name}</a></span><span className="ultra-small grey-text time-text">09:23 am</span> 
                    <span className="truncate auto">{this.props.content}</span>
                </li>
        )
    }
}

export default Message;