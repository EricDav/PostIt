import React from 'react';
import { connect } from 'react-redux';

class Message extends React.Component {
    render() {
        let viewers = '';
        let seen = '';
        this.props.viewers.forEach((viewer) => {
            if (viewer !== this.props.user.username && viewer !== this.props.name) {
                viewers = viewers + ' ' + viewer;
            }
        });
        if (viewers !== '') {
            seen = 'seen by:'
        }
        return (
            <li className="collection-item avatar">
                    <span className="circle indigo darken-1">A</span>
                        <span className="email-title"><a href="">{this.props.name}</a></span>
                        <span className="ultra-small grey-text time-text">  {new Date(this.props.date).toLocaleString()}</span> 
                    <span className="truncate auto">{this.props.content}</span>
                    <span className="viewers"><i>{seen} {viewers}</i></span>
                </li>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.auth.user.currentUser,
      group: state.group
    }
}


export default connect(mapStateToProps)(Message);