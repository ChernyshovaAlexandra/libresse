import React from "react";
import libresse from "../../assets/images/LibresseLogo.png";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Header({ coins, page, opencardPage }) {
  let text = null;

  if (coins && coins.toString().substr(-1) == 1) {
    text = "балл";
  } else if (
    (coins && coins.toString().substr(-1) == 2) ||
    (coins && coins.toString().substr(-1) == 3) ||
    (coins && coins.toString().substr(-1) == 4)
  ) {
    text = "баллa";
  } else if (
    (coins && coins.toString() === "11") ||
    (coins && coins.toString() === "12") ||
    (coins && coins.toString() === "13") ||
    (coins && coins.toString() === "14")
  ) {
    text = "баллов";
  } else {
    text = "баллов";
  }

  return (
    <header>
      <nav className="navigation">
        {page !== "menu" && page !== "rules" && page !== "rules_full" ? (
          <div className="coins rounded bg-darkBlue text-white btn-type btn-type-with-icon">
            {coins ? +coins : "0"} <span>{text && text}</span>
          </div>
        ) : (
          <div></div>
        )}

        <div className="logo-top">
          <img src={libresse} alt="" />
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </nav>
      {!opencardPage && (
        <>
          {page !== "menu" && page !== "rules" ? (
            <Link
              to={"/"}
              replace
              className={`to-menu ${
                page === "registration" ? "text-pink" : "text-white"
              } btn-type btn-type-with-icon`}
            >
              {page === "rules_full" || `registration` ? `В меню` : `Назад`}
            </Link>
          ) : (
            <div></div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
