import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { logout } from '../../actions/authActions';
import DashboardSearch from './dashboardSearch';


class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
         this.openModal = this.openModal.bind(this);
    }
    openModal() {
    $('#modal1').modal('open');
  }
    onClick(event) {
        this.props.logout().then(
            () => {
              browserHistory.push('/');
              window.location.reload();
            },
            () => {}
        )
    }
    render() {
        return ( <nav className="purple darken-1" role="navigation">
                 <div className="nav-wrapper container left nav">
                    <a id="logo-container"  className="brand-logo post">PostIt</a>
                    <ul className="right">
                    <li ><a onClick={this.onClick}>Logout</a></li>
                    </ul>
                    <ul className="right">
                      <li className="noHover">
                        <i className="material-icons left">account_circle</i>
                          {this.props.user.fullname}
                        </li>
                        <li>
                            <a 
                     id="login"
                            data-target="modal1"
                    className="orange-text modal-trigger"
                            >  Create New Group
                            <i className="material-icons left">create</i>
                         </a>
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