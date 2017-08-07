import React from 'react';
import DashboardHeader from './dashboardHeader';
import DashboardSideBar from './dashboardSideBar';
import CreateGroupModal from '../groupForm';


class Dashboard extends React.Component {
    render() {
        return (
        <div className="body-container"  className="image">
            <DashboardHeader/>
            <CreateGroupModal/>
            <div id="mail-app" className="section">
            <div className="row">
            <DashboardSideBar/>
            </div>
            </div>
            </div>
        );
    }
}

export default Dashboard;
