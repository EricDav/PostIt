import React from 'react';

class RightSideBarNav extends React.Component {
    render() {
        return (
             <aside id="right-sidebar-nav">
        <ul id="chat-out" className="side-nav rightside-navigation">
            <li className="li-hover">
            <a href="#" data-activates="chat-out" className="chat-close-collapse right"><i className="mdi-navigation-close"></i></a>
            <div id="right-search" className="row">
                <form className="col s12">
                    <div className="input-field">
                        <i className="mdi-action-search prefix"></i>
                        <input id="icon_prefix" type="text" className="validate"/>
                        <label htmlFor="icon_prefix">Search</label>
                    </div>
                </form>
            </div>
            </li>
            <li className="li-hover">
                <ul className="chat-collapsible" data-collapsible="expandable">
                <li>
                    <div className="collapsible-header teal white-text active"><i className="mdi-social-whatshot"></i>Recent Activity</div>
                    <div className="collapsible-body recent-activity">
                        <div className="recent-activity-list chat-out-list row">
                            <div className="col s3 recent-activity-list-icon"><i className="mdi-action-add-shopping-cart"></i>
                            </div>
                            <div className="col s9 recent-activity-list-text">
                                <a href="#">just now</a>
                                <p>Jim Doe Purchased new equipments for zonal office.</p>
                            </div>
                        </div>
                        <div className="recent-activity-list chat-out-list row">
                            <div className="col s3 recent-activity-list-icon"><i className="mdi-device-airplanemode-on"></i>
                            </div>
                            <div className="col s9 recent-activity-list-text">
                                <a href="#">Yesterday</a>
                                <p>Your Next flight for USA will be on 15th August 2015.</p>
                            </div>
                        </div>
                        <div className="recent-activity-list chat-out-list row">
                            <div className="col s3 recent-activity-list-icon"><i className="mdi-action-settings-voice"></i>
                            </div>
                            <div className="col s9 recent-activity-list-text">
                                <a href="#">5 Days Ago</a>
                                <p>Natalya Parker Send you a voice mail for next conference.</p>
                            </div>
                        </div>
                        <div className="recent-activity-list chat-out-list row">
                            <div className="col s3 recent-activity-list-icon"><i className="mdi-action-store"></i>
                            </div>
                            <div className="col s9 recent-activity-list-text">
                                <a href="#">Last Week</a>
                                <p>Jessy Jay open a new store at S.G Road.</p>
                            </div>
                        </div>
                        <div className="recent-activity-list chat-out-list row">
                            <div className="col s3 recent-activity-list-icon"><i className="mdi-action-settings-voice"></i>
                            </div>
                            <div className="col s9 recent-activity-list-text">
                                <a href="#">5 Days Ago</a>
                                <p>Natalya Parker Send you a voice mail for next conference.</p>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="collapsible-header light-blue white-text active"><i className="mdi-editor-attach-money"></i>Sales Repoart</div>
                    <div className="collapsible-body sales-repoart">
                        <div className="sales-repoart-list  chat-out-list row">
                            <div className="col s8">Target Salse</div>
                            <div className="col s4"><span id="sales-line-1"></span>
                            </div>
                        </div>
                        <div className="sales-repoart-list chat-out-list row">
                            <div className="col s8">Payment Due</div>
                            <div className="col s4"><span id="sales-bar-1"></span>
                            </div>
                        </div>
                        <div className="sales-repoart-list chat-out-list row">
                            <div className="col s8">Total Delivery</div>
                            <div className="col s4"><span id="sales-line-2"></span>
                            </div>
                        </div>
                        <div className="sales-repoart-list chat-out-list row">
                            <div className="col s8">Total Progress</div>
                            <div className="col s4"><span id="sales-bar-2"></span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="collapsible-header red white-text"><i className="mdi-action-stars"></i>Favorite Associates</div>
                    <div className="collapsible-body favorite-associates">
                        <div className="favorite-associate-list chat-out-list row">
                            <div className="col s4"><img src="images/avatar.jpg" alt="" className="circle responsive-img online-user valign profile-image"/>
                            </div>
                            <div className="col s8">
                                <p>Eileen Sideways</p>
                                <p className="place">Los Angeles, CA</p>
                            </div>
                        </div>
                        <div className="favorite-associate-list chat-out-list row">
                            <div className="col s4"><img src="images/avatar.jpg" alt="" className="circle responsive-img online-user valign profile-image"/>
                            </div>
                            <div className="col s8">
                                <p>Zaham Sindil</p>
                                <p className="place">San Francisco, CA</p>
                            </div>
                        </div>
                        <div className="favorite-associate-list chat-out-list row">
                            <div className="col s4"><img src="images/avatar.jpg" alt="" className="circle responsive-img offline-user valign profile-image"/>
                            </div>
                            <div className="col s8">
                                <p>Renov Leongal</p>
                                <p className="place">Cebu City, Philippines</p>
                            </div>
                        </div>
                        <div className="favorite-associate-list chat-out-list row">
                            <div className="col s4"><img src="images/avatar.jpg" alt="" className="circle responsive-img online-user valign profile-image"/>
                            </div>
                            <div className="col s8">
                                <p>Weno Carasbong</p>
                                <p>Tokyo, Japan</p>
                            </div>
                        </div>
                        <div className="favorite-associate-list chat-out-list row">
                            <div className="col s4"><img src="images/avatar.jpg" alt="" className="circle responsive-img offline-user valign profile-image"/>
                            </div>
                            <div className="col s8">
                                <p>Nusja Nawancali</p>
                                <p className="place">Bangkok, Thailand</p>
                            </div>
                        </div>
                    </div>
                </li>
                </ul>
            </li>
        </ul>
      </aside>
        )
    }
}

export default RightSideBarNav;