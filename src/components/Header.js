import React, { useState, useEffect } from "react";
import icons from "../assets/images/icons.svg";
import { Link } from "react-router-dom";

const Header = ({ location }) => {
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (location.pathname === "/order") {
      setShow(false);
      setShowBtn(true);
    } else {
      setShow(true);
      setShowBtn(false);
    }
  }, [location]);

  const onClickExpandNav = () => {
    console.log(`aaang`);
    setShow(!show);
  };
  const renderExpandButton = () => {
    if (!showBtn) return null;
    return (
      <div onClick={onClickExpandNav} className="btn__hamburger">
        <svg
          viewBox="0 0 50 50"
          className="icon__hamburger"
          style={
            show
              ? { transform: "rotate(360deg)", backgroundColor: "#4064ff" }
              : null
          }
        >
          <use href={`${icons}#hamburger`}></use>
        </svg>
      </div>
    );
  };
  const renderNav = () => {
    return (
      <nav className="nav__side">
        <div className="nav__side__profile">
          <h3>Admin</h3>
        </div>
        <Link to="/" className="link">
          home
        </Link>
        <Link to="/order" className="link">
          reports
        </Link>
        <Link to="/user" className="link">
          user
        </Link>
      </nav>
    );
  };

  const render = () => {
    return (
      <>
        {renderExpandButton()}
        <section
          className="header__container"
          style={!show ? { transform: "translateX(-20vw)" } : null}
        >
          {renderNav()}
        </section>
      </>
    );
  };
  return render();
};

export default Header;
