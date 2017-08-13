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
            piority: ''
        }
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        console.log('Yeah')
    }
    modifyValue(event) {
        console.log('yes')
        this.setState({
            piority: event.target.value
        })
    }
    onChange(event) {
        console.log('yes')
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.value, event.target.name)
    
}

    onKeyDown(event) {
        if (event.which== 13) {
             event.preventDefault();
             this.props.createMessage(this.state, this.props.currentGroup.id.toString()).then(
                 () => {
                     this.setState({
                         content: ''
                     });
                    this.props.getGroupMessages(this.props.currentGroup.id.toString())
                 },
                 (response) => {
                     console.log(response.data);
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