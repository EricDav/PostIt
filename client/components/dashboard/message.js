import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <li className="collection-item avatar ">
                    <span className="circle indigo darken-1">A</span>
                        <span className="email-title"><a href="">{this.props.name}</a></span>
                        <span className="ultra-small grey-text time-text">  {new Date(this.props.date).toLocaleString()}</span> 
                    <span className="truncate auto">{this.props.content}</span>
                    <span className="viewers"><i>seen by: {this.props.viewers}</i></span>
                </li>
        )
    }
}

export default Message;