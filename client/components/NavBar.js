import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { logout } from '../actions/userActions';



class NavBar extends React.Component {
    render() {
        return ( <nav className="purple darken-1" role="navigation">
                 <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">PostIt</a>
                    <ul className="right hide-on-med-and-down">
                      <li onClick={this.onClick}></li>
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

export default NavBar;