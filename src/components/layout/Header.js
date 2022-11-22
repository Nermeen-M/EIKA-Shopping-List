import logo from "../../assets/images/logo.png";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" width="88" height="44" className="logo" />
      <h1 className="title">EIKA's Shopping List</h1>
    </header>
  );
};

export default Header;
