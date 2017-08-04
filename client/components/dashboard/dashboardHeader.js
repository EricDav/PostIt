import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { logout } from '../../actions/authActions';

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        event.preventDefault();
        this.props.logout();
         browserHistory.push('/');
    }
    render() {
        return (
            <div className="col s12">
                <nav className="purple darken-1">
                  <div className="nav-wrapper">
                    <div className="left col s12 m5 l5">
                      <ul>
                        <li><a href="#!" data-activates="slide-out" className="button-collapse show-on-large" className="email-menu">
                        </a>
                        </li>
                        <li><a href="#!" className="email-type"><h4>PostIt</h4></a>
                        </li>
                        <li className="right"><a href="#!"><i className="mdi-action-search"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div className="col s12 m7 l7 hide-on-med-and-down" onClick={this.onClick}>
                      <ul className="right">
                        <li><a>Logout</a></li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
        );
    }
}
DashboardHeader.propTypes = {
    auth: propTypes.object.isRequired,
    logout: propTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(DashboardHeader);