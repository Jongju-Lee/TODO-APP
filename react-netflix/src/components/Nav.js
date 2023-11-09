import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        // 페이지 스크롤 최상단에서 내려간 값이 50이 넘어가면
        setShow(true);
      } else {
        // 페이지 스크롤 내려간 값이 50 이하면
        setShow(false);
      }

      return () => {
        window.removeEventListener("scroll", () => {});
      };
    });
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src={
          "//i.namu.wiki/i/nf50qJhCIkSGCDluHAv8KhwKg47LYui5AVARqeBvyEqE5xKtWDOP-bxU_m-r_uuw9ShE4qomlpNEzgNIwL30pg.svg"
        }
        width="200px"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img
        alt="User logged"
        src={
          process.env.PUBLIC_URL +
          "/assets/account_profile_user_avatar_icon_219236.png"
        }
        width="50px"
        className="nav__avatar"
      />
    </nav>
  );
};

export default Nav;
