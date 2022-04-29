import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import icons from "../assets/images/icons.svg";
import { Link } from "react-router-dom";
import { signOut } from "../actions";
import uiIcons from "../assets/images/ui-icons.svg";

const Header = ({ user, location, signOut }) => {
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [timeleft, setTimeLeft] = useState(10);

  const refTimer = useRef(null);
  const refCounter = useRef(null);

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
    setShow(!show);
  };
  const renderExpandButton = () => {
    if (!showBtn) return null;
    return (
      <div
        onClick={onClickExpandNav}
        className="btn__hamburger print-hide-adea"
      >
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
        <div
          className="nav__side__profile flex--row "
          style={{ alignItems: "center", gap: "1rem" }}
        >
          <svg viewBox="0 0 25 25" style={{ width: "50px", height: "50px" }}>
            <use href={`${uiIcons}#logo`}></use>
          </svg>
          <h3 style={{ padding: 0 }}>Admin</h3>
        </div>
        <Link
          to="/"
          className="link"
          style={
            location.pathname === "/" ? { backgroundColor: "#ff4040" } : {}
          }
        >
          <svg viewBox="0 0 25 25" className="ui-icon">
            <use href={`${uiIcons}#home`} className="ui-icon"></use>
          </svg>
          <span>home</span>
        </Link>
        <Link
          to="/order"
          className="link"
          style={
            location.pathname === "/order" ? { backgroundColor: "#ff4040" } : {}
          }
        >
          <svg viewBox="0 0 25 25" className="ui-icon">
            <use href={`${uiIcons}#pickup`} className="ui-icon"></use>
          </svg>
          <span>reports</span>
        </Link>
        <Link
          to="/user"
          className="link"
          style={
            location.pathname === "/user" ? { backgroundColor: "#ff4040" } : {}
          }
        >
          <svg viewBox="0 0 25 25" className="ui-icon">
            <use href={`${uiIcons}#account`} className="ui-icon"></use>
          </svg>
          <span>users</span>
        </Link>
        <button onClick={signOut}>Sign out</button>
      </nav>
    );
  };

  useEffect(() => {
    if (user.currentUser) {
      console.log(`timer staatt!`);
      const timeOutId = window.setTimeout(signOut, 5000);
      refTimer.current = timeOutId;
    } else {
      window.clearTimeout(refTimer.current);
    }

    if (user.currentUser) {
      const counterId = setInterval(() => {
        if (timeleft <= 0) clearInterval(counterId);
        console.log(timeleft);
        let time;
        time -= 1;
        setTimeLeft(time);
      }, 1000);
      refCounter.current = counterId;
    } else {
      clearInterval(refCounter.current);
    }
  }, [user.currentUser]);

  useEffect(() => {
    console.log(timeleft);
  }, [timeleft]);

  // useEffect(() => {
  //   let timeleft = 10;
  //   const timer = setInterval(() => {
  //     if (timeleft <= 0) clearInterval(timer);
  //     console.log(timeleft);
  //     timeleft -= 1;
  //   }, 1000);
  // }, []);

  const render = () => {
    return (
      <>
        {renderExpandButton()}
        <div className="signout-timer">Sign out in 11:59</div>
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

const mapStateToProps = ({ user, userError }) => {
  return {
    user,
    userError,
  };
};

export default connect(mapStateToProps, {
  signOut,
})(Header);
