import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export default function NavButtons({
  isDocDisabled,
  isResultsDisabled,
}: {
  isDocDisabled: boolean;
  isResultsDisabled: boolean;
}): ReactElement {
  const navigate = useNavigate();
  return (
    <div className="choice">
      <button
        disabled={isDocDisabled}
        type="submit"
        onClick={() => navigate("/login")}
      >
        Форма для заявки
      </button>
      <button
        disabled={isResultsDisabled}
        type="submit"
        onClick={() => navigate("/result")}
      >
        Сводная таблица
      </button>
    </div>
  );
}
