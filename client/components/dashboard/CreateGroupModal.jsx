import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import createGroupRequest from '../../actions/createGroupAction';
class CreateGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description:  ' ',
            descriptionError: ' ',
            modalClassName: "email-type",
            status: 'Create',
            start: true,
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onBlur(event) {
    if (this.state.name && this.state.description) {
      this.setState({
        start: true
      })
    }
    if (event.target.name === 'name') {
      if (this.state.name.length > 20) {
        this.setState({
          nameError: 'Group name can not be more than 20 characters',
        })
        return;
      }
      this.props.createGroupRequest({name: this.state.name, description: ''}).then(
        ()=> {},
        (data) => {
          this.setState({
            nameError: data.response.data.name
          })
        }
      )
    } else if (event.target.name === 'description') {
      this.props.createGroupRequest({name: '', description: this.state.description}).then(
        ()=> {},
        (data) => {
          this.setState({
            descriptionError: data.response.data.description
          })
        }
      )
    }
  }
  
    onClick(event) {
      event.preventDefault();
      this.props.createGroupRequest({name: this.state.name, description: this.state.description}).then(
        () => {
          Materialize.toast('Group created succesfully', 1500, 'purple');
          this.setState({
            name: '',
            description: ''
          });
        },
        ( data ) => {
          Materialize.toast('Cant create Group invalid group details', 3000, 'purple');
          this.setState({
            name: '',
            description: ''
          });
        }
      )
    }
    render() {
      const  { nameError, descriptionError, start }   = this.state
        return(
             <div id="modal1" className="modal">
              <div className="modal-content">
                <nav className="purple">
                  <div className="nav-wrapper">
                    <div className="left col s12 m5 l5">
                      <ul>
                        <li><a href="#!" className="email-menu"><i className="modal-action modal-close mdi-hardware-keyboard-backspace"></i></a>
                        </li>
                       <li ><a href="#!">Create a New Group</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col s12 m7 l7 hide-on-med-and-down">
                      <ul className="right">
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="model-email-content">
                <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input  max="10" onBlur={this.onBlur} id="group-title" type="text" className="validate" value={this.state.name} name = "name" onChange={this.onChange} required/>
                        <label htmlFor="group-title">Group Title</label>
                      </div>
                      { nameError && <div className="mes blue-text"><i>{nameError}</i></div>}
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea onBlur={this.onBlur} value={this.state.description} id="description" className="materialize-textarea" onChange={this.onChange} name="description"></textarea>
                        <label htmlFor="description">Enter description...</label>
                      </div>
                       {descriptionError && <div className="mes blue-text"><i>{descriptionError}</i></div>}
                    </div>
                     <div className="row">
                    <div className="input-field col s12">
                      <button onClick={this.onClick} className="modal-action modal-close btn purple darken-1 waves-effect waves-light col s12">{this.state.status}</button>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

const createGroupModalPropTypes = {
  createGroupRequest: PropTypes.func
}

PropTypes.checkPropTypes(createGroupModalPropTypes, 'prop', 'CreateGroupModal');

export default connect(null, {createGroupRequest})(CreateGroupModal);