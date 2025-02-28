import { useState } from "react"; // Подключение хука useState из библиотеки React

// Описание: Простой счетчик на функциональных компонентах с использованием хука useState и обработчика событий.
const BasicFuncCounter = ({ value }: { value: number }) => {

  const [stateValue, setValue] = useState<number>(value); // Инициализация состояния счетчика stateValue и функции обновления состояния setValue

  // Обработчик события увеличения значения счетчика на 1
  const handleIncrement = () => {
    setValue(v => v + 1);
    console.log(stateValue);
  };

  // Возвращение разметки компонента
  return (
    <div>
      <h2>Счетчик:</h2>
      <p>Значение {stateValue}</p>
      <button onClick={handleIncrement}>
        +1
      </button>
    </div>
  );
};

export default BasicFuncCounter;