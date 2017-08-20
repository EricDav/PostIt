import React from 'react';
import Messages from './message';
import { connect } from 'react-redux';
import TextInput from './textInput';
import GroupButton from './groupButton';
import Line from './line';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
     this.getMessages = this.getMessages.bind(this);
  }
  getMessages() {
      let initialSeenLast;
      let isNewMessage = true;
      this.props.initialNewMessages.forEach((initialNewMessage) => {
        console.log(this.props.currentGroup)
        console.log(initialNewMessage.groupId , this.props.currentGroup.id);
        if (initialNewMessage.groupId == this.props.currentGroup.id) {
          initialSeenLast = initialNewMessage.newMessage;
           console.log(initialSeenLast, '+++++++');
        }
      });
       if (initialSeenLast == 0) {
          isNewMessage = false;
        }
        console.log(this.props.messages.length - initialSeenLast, '-------');
      return this.props.messages.map((message) => {
        if (this.props.messages[this.props.messages.length - initialSeenLast - 1].message.id == message.message.id && isNewMessage) {
          return (
            <Line key={message.message.id}/>
          )
        } else {
           return (
           <Messages name={message.message.senderUsername} key={message.message.id}
              content={message.message.content} viewers={message.viewers.toString()} date={message.message.createdAt}/>          
        );
        }
      });
    }
    render() {
      const messages = this.getMessages();
        return (
           <div id="email-details" className="col s12 m8 l8 card-panel my">
                  <hr className="grey-text text-lighten-2"/>
                  <div className="collection-item avatar">
                      <p className="email-subject truncate"><span className="email-tag grey lighten-3">
                        <b>#{this.props.currentGroup.name}</b>
                        </span> <span className="email-tag spa light-blue lighten-4"> 
                       {this.props.currentGroup.id && <GroupButton text={"ADD MEMBERS"}/>}
                       { this.props.currentGroup.id && <GroupButton text={"VIEW MEMBERS"}  setRightNavBarView={this.props.setRightNavBarView}/>}</span>
                  </p>
                  </div>
                  <div id="message-board" className="email-content-wrap">
                    <div className="row">
                      <div className="col s10 m10 l10">
                        <ul className="collection contain">
                          {messages}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="email-content-wrap em">
                    <div className="row">
                      <div className="col s12 m12 l12">
                        <ul>
                          <li className="collection-item avatar" id="text-input">
                             {this.props.currentGroup.id && <TextInput/>}
                          </li>
                        </ul>
                      </div>
                      <div className="col s2 m2 l2 email-actions">
                      </div>
                    </div>
                  </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    currentGroup: state.group,
    seenLast: state.seenLast,
    initialNewMessages: state.initialNewMessages,
  }
}

export default connect(mapStateToProps)(MessageBoard)