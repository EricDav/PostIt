import React from 'react';

class Footer extends React.Component {
    render() {
        return (
        <footer className="page-footer purple darken-1">
           <div className="footer-copyright">
            <div className="container">
                Project by <a className="orange-text text-lighten-3" href="http://materializecss.com">Pythagoras</a>
            </div>
          </div>
       </footer>
        );
    }
}

export default Footer;