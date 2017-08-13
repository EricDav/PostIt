import React from 'react';
import DashboardHeader from './dashboardHeader';
import DashboardSideBar from './dashboardSideBar';
import MessageBoard from './messageBoard';
import CreateGroupModal from './createGroupModal';
import RightSideBarNav from './sideBarRight';
import { getGroupsRequest } from '../../actions/getGroupsAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRightNavBarView } from '../../actions/setRightNavBarView';

class Dashboard extends React.Component {
    componentWillMount() {
      this.props.getGroupsRequest();
    }
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
            <MessageBoard messages={this.props.messages} setRightNavBarView={setRightNavBarView}/>
              <RightSideBarNav members={this.props.members} group={this.props.group}/>
            </div>
            </div>
            <CreateGroupModal/>
            </div>
            </div>
            </section>
          </div> 
          </div>
          </div>
        );
    }
}
const dashboardPropTypes = {
  getGroupsRequest: PropTypes.func,
  setRightNavBarView: PropTypes.func
}
PropTypes.checkPropTypes(dashboardPropTypes, 'prop', 'Dashboard');

function mapStateToProps(state) {
  return {
    allGroups: state.groups,
    user: state.auth.user.currentUser,
    messages: state.messages,
    members: state.members,
    group: state.group,
  };
}
export default connect(mapStateToProps, {getGroupsRequest, setRightNavBarView})(Dashboard);
