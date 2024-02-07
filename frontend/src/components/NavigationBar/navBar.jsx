import "./navBar.css";
import "../../pages/main.css";

const NavBar = () => {
    return(
        <>
            <div className="navBar">
                <img className="avItem" src="./images/avatar.png"></img>
                <nav className="navContainer">
                    <a className="navItem" href="/">Home</a>
                    <a className="navItem" href="#">About</a>
                    <a className="navItem" href="#">Courses</a>
                </nav>
                <div className="logContainer">
                    <a className="loginBtn" href="login">Login</a>
                    <a className="signupBtn" href="register">Sign up</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;