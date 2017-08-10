import React from 'react';
import PropTypes from 'prop-types';
import createGroupRequest from '../../actions/createGroupAction';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class CreateGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            errors: {namee: '', description: ''}
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
    onClick(event) {
      this.props.createGroupRequest({name: this.state.name, description: this.state.description}).then(
        () => {
          Materialize.toast('Group created succesfully', 1500, 'purple',
      () => {
        window.location.reload();
      });
    },
        ( data ) => {
           this.setState({errors: data.response.data});
          Materialize.toast(this.state.errors.message, 5000, 'purple',
      () => {
        
      });
        }
      )
    } 
    render() {
      const  errors   = this.state.errors;
        return(
             <div id="modal1" className="modal">
              <div className="modal-content">
                <nav className="cyan">
                  <div className="nav-wrapper">
                    <div className="left col s12 m5 l5">
                      <ul>
                        <li><a href="#!" className="email-menu"><i className="modal-action modal-close mdi-hardware-keyboard-backspace"></i></a>
                        </li>
                       <li ><a href="#!" onClick={this.onClick} className=" email-type">Create a New Group</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col s12 m7 l7 hide-on-med-and-down">
                      <ul className="right">
                        <li><a className="red" href="#!"><i className="material-icons">send</i></a>
                        </li>
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
                        <input id="group-title" type="text" className="validate" name = "name" onChange={this.onChange} required/>
                        <label htmlFor="group-title">Group Title</label>
                      </div>
                      <div className="mes blue-text"><i>{errors.name}</i></div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea id="description" className="materialize-textarea" onChange={this.onChange} name="description"></textarea>
                        <label htmlFor="description">Enter description...</label>
                      </div>
                      <div className="mes blue-text"><i>{errors.description}</i></div>
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
