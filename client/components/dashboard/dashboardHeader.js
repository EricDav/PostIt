import React from 'react';

class DashboardHeader extends React.Component {
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
                    <div className="col s12 m7 l7 hide-on-med-and-down">
                      <ul className="right">
                        <li>Logout</li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
        );
    }
}

export default DashboardHeader;