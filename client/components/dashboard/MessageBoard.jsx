import React from 'react';
import { connect } from 'react-redux';

import Messages from './Message.jsx';
import TextInput from './TextInput.jsx';
import GroupButton from './GroupButton.jsx';
import Line from './Line.jsx';
import Piority from './Piority.jsx';

/** @class MessageBoard
 * @classdesc component for Message board
 */
class MessageBoard extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.getMessages = this.getMessages.bind(this);
  }

  /**
     * @description - retrieve the current group messages
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  getMessages() {
    let initialSeenLast;
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
            <Line key={message.message.id}/>
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
            date={message.message.createdAt}/>
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
      <div id="email-details" className="col  s12 m6 l6 card-panel">
        <hr className="grey-text text-lighten-2"/>
        <div className="collection-item avatar">
          <p className="email-subject truncate">
            <span className="email-tag grey lighten-3">
              <b>#{this.props.currentGroup.name}</b>
            </span> <span className="email-tag spa light-blue lighten-4">
              {this.props.currentGroup.id &&
              <GroupButton
                text={'ADD MEMBERS'}
                setRightNavBarView={this.props.setRightNavBarView}
                isSmallScreenSize = {this.props.isSmallScreenSize}
              />}
              { this.props.currentGroup.id &&
              <GroupButton text={'VIEW MEMBERS'}
                setRightNavBarView={this.props.setRightNavBarView}
                isSmallScreenSize = {this.props.isSmallScreenSize}
              />}</span>
          </p>
        </div>
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
function mapStateToProps(state) {
  return {
    currentGroup: state.group,
    seenLast: state.seenLast,
    initialNewMessages: state.initialNewMessages,
    isSmallScreenSize: state.screenSize
  };
}

export default connect(mapStateToProps)(MessageBoard);
