import PropTypes from 'prop-types';
import React from 'react';

import Footer from './Footer.jsx';

/* eslint-disable react/prefer-stateless-function */
/**
 * @class App
 * @classdesc main app component
 */
class App extends React.Component {
  /**
   * render - renders app component
   * @return {object} the component view
   */
  render() {
    return (
      <div>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

const AppPropTypes = {
  children: PropTypes.object
};

PropTypes.checkPropTypes(AppPropTypes, 'prop', 'App');
export default App;
