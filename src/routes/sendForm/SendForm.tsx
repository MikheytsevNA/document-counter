import "./SendForm.css";
import AsyncSelect from "react-select/async";
import { ReactElement, useState } from "react";
import NavButtons from "../../components/NavButtons";

async function checkExistingDoc(
  author: string,
  title: string
): Promise<boolean> {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_ADD}/documents?author=${author}&title=${title}`
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
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADD}/documents`
    );
    const data = await response.json();
    const returnArray: string[] = Array.from(
      new Set(data.map((value: { author: string }) => value.author))
    );
    return returnArray.map((item: string) => ({
      value: item,
      label: item,
      color: "black", // this select component needs styles in such way
    }));
  }

  async function sendDocument(title: string): Promise<null> {
    const author = userChoice;
    const isRepeatCall = await checkExistingDoc(author, title);
    if (!isRepeatCall) {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADD}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now().toString(),
            title: title,
            author: author,
          }),
        }
      );
      if (response.status < 400) {
        alert("Вы успешно отправили документ!");
      }
      return null;
    }
    alert("Вы уже отправляли заявку на этот документ, она уже была учтена.");
    throw Error(
      "Вы уже отправляли заявку на этот документ, она уже была учтена."
    );
  }

  return (
    <div className="form-container">
      <div className="form">
        <label className="form__select">
          ФИО конструктора
          <AsyncSelect
            loadOptions={loadNames}
            defaultOptions
            cacheOptions
            isSearchable={false}
            unstyled={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#646cff" : undefined,
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#858585cc" : undefined,
              }),
            }}
            classNames={{
              control: () => "form__select__selector",
            }}
            onChange={(choice) => setUserChoice(choice!.value)}
          />
        </label>
        <div>
          <label className="form__name">
            Наименование документа
            <input
              type="text"
              name="title"
              onChange={(event) => {
                setTitleChoice(event.target.value);
              }}
            />
          </label>
          <button
            disabled={titleChoice.length === 0}
            className="form__submit"
            type="submit"
            onClick={() => sendDocument(titleChoice)}
          >
            Послать документ
          </button>
        </div>
      </div>
      <NavButtons isDocDisabled={true} isResultsDisabled={false} />
    </div>
  );
}
