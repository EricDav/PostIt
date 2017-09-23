import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setRightNavBarView, dashboardPage } from
  '../../actions/DashboardViewAction';

/** @class GroupButton
 * @classdesc component for the button used to view
 * members or add members to a group
 */
class GroupButton extends React.Component {
  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  /**
     * @description - handles the onclick event
     * 
     * @param  {object} event the event for the content field
     * @return {void} no return or void
     */
  onClick(event) {
    if (this.props.isSmallScreenSize) {
      this.props.dashboardPage(5, 0);
    }
    if (event.target.id === 'VIEW MEMBERS') {
      this.props.setRightNavBarView(1);
    } else if (event.target.id === 'ADD MEMBERS') {
      this.props.setRightNavBarView(2);
    }
  }
  /**
   *@description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <button onClick={this.onClick}
        className=" btn waves-effect waves-light groupBut"
        id={this.props.text} type="submit"
        name="action" >{this.props.text}
      </button>
    );
  }
}
const setViewPropTypes = {
  setRightNavBarView: PropTypes.func
};
PropTypes.checkPropTypes(setViewPropTypes, 'prop', 'GroupButton');

export default connect(null, { setRightNavBarView,
  dashboardPage })(GroupButton);
