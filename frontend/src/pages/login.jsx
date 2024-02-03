import NavBar from "../components/navBar.jsx";
import "../styles/main.css";


function Login() {
    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg2" src="./images/background2.png"></img>
        </div>
        </>
    );   
}

export default Login;