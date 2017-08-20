import React from 'react';
import { connect } from 'react-redux';
import createMessage from '../../actions/createMessageAction';
import { getNewGroupMessages, getInitialNewMessages } from  '../../actions/getGroupsAction';
import PropTypes from 'prop-types';
import { getGroupMessages, updateSeenMessages } from '../../actions/getGroupMessages';
import getMessageIds from '../../helpers/getMessageIds';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            piority: '',
            groupName: this.props.currentGroup.name,
            type: 1
        }
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
    }

    modifyValue(event) {
        this.setState({
            piority: event.target.value
        })
    }
    onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    
}

    onKeyDown(event) {
        if (event.which == 13) {
             event.preventDefault();
             this.props.createMessage(this.state, this.props.currentGroup.id.toString()).then(
                 () => {
                     this.setState({
                         content: '',
                         groupName: this.props.currentGroup.name,
                         type: 1
                     });
                    this.props.getGroupMessages(this.props.currentGroup.id.toString()).then(
                        () => {
                            const seenMessageIds = getMessageIds(this.props.messages);
                            const updateSeenMessagesData = {seenMessageIds,
                            seenLast: seenMessageIds.length}
                            this.props.updateSeenMessages(this.props.currentGroupId.toString(), updateSeenMessagesData)
                            this.props.getInitialNewMessages(this.props.newMessages);
                        }
                    )
                 },
                 (response) => {
                 }
             )
        }
    }

    render() {
        const { content } = this.state;
        return (
             <div className="input-field row" >
                 <textarea value={content} onKeyDown={this.onKeyDown} onChange={this.onChange} className="materialize-textarea col s10" id= "text-area"  placeholder="write message..." name="content"></textarea>
                 <select className="col s2" onChange={this.modifyValue} value={this.state.piority} >
                    {/*<option value="" disabled selected>Priority</option>*/}
                    <option onClick={this.onClick} value="Normal" >Normal</option>
                    <option value="Urgent" >Urgent</option>
                     <option value="Critical">Critical</option>
                 </select>
            </div>
        )
    }
}
const textInputPropTypes = {
  createMessage: PropTypes.func,
  getGroupMessages: PropTypes.func,
  getNewGroupMessages: PropTypes.func,
  updateSeenMessages: PropTypes.func,
  getInitialNewMessages: PropTypes.func
}
PropTypes.checkPropTypes(textInputPropTypes, 'prop', 'TextInput');

function mapStateToProps(state) {
    return {
        currentGroup: state.group,
        messages: state.messages,
        currentGroupId: state.group.id,
        newMessages: state.newMessages
    }
}

export default connect(mapStateToProps, {getInitialNewMessages, updateSeenMessages, getNewGroupMessages, createMessage, getGroupMessages })(TextInput);