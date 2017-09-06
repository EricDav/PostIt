import React from 'react';
import { connect } from 'react-redux';

import createMessage from '../../actions/createMessageAction';
import { getNewGroupMessages, getInitialNewMessages } from  '../../actions/getGroupsAction';
import PropTypes from 'prop-types';
import { getGroupMessages, updateSeenMessages } from '../../actions/getGroupMessages';
import { setTextInput } from '../../actions/userActions';
import getMessageIds from '../../helpers/getMessageIds';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            priority: ''
        }
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
}

    onKeyDown(event) {
        if (event.which == 13) {
             event.preventDefault();
             if (this.props.piority === '') {
               Materialize.toast('You need to select a mesage type!', 2000, 'purple');
             } else {
               const data = {
                    content: this.state.content,
                    priority: this.props.piority
                }
                    this.setState({
                        content: '',
                    });
             this.props.createMessage(data, this.props.currentGroup.id.toString()).then(
                 () => {
                   
                       
                            const seenMessageIds = getMessageIds(this.props.messages);
                            const updateSeenMessagesData = {
                                seenMessageIds,
                                seenLast: seenMessageIds.length
                            }
                            this.props.updateSeenMessages(this.props.currentGroupId.toString(), updateSeenMessagesData)
                            this.props.getInitialNewMessages(this.props.newMessages);
                        }
             )
             }
        }
    }

    render() {
        const { content } = this.state;
        return (
             <div className="input-field row" >
                 <textarea value={content} onKeyDown={this.onKeyDown} onChange={this.onChange} className="materialize-textarea col s10" id= "text-area"  placeholder="write message..." name="content"></textarea>
            </div>
        )
    }
}
const textInputPropTypes = {
  createMessage: PropTypes.func,
  getGroupMessages: PropTypes.func,
  getNewGroupMessages: PropTypes.func,
  updateSeenMessages: PropTypes.func,
  getInitialNewMessages: PropTypes.func,
  setTextInput: PropTypes.func,
}
PropTypes.checkPropTypes(textInputPropTypes, 'prop', 'TextInput');

function mapStateToProps(state) {
    return {
        piority: state.setPiority,
        currentGroup: state.group,
        messages: state.messages,
        currentGroupId: state.group.id,
        newMessages: state.newMessages
    }
}

export default connect(mapStateToProps, {setTextInput, getInitialNewMessages, updateSeenMessages, getNewGroupMessages, createMessage, getGroupMessages })(TextInput);