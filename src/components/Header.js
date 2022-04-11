import React, { useState, useEffect } from "react";
import icons from "../assets/images/icons.svg";
import { Link } from "react-router-dom";

const Header = ({ location }) => {
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (location.pathname === "/order") {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [location]);

  const onClickExpandNav = () => {
    setShow(!show);
  };

  const render = () => {
    if (!showBtn) return null;
    return (
      <section className="header__container">
        <div onClick={onClickExpandNav} className="btn__hamburger">
          <svg viewBox="0 0 50 50" className="icon__hamburger">
            <use href={`${icons}#hamburger`}></use>
          </svg>
        </div>
        <nav style={show ? { display: "grid" } : {}}>
          <div>HOME</div>
          <div>USERS</div>

          <Link to="/order" className="circular-progess">
            <div>REPORTS</div>
          </Link>
        </nav>
      </section>
    );
  };
  return render();
};

export default Header;
