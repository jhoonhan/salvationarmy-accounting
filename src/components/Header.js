import React, { useState } from "react";
import icons from "../assets/images/icons.svg";

const Header = () => {
  const [show, setShow] = useState(false);

  const onClickExpandNav = () => {
    setShow(!show);
  };

  const render = () => {
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
          <div>REPORTS</div>
        </nav>
      </section>
    );
  };
  return render();
};

export default Header;
