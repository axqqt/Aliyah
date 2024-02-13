import "./navBar.css";
import "../../pages/main.css";

const NavBar = () => {
    return(
        <>
            <div className="navBar">
                <img alt="site-logo" className="siteLogo" src="./images/logo.svg"></img>
                <nav className="navContainer">
                    <a className="navItem" href="/">Home</a>
                    <a className="navItem" href="#">About</a>
                    <a className="navItem" href="#">Courses</a>
                    <a className="navItem" href="#">Support</a>
                    <a className="navItem" href="questions">Test</a>
                </nav>
                <div className="logContainer">
                    <a className="loginBtn" href="login">Login</a>
                    <a className="registerBtn" href="register">Register</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;