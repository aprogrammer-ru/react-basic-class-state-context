import React, { Component } from 'react';

interface StateContract {
  firstName: string;
  lastName: string;
  fullName: string;
}
class BasicLifecycleRootComponent extends Component {
    state = {
      showChildComponent: false
    };
  
    toggleComponent = () => {
      this.setState({ showChildComponent: !this.state.showChildComponent });
    };
  
    render() {
      return (
        <div>
          <button onClick={this.toggleComponent}>
            {this.state.showChildComponent ? 'Скрыть форму' : 'Открыть форму'}
          </button>
          {this.state.showChildComponent && <BasicLifecycleComponent />}
        </div>
      );
    }
  }

class BasicLifecycleComponent extends Component<{}, StateContract> {
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      fullName: ''
    };
    console.log('Constructor: компонент создается');
  }

  componentDidMount() {
    console.log('componentDidMount: компонент был смонтирован');
  }

  shouldComponentUpdate(nextProps: {}, nextState: StateContract) {
    console.log('shouldComponentUpdate: нужно ли компоненту обновляться?');
    console.log('nextState:', nextState, 'nextProps:', nextProps);
    if (nextState.firstName && nextState.lastName) {
      nextState.fullName = `${nextState.firstName} ${nextState.lastName}`;
    } else {
      nextState.fullName = '';
    }
    return true;
  }

  componentDidUpdate(prevProps: {}, prevState: StateContract) {
    console.log('componentDidUpdate: компонент был обновлен');
    console.log('prevProps:', prevProps, 'prevState:', prevState);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: компонент будет размонтирован');
  }

  handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ lastName: event.target.value });
  };

  render() {
    console.log('Render: компонент рендерится');
    const { firstName, lastName, fullName } = this.state;

    return (
      <div>
        <h1>Заполните данные</h1>
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={this.handleLastNameChange}
        />
        {fullName && <h2>Полное имя: {fullName}</h2>}
      </div>
    );
  }
}

export default BasicLifecycleRootComponent;