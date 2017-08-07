import {PropTypes} from 'react';
import React from 'react';
import Footer from './footer';
import Header from './NavBar';



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

App.propTypes = {
  children: PropTypes.object.isRequired,
};
export default App;