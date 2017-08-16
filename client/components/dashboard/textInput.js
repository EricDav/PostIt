import React from 'react';
import { connect } from 'react-redux';
import createMessage from '../../actions/createMessageAction';
import PropTypes from 'prop-types';
import { getGroupMessages } from '../../actions/getGroupMessages';

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
        if (event.which== 13) {
             event.preventDefault();
             this.props.createMessage(this.state, this.props.currentGroup.id.toString()).then(
                 () => {
                     this.setState({
                         content: '',
                         groupName: this.props.currentGroup.name,
                         type: 1
                     });
                    this.props.getGroupMessages(this.props.currentGroup.id.toString())
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
  getGroupMessages: PropTypes.func

}
PropTypes.checkPropTypes(textInputPropTypes, 'prop', 'TextInput');

function mapStateToProps(state) {
    return {
        currentGroup: state.group
    }
}

export default connect(mapStateToProps, { createMessage, getGroupMessages })(TextInput);