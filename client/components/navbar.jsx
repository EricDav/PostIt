import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { setPage } from '../actions/userActions';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        if (this.props.currentPage === 1) {
            browserHistory.push('signup');
            this.props.setPage(2)
        } else if (this.props.currentPage === 2) {
            browserHistory.push('/');
            this.props.setPage(1)
        } else {
            browserHistory.push('/');
            this.props.setPage(1);
        }
    }
    render() {
        let currentPageText;
        if (this.props.currentPage === 1) {
            currentPageText = 'Signup';
        } else if (this.props.currentPage === 2) {
            currentPageText = 'Login';
        } else {
            currentPageText = 'Home';
        }
        return ( <nav className="purple darken-1" role="navigation">
                 <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">PostIt</a>
                    <ul className="right hide-on-med-and-down">
                      <li onClick={this.onClick}><a href="#!"><b>{currentPageText}</b></a></li>
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

const NavBarPropTypes = {
   setPage: PropTypes.func
 }

 function mapStateToProps(state) {
   return {
     currentPage: state.setCurrentPage
   };
 }

PropTypes.checkPropTypes(NavBarPropTypes, 'prop', 'NavBar');

export default connect(mapStateToProps, {setPage})(NavBar);
