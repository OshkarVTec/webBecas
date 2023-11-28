import "./Header.css";
import logo from "../assets/InspirArte.png";

function Header() {
	return (
		<header className="header">
			<div className="logoContainer">
				<img className="logo" src={logo} />
				<p className="pageTitle">InspirArte.</p>
			</div>
		</header>
	);
}

export default Header;
