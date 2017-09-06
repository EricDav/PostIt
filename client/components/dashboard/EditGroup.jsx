import React from 'react';

class EditGroup extends React.Component {
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
        }
    }
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
    }
    this.props.dashboardPage(0, 0);
    this.props.deleteCurrentGroup(deleteGroupData);
    this.props.setCurrentGroup({});
    Materialize.toast('Group deleted successfully', 2000, 'purple')
  });
}
    onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onClick(event) {
    event.preventDefault();
    if (event.target.textContent === 'Update Now') {
        if (this.state.name === this.props.currentGroup.name 
        && this.state.description === this.props.currentGroup.description) {
            Materialize.toast('Cant update, No change observed', 2000, 'purple')
        } else if (this.state.name === this.props.currentGroup.name) {
            Materialize.toast('You cant update only description', 2000, 'purple');
        } else {
             this.props.updateCurrentGroup(this.state, this.props.currentGroup.id).then(
            () => {
                this.props.dashboardPage(this.props.showInitial, 1)
                Materialize.toast('Group updated successfully', 1500, 'purple');
            },

            (data) => {
                this.setState({
                    error: data.response.data
                });
            }
        )
        }
    } else if (event.target.textContent === 'Cancel') {
        this.props.dashboardPage(this.props.showInitial, 1);
    } else {
        this.showAlert();
    }
  }
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
    render() {
         return (<div id="email-details" className="col s12 m8 l8 card-panel my Message">
                <form onSubmit={this.onSubmit} className="login-form">
                  <div className="row">
                    <div className="input-field col s12 center">
                      <h5 className="center"><b>Edit Group Details</b></h5>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="input-field col s12">
                     <input onChange={this.onChange} onFocus={this.onFocus} className="showLabelFullname" name= "name" value={this.state.name}  id="fullname" type="text" required="true"/>
                      {this.state.showLabelInput && <label htmlFor="Name">Enter Name...</label>}
                    </div>
                    {this.state.error.name && <div className="mes blue-text"><i>{this.state.error.name}</i></div>}
                  </div>
                  <div className="row">
                      <div className="input-field col s12">
                        <textarea onChange={this.onChange} onFocus={this.onFocus} id="description" className="materialize-textarea" value={this.state.description}  name="description"></textarea>
                       {this.state.showLabelTextArea &&  <label htmlFor="description">Enter description...</label> }
                      </div>
                       {this.state.error.description && <div className="mes blue-text"><i>{this.state.error.description}</i></div>}
                    </div>
                <div className="row">
                    <a onClick={this.onClick} id="update" className="col s6">
                      <button className="btn purple darken-1 waves-effect waves-light col s12">
                      Update Now
                    </button></a>
                    <a onClick={this.onClick} id="delete" className="col s6">
                      <button className="btn red darken-1 waves-effect waves-light col s12">
                      Delete Group
                    </button></a>
                  </div>
                    <div className="col s12 resetUser">
                      <p className="margin center medium-small sign-up"><a onClick={this.onClick} href="#!"><i>Cancel</i></a></p>
                    </div>
                </form>
         </div>);
    }
}

export default EditGroup;
