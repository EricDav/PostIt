import React from 'react';
import DashboardHeader from './dashboardHeader';
import DashboardSideBar from './dashboardSideBar';
import MessageBoard from './messageBoard';
import CreateGroupModal from './createGroupModal';
import RightSideBarNav from './rightSideBarNav';
import { getGroupsRequest } from '../../actions/getGroupsAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    componentWillMount() {
      this.props.getGroupsRequest();
    }
    // fetchGroups(event) {
    //    this.setState({groups: this.props.currentUserGroups});
    // }
    render() {
        return (
            <div>
                <DashboardHeader/>
     <div id="main">
    <div className="wrapper">
      <section id="content">
        <div className="container">
          <div id="mail-app" className="section">
            <div className="row">
              <div className="col s12">
              </div>
              <div className="col s12">
             <DashboardSideBar allGroups={this.props.allGroups} user={this.props.user}/>
            <MessageBoard/>
            </div>
            </div>
            <CreateGroupModal/>
            </div>
            </div>
            </section>
            <RightSideBarNav/>
          </div> 
          </div>
          </div>
        );
    }
}
const dashboardPropTypes = {
  getGroupsRequest: PropTypes.func
}
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Dashboard');

function mapStateToProps(state) {
  return {
    allGroups: state.groups,
    user: state.auth.user.currentUser
  };
}
export default connect(mapStateToProps, {getGroupsRequest})(Dashboard);