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
    render() {
        return (
            <div>
                <DashboardHeader/>
     <div id="main">
    <div className="wrapper">
      <section id="content">
        <div className="container">
          <div id="mail-app" class="section">
            <div className="row">
              <div className="col s12">
              </div>
              <div className="col s12">
            <DashboardSideBar/>      
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
Dashboard.propTypes = {
  getGroupsRequest: PropTypes.func.isRequired
}

export default connect(null, {getGroupsRequest})(Dashboard);
