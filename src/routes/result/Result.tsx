import { useState, useEffect, ReactElement } from "react";
import "./Result.css";

function Loading() {
  return <h2>🌀 Загрузка...</h2>;
}

async function getResults(): Promise<[string, number][]> {
  const response = await fetch(`http://localhost:3000/documents`);

  const data: { title: string }[] = await response.json();
  const countTitles: { [key: string]: number } = data.reduce<{
    [key: string]: number;
  }>((acc, item) => {
    if (acc[item.title]) {
      acc[item.title]++;
    } else {
      acc[item.title] = 1;
    }
    return acc;
  }, {});
  return Object.entries(countTitles);
}

export default function Result() {
  const [state, setState] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState<ReactElement[]>();
  useEffect(() => {
    setState("loading");
    getResults()
      .then((res) => {
        res.sort((a, b) => +b[1] - +a[1]);
        console.log(res);
        setState("success");
        setList(
          res.map((title) => (
            <li key={title[0]} className="document-item">
              <span className="document-item__title">{title[0]}</span>
              <span className="document-item__count">{title[1]}</span>
            </li>
          ))
        );
      })
      .catch((err) => {
        console.error("Error:", err);
        setState("error");
        setError(err);
      });
  }, []);

  if (state === "error") return <h1>{error.toString()}</h1>;

  return (
    <>
      {state === "loading" ? (
        <Loading />
      ) : (
        <ul className="result-list">{list}</ul>
      )}
    </>
  );
}
