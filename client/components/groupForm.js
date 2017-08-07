/* global Materialize */
/* global $ */
import React, { PropTypes } from 'react';
import TextInput from './common/textInput';


/** @class CreateDocumentModal
 * @classdesc component for create document modal
 */
class CreateGroupModal extends React.Component {
  /* eslint-disable Unexpected alert */

  /**
   * constructor - contains the constructor
   * @param  {type} props the properties of the class component
   * @param {object} context
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

//   componentDidMount() {
//     $('.modal-trigger').leanModal();
//   }

  /**
   * onUsernameChange - handles the username event handler
   * @param  {object} event the event for the username field
   * @return {void} no return or void
   */
  onChange(event) {
    const invalid = false;
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * onSave - handles the onSave event handler
   * @param {object} event the event handler
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.createGroupRequest(this.state)
    .then(
      () => {
        Materialize.toast('Group created Successfully', 3000, 'green',
      () => {
        $('#modal1').closeModal({ dismissible: true });
        $('.lean-overlay').css({ display: 'none' });
        $('.lean-overlay').remove();
      });
      },
    () => {
      const invalid = true;
      this.setState({
        error: 'Invalid credentials'
      });
    });
  }
  
  /**
   * render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
  <div id="modal1" className="modal modalStyle">
    <main>
      <center>
        <div className="section" />
        <center>
          <h6>Welcome, Log in Your Account!</h6>
        </center>
        <form className="col s12" onSubmit={this.onSubmit} method="post">
          <div className="row">
            <div className="col s12" />
          </div>

          <div className="row">
            <TextInput
              className="input-field col m12 s12"
              type="text"
              name="Group name"
              id="username-login"
              onChange={this.onChange}
              label="Group name"
              required
            />
          </div>

          <div className="row">
            <TextInput
              className="input-field col m12 s12"
              type="text"
              name="Group Description"
              id="password-login"
              onChange={this.onChange}
              label="Descripe the group"
              required
            />
          </div>

          <br />
          <center>
        <div className="row">
        <button
          type="submit"
          id="login-btn"
          name="btn_login"
          className="col s12 btn btn-large waves-effect light-reddish darken-3"
          disabled={this.state.invalid}
        >Submit</button>
        </div>
      </center>
        </form>
            <a className="modal-action modal-close">Create An account</a>
          </center>
          <div className="section" />
          <div className="section" />
        </main>
      </div>);
  }
}
CreateGroupModal.propTypes = {
  createGroupRequest: PropTypes.func.isRequired
};
CreateGroupModal.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateGroupModal;