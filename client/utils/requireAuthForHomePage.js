import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
    class AuthenticateHome extends React.Component {
        componentWillMount() {
            if (this.props.isAuthenticated) {
                this.context.router.push('dashboard');
            } else {
                this.context.router.push('/');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props}/>
            );
        }
    }
  AuthenticateHome.propTypes = {
      isAuthenticated: PropTypes.bool.isRequired
  }

  AuthenticateHome.contextTypes = {
      router: PropTypes.object.isRequired
  }

    function mapStateToProps(state) {
       return {
         isAuthenticated: state.auth.isAuthenticated
       }
    }
  return connect(mapStateToProps)(AuthenticateHome);
}