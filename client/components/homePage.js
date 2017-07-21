import React from 'react';
import SignUp from './signup';
import LogIn from './LogIn';
import Footer from './footer';
import NavigationBar from './NavigationBar';
import NavBar from './NavBar';

class HomePage extends React.Component {
    render() {
        return (
        <div className="body-container">
            <NavBar/>
            <NavigationBar />
            <LogIn />
            <SignUp />
            <Footer />
        </div>
        );
    }
}
export default HomePage;
