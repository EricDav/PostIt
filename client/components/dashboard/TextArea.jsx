import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createMessage, getNewGroupMessages, getInitialNewMessages,
  getGroupMessages, updateSeenMessages }
  from '../../actions/MessageAction';

/** @class TextInput
 * @classdesc component for TextInput
 */
export class TextArea extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priority: ''
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
     * @description - handles the onchange event
     * 
     * @param  {object} event the event for the content field
     * 
     * @return {void} no return or void
     */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * 
     * @return {void} no return or void
     */
  onKeyDown(event) {
    if (event.which === 13) {
      event.preventDefault();
      if (this.props.piority === '') {
        Materialize.toast('You need to select a mesage type!', 2000, 'purple');
      } else {
        const data = {
          content: this.state.content,
          priority: this.props.piority
        };
        this.setState({
          content: '',
        });
        this.props.createMessage(data,
          this.props.currentGroup.id.toString()
        );
      }
    }
  }

  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const { content } = this.state;
    return (
      <div className="input-field row" >
        <textarea value={content} onKeyDown={this.onKeyDown}
          onChange={this.onChange} className="materialize-textarea col s10"
          id= "text-area"
          placeholder="write message..." name="content"/>
      </div>
    );
  }
}
const textInputPropTypes = {
  createMessage: PropTypes.func,
  getGroupMessages: PropTypes.func,
  getNewGroupMessages: PropTypes.func,
  updateSeenMessages: PropTypes.func,
  getInitialNewMessages: PropTypes.func,
};

PropTypes.checkPropTypes(textInputPropTypes, 'prop', 'TextInput');

/**
 * @description mapStateToProps - maps state value to props
 * 
 * @param {object} state the store
 * 
 * @return {Object} returns an object
 */
export function mapStateToProps(state) {
  return {
    piority: state.setPiority,
    currentGroup: state.group,
    messages: state.messages,
    currentGroupId: state.group.id,
    newMessages: state.newMessages
  };
}

export default connect(mapStateToProps,
  {
    getInitialNewMessages,
    updateSeenMessages,
    getNewGroupMessages,
    createMessage,
    getGroupMessages
  })(TextArea);
