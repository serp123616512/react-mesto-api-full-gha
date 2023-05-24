import React from "react";

import AuthForm from "./AuthForm.js";

function Register ({onRegister}) {

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      subtitle="Уже зарегистрированы?"
      link="/sign-in"
      linkText="Войти"
      onSubmit={onRegister}
      submitButtonText="Зарегистрироваться"
    />
  )
}

export default Register;
