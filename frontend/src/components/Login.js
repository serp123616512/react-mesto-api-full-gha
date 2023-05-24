import React from "react";

import AuthForm from "./AuthForm.js";

function Login ({onLogin}) {

  return (
    <AuthForm
      name="login"
      title="Вход"
      subtitle="Еще не зарегистрированы?"
      link="/sign-up"
      linkText="Зарегистрироваться"
      onSubmit={onLogin}
      submitButtonText="Войти"
    />
  )
}

export default Login;
