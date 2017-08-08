import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DashboardSideBar extends React.Component {
    render() {
        return (
            <div id="email-list" className="col s10 m3 l3 card-panel z-depth-1"  onLoad={this.onLoad}>
                  <ul className="collection">
                    <li className="collection-item avatar email-unread">
                      <span className="circle indigo darken-1">F</span>
                      <span className="email-title">Solomon Kingsley</span>
                      <p className="truncate grey-text ultra-small">Software developer @ Andela</p>
                      <p className="grey-text ultra-small"><a href="">edit profile</a></p>
                    </li>
                    <li className="collection-item avatar email-unread group-collection">
                      <span className="group-title">Groups</span>
                      <a className="secondary-content modal-trigger" href="#modal1"><span className="new bad"> + </span></a>
                    </li>
                    <li className="collection-item avatar email-unread group-channel">
                      <a href=""><span className="group-title">#lagos-all</span></a>
                      <a href="#!" className="secondary-content"><span className="new badge reddish">6</span></a>
                    </li>
                    <li className="collection-item avatar email-unread group-channel">
                      <span className="group-title">#developer-hub</span>
                      <a href="#!" className="secondary-content"><span className="new badge reddish">1</span></a>
                    </li>
                    <li className="collection-item avatar email-unread group-channel">
                      <span className="group-title">#friends-zone</span>
                      <a href="#!" className="secondary-content"><span className="new badge reddish">2</span></a>
                    </li>
                  </ul>
                </div>
        );
    }
}

export default DashboardSideBar;
