import "./Login.css";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  function authenticate(login, pass) {
    if (login && pass) {
      window.location = "/form";
    }
  }

  return (
    <>
      <div className="authenticate">
        <label>
          Логин
          <input
            type="text"
            name="title"
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </label>
        <label>
          Пароль
          <input
            type="text"
            name="title"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit" onClick={() => authenticate(login, password)}>
          Войти
        </button>
      </div>
    </>
  );
}
