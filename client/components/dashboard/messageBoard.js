import React from 'react';
import Messages from './message';
import { connect } from 'react-redux';
import TextInput from './textInput';
import GroupButton from './groupButton';


class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
     this.getMessages = this.getMessages.bind(this);
  }
  getMessages() {
      return this.props.messages.map((message) => {
        return (
          <Messages name={message.senderUsername} key={message.id} content={message.content}/>
        );
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
                        </span> <span className="email-tag spa light-blue lighten-4"> <GroupButton text={"ADD MEMBERS"}/>
                        <GroupButton text={"VIEW MEMBERS"}  setRightNavBarView={this.props.setRightNavBarView}/></span>
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
                  <div className="email-content-wrap">
                    <div className="row">
                      <div className="col s12 m12 l12">
                        <ul>
                          <li className="collection-item avatar" id="text-input">
                              <TextInput/>
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
  }
}

export default connect(mapStateToProps)(MessageBoard)