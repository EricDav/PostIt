import React from 'react';

class NavBar extends React.Component {
    render() {
        return ( <nav className="purple darken-1" role="navigation">
                 <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">PostIt</a>
                    <ul className="right hide-on-med-and-down">
                      <li><a href="#">Read Documentation</a></li>
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