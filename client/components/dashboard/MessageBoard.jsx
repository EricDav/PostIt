import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import Messages from './Message.jsx';
import TextInput from './TextInput.jsx';
import GroupButton from './GroupButton.jsx';
import Line from './Line.jsx';
import Piority from './Piority.jsx';

/** @class MessageBoard
 * @classdesc component for Message board
 */
export class MessageBoard extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.getMessages = this.getMessages.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * 
     * @return {void} no return or void
     */
  onClick(event) {
    if (this.props.isSmallScreenSize) {
      this.props.dashboardPage(5, 0);
    }
    if (event.target.id === 'icon') {
      this.props.setRightNavBarView(1);
    } else if (event.target.id === 'add') {
      this.props.setRightNavBarView(2);
    }
  }

  /**
     * @description - retrieve the current group messages
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  getMessages() {
    let lastMessageId;
    if (this.props.messages.length !== 0) {
      lastMessageId = this.props.messages[this.props.messages.length - 1]
        .message.senderId;
    }
    let initialSeenLast = 0;
    let isNewMessage = true;
    this.props.initialNewMessages.forEach((initialNewMessage) => {
      if (initialNewMessage.groupId === this.props.currentGroup.id) {
        initialSeenLast = initialNewMessage.newMessage;
      }
    });
    if (initialSeenLast === 0) {
      isNewMessage = false;
    }
    return this.props.messages.map((message) => {
      if (isNewMessage &&
      this.props.messages[this.props.messages.length - initialSeenLast]
        .message.id
        === message.message.id) {
        return (
          <div key={message.message.id}>
            {lastMessageId !== this.props.userId &&
            <Line key={message.message.id}/>}
            <Messages name={message.message.senderUsername}
              key={message.message.id + 1}
              content={message.message.content}
              viewers={message.viewers}
              date={message.message.createdAt}/>
          </div>
        );
      } else {
        return (
          <Messages name={message.message.senderUsername}
            key={message.message.id}
            content={message.message.content}
            viewers={message.viewers}
            date={message.message.createdAt}
            priority ={message.message.priority}/>
        );
      }
    });
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const messages = this.getMessages();
    return (
      <div id="email-details"
        className="col s12 m6 l6 offset-l3 offset-m3 card-panel">
        <p className="email-subject">
          <span className="">
            {this.props.currentGroup.id &&
              <span>
                <a href="#!"><p data-tip="View members">
                  <i onClick={this.onClick}
                    id ="icon"
                    className="material-icons right">group
                  </i></p></a>
                <ReactTooltip />
              </span>
            }
            { this.props.currentGroup.id &&
                 <span>
                   <a href="#!"><p data-tip="Add members">
                     <i onClick={this.onClick}
                       id = "add" className="material-icons right">group_add
                     </i></p></a>
                   <ReactTooltip />
                 </span>}
            <b>#{this.props.currentGroup.name}</b>
          </span>
        </p>
        <div id="message-board" className="email-content-wrap">
          <ul className="collection listMessage">
            {messages}
          </ul>
        </div>
        <div className="email-content-wrap em">
          <div className="row">
            <div className="col s12 m12 l12">
              <ul>
                <li className="collection-item avatar" id="text-input">
                  {this.props.currentGroup.id && <TextInput/>}
                  {<Piority/>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param  {object} state the store state
 * 
 * @return {Object} returns an object
 */
export function mapStateToProps(state) {
  return {
    currentGroup: state.group,
    seenLast: state.seenLast,
    initialNewMessages: state.initialNewMessages,
    isSmallScreenSize: state.screenSize,
    userId: state.auth.user.currentUser.id
  };
}

export default connect(mapStateToProps)(MessageBoard);
