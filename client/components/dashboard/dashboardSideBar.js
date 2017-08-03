import React from 'react';

class DashboardSideBar extends React.Component {
    render() {
        return (
            <div id="email-list" className="col s10 m4 l4 card-panel z-depth-1">
                  <ul className="collection">
                    <li className="collection-item avatar email-unread">
                      <span className="circle purple lighten-1">G</span>
                      <span className="email-title">Groups</span>
                      <a href="#!" className="secondary-content"><span className="new badge blue">4</span></a>
                    </li>
                    <li className="collection-item avatar email-unread">
                      <span className="circle blue lighten-1">N</span>
                      <i className="mdi-maps-local-offer icon green-text"></i>
                      <span className="email-title">Notifications</span>
                      <a href="#!" className="secondary-content"><span className="new badge green">6</span></a>
                    </li>
                    <li className="collection-item avatar email-unread">
                      <i className="mdi-alert-error icon yellow-text text-darken-3"></i>
                      <span className="circle purple lighten-1">P</span>
                      <span className="email-title">Create Post</span>
                      <a href="#!" className="secondary-content"></a>
                    </li>
                    <li className="collection-item avatar email-unread">
                      <span className="circle red lighten-1">A</span>
                      <span className="email-title">Create New Group</span>
                      <p className="truncate grey-text ultra-small">Start connecting by creating a group</p>
                      <a href="#!" className="secondary-content email-time"></a>
                    </li>
                    <li className="collection-item avatar email-unread">
                      <span className="circle indigo darken-1">F</span>
                      <span className="email-title">Users Online</span>
                      <p className="truncate grey-text ultra-small">See some of your friends that are online</p>
                    </li>
                  </ul>
                </div>
        );
    }
}

export default DashboardSideBar;
