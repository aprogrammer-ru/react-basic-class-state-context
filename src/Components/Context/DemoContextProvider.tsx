import { Component, createContext } from 'react';
import { LevelThree } from './LevelThree';

interface DemoContextStateContract {
  message: string;
}

// Создаем контекст
const DemoContext = createContext({ message: 'Сообщение из Context!', updateMessage: (msg: string) => { } });


class DemoContextComponent extends Component<{}, DemoContextStateContract> {
  constructor(props: {}) {
    super(props);

    this.state = {
      message: 'Сообщение из DemoContextProvider!'
    };
   
  }

  updateMessage = (msg: string) => {
    console.log('DemoContextProvider.updateMessage:', msg);
    this.setState({ message: msg });
  };

  render() {
    return (
      <DemoContext.Provider
        value={{
          message: this.state.message,
          updateMessage: this.updateMessage
        }}
      >
        <h1>Пример использования Context</h1>
        <LevelOne />
      </DemoContext.Provider>
    );
  }
}

class LevelOne extends Component {
  render() {
    return (
      <div>
        <h2>Уровень 1</h2>
        <LevelTwo />
      </div>
    );
  }
}

class LevelTwo extends Component {
  render() {
    return (
      <div>
        <h3>Уровень 2</h3>
        <LevelThree />
      </div>
    );
  }
}

export { DemoContextComponent as DemoContextProvider,  DemoContext };