import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({email, signOut, LoginText, LogoutText, RegisterText}) {
    return (
      <header className="header">
        <div className="logo logo_color_white"></div>
        <div className="header__auth">
        <Routes>
          <Route path="/" element={
            <>
              <span className="header__email">{email}</span>
              <Link
                className="header__link button-hover"
                onClick={signOut}
              >{LogoutText}</Link>
            </>
          } />
          <Route path="/sign-up" element={
            <Link
              className="header__link button-hover"
              to={'/sign-in'}
            >{LoginText}</Link>
          } />
          <Route path="/sign-in" element={
            <Link
              className="header__link button-hover"
              to={'/sign-up'}
            >{RegisterText}</Link>
          }/>
        </Routes>
        </div>
      </header>
    )
}

export default Header;
