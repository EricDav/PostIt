import React from 'react';
import DashboardHeader from './dashboardHeader';
import DashboardSideBar from './dashboardSideBar';
import Footer from '../footer';

class Dashboard extends React.Component {
    render() {
        return (
        <div className="body-container"   className="image">
            <div id="mail-app" className="section">
            <div className="row">
            <DashboardHeader/>
            <DashboardSideBar/>
            </div>
            </div>
             <Footer/>
            </div>
        )
    }
}

export default Dashboard;
