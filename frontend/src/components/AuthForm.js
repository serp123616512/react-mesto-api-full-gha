import React, { useState } from "react";
import { Link } from "react-router-dom";

function AuthForm({
  name,
  title,
  subtitle,
  link,
  linkText,
  onSubmit,
  submitButtonText
  }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({email, password});
  }

  return (
    <section id={name} className="auth">
      <form
        name={`${name}-form`}
        className="auth__content"
        onSubmit={handleSubmit}
      >
        <h1 className="auth__title">{title}</h1>
        <input
          id={`${name}-email`}
          className="auth__input-text"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <span id={`${name}-email-error`} className="auth__input-error"></span>
        <input
          id={`${name}-password`}
          className="auth__input-text"
          type="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="30"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <span id={`${name}-password-error`} className="auth__input-error"></span>
        <button className="auth__accept button-hover" type="submit">{submitButtonText}</button>
        <h2 className="auth__subtitle">
          {subtitle}
          <Link className="auth__link button-hover" to={link} >{linkText}</Link>
        </h2>
      </form>
    </section>
  )
}

export default AuthForm;
