import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button type="submit" onClick={() => navigate("/login")}>
          Форма для заявки
        </button>
        <button type="submit" onClick={() => navigate("/result")}>
          Сводная таблица
        </button>
      </div>
    </>
  );
}

export default App;
