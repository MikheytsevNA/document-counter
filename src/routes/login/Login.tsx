import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

  function authenticate(login: string, pass: string) {
    if (login && pass) {
      navigate("/form");
    }
  }

  return (
    <div className="login-container">
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

      <div className="choice">
        <button
          disabled={true}
          type="submit"
          onClick={() => navigate("/login")}
        >
          Форма для заявки
        </button>
        <button type="submit" onClick={() => navigate("/result")}>
          Сводная таблица
        </button>
      </div>
    </div>
  );
}
