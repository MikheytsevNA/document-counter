import "./SendForm.css";
import AsyncSelect from "react-select/async";
import { ReactElement, useState } from "react";

async function checkExistingDoc(
  author: string,
  title: string
): Promise<boolean> {
  const response = await fetch(
    `http://localhost:3000/documents?author=${author}&title=${title}`
  );
  const result = await response.json();
  return result.length > 0;
}

export default function SendForm(): ReactElement {
  const [userChoice, setUserChoice] = useState("");
  const [titleChoice, setTitleChoice] = useState("");

  async function loadNames(): Promise<
    { value: string; label: string; color: string }[]
  > {
    const response = await fetch(`http://localhost:3000/documents`);
    const data = await response.json();
    const returnArray: string[] = Array.from(
      new Set(data.map((value: { author: string }) => value.author))
    );
    return returnArray.map((item: string) => ({
      value: item,
      label: item,
      color: "black",
    }));
  }

  async function sendDocument(title: string): Promise<null> {
    const author = userChoice;
    const isRepeatCall = await checkExistingDoc(author, title);
    if (!isRepeatCall) {
      const response = await fetch(`http://localhost:3000/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          title: title,
          author: author,
        }),
      });
      if (response.status < 400) {
        alert("Вы успешно отправили документ!");
      }
      return null;
    }
    throw Error(
      "Вы уже отправляли заявку на этот документ, она уже была учтена"
    );
  }

  return (
    <>
      <div className="form">
        <AsyncSelect
          loadOptions={loadNames}
          defaultOptions
          cacheOptions
          isSearchable={false}
          onChange={(choice) => setUserChoice(choice!.value)}
        />
        <input
          type="text"
          name="title"
          onChange={(event) => {
            setTitleChoice(event.target.value);
          }}
        />
        <button type="submit" onClick={() => sendDocument(titleChoice)}>
          Послать документ
        </button>
      </div>
    </>
  );
}
