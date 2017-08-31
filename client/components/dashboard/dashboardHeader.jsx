import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/userActions';
import DashboardSearch from './dashboardSearch';
import Drop from './drop';


class DashboardHeader extends React.Component {
    render() {
        return ( <nav className="purple darken-1" role="navigation">
                 <div className="nav-wrapper container left nav">
                    <a id="logo-container"  className="brand-logo post">PostIt</a>
                    <ul className="right">
                   <Drop logout={this.props.logout} user={this.props.user}/>
                    </ul>
                    <ul className="right">
                      <li className="noHover">
                        <span className="number">2</span> <i className="material-icons left">notifications</i>
                        </li>
                    </ul>
                    <ul id="nav-mobile" className="side-nav">
                        <li><a href="#">Navbar Link</a></li>
                    </ul>
                <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
             </div>
            </nav>
        );
    }
}

const dashboardHeaderPropTypes = {
    auth: PropTypes.object,
    logout: PropTypes.object,
    user: PropTypes.string
}

PropTypes.checkPropTypes(dashboardHeaderPropTypes, 'prop', 'DashboardHeader' );
function mapStateToProps(state) {
    return {
        user: state.auth.user.currentUser,
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(DashboardHeader);