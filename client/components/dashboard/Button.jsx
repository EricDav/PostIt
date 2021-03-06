import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addUserToAGroup } from '../../actions/UserAction';
import { getGroupMembers } from '../../actions/GroupAction';

/** @class Button
 * @classdesc component for Button
 */
export class Button extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      hasAdded: false
    };
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick() {
    this.setState({
      hasAdded: true
    });
    const data = { userId: this.props.id };
    this.props.addUserToAGroup(data, this.props.groupId).then(
      () => {
        Materialize.toast(`${this.props.fullName}
        has been added Successfully to the group`, 2000, 'green');
      },
      () => {
        Materialize.toast(`An error occured. ${this.props.fullName} 
        has not been added to the group`, 2000, 'red');
      }
    );
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const hasAdded = this.state.hasAdded;
    return (
      <button onClick={this.onClick}
        id="but"
        className="right btn"
        type="submit"
        name="action"
        disabled={hasAdded}>Add Member
      </button>
    );
  }
}

const ButtonPropTypes = {
  addUserToAGroup: PropTypes.func,
  getGroupMembers: PropTypes.func,
  fullName: PropTypes.String
};
PropTypes.checkPropTypes(ButtonPropTypes, 'prop', 'Button');

export default connect(null, { getGroupMembers, addUserToAGroup })(Button);
