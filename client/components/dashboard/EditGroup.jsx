import React from 'react';

/** @class EditGroup
 * @classdesc component for Editing group details
 */
class EditGroup extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.state = {
      name: this.props.currentGroup.name,
      description: this.props.currentGroup.description,
      showLabelInput: false,
      showLabelTextArea: false,
      error: {}
    };
  }
  /**
     * @description - show a pop up to confirm an action
     * 
     * @return {void} no return or void
     */
  showAlert() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Group!'
    }, () => {
      const deleteGroupData = {
        groupId: this.props.currentGroup.id
      };
      this.props.dashboardPage(0, 0);
      this.props.deleteCurrentGroup(deleteGroupData);
      this.props.setCurrentGroup({});
      Materialize.toast('Group deleted successfully', 2000, 'red');
    });
  }
  /**
     * @description - handles the onchange event
     * 
     * @param  {object} event the event for the content field
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
     * @return {void} no return or void
     */
  onClick(event) {
    event.preventDefault();
    if (event.target.textContent === 'Update Now') {
      if (this.state.name === this.props.currentGroup.name
        && this.state.description === this.props.currentGroup.description) {
        Materialize.toast('Cant update, No change observed', 2000, 'purple');
      } else if (this.state.name === this.props.currentGroup.name) {
        Materialize.toast('You cant update only description', 2000, 'red');
      } else {
        const updatedGroup = {
          id: this.props.currentGroup.id,
          name: this.state.name,
          description: this.state.description,
          creator: this.props.currentGroup.creator,
          createdAt: this.props.currentGroup.createdAt,
          updatedAt: this.props.currentGroup.updatedAt
        };
        this.props.updateCurrentGroup(updatedGroup, this.props.currentGroup.id)
          .then(
            () => {
              this.props.dashboardPage(this.props.showInitial, 1);
              Materialize.toast('Group updated successfully', 1500, 'green');
            },

            (data) => {
              if (data.response.data.message ===
              'Failed to authenticate token.') {
                Materialize
                  .toast('Can not edit group details. Your session has expired',
                    2000, 'red', () => {
                      localStorage.removeItem('jwtToken');
                      window.location = '/';
                    });
              } else {
                this.setState({
                  error: data.response.data.error
                });
              }
            }
          );
      }
    } else if (event.target.textContent === 'Cancel') {
      this.props.dashboardPage(this.props.showInitial, 1);
    } else {
      this.showAlert();
    }
  }
  /**
     * @description - handles the onfocus event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onFocus(event) {
    if (event.target.id === 'description') {
      this.setState({
        showLabelTextArea: true
      });
    } else {
      this.setState({
        showLabelInput: true
      });
    }
  }

  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (<div id="email-details"
      className="col s12 m6 l6 offset-l3 offset-m3 card-panel">
      <form onSubmit={this.onSubmit} className="login-form">
        <div className="row">
          <div className="input-field col s12 center">
            <h5 className="center"><b>Edit Group Details</b></h5>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input onChange={this.onChange}
              onFocus={this.onFocus} className="showLabelFullname" name= "name"
              value={this.state.name}
              id="fullname" type="text"
              required="true"/>
            {this.state.showLabelInput &&
            <label htmlFor="Name">Enter Name...</label>}
          </div>
          {this.state.error.name &&
          <div className="mes"><i>{this.state.error.name}</i></div>}
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea onChange={this.onChange} onFocus={this.onFocus}
              id="description" className="materialize-textarea"
              value={this.state.description}
              name="description"></textarea>
            {this.state.showLabelTextArea &&
            <label htmlFor="description">Enter description...</label> }
          </div>
          {this.state.error.description &&
          <div className="mes">
            <i>{this.state.error.description}</i></div>}
        </div>
        <div className="row">
          <a onClick={this.onClick} id="update" className="col s6">
            <button className={`btn purple darken-1 waves-effect 
            waves-light col s12` }>
                      Update Now
            </button></a>
          <a onClick={this.onClick} id="delete" className="col s6">
            <button className={`btn red darken-1 waves-effect 
            waves-light col s12`}>
                      Delete Group
            </button></a>
        </div>
        <div className="col s12 resetUser">
          <p className="margin center medium-small sign-up">
            <a onClick={this.onClick} href="#!"><i>Cancel</i>
            </a>
          </p>
        </div>
      </form>
    </div>);
  }
}

export default EditGroup;
