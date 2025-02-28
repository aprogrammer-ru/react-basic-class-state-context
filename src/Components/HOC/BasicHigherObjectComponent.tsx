import React, { Component } from 'react';

// Higher-Order Component (HOC)- оборачивает компонент и добавляет логи при монтировании и размонтировании компонента
function LoggingWrapperComponent<T>(WrappedComponent: React.ComponentType<T>) {
  return class extends Component<T> {
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} was mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${WrappedComponent.name} will unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

interface PropsContract {
  name: string;
}

class SimpleGreetComponent extends Component<PropsContract> {
  render() {
    return <h1>Привет, {this.props.name}!</h1>;
  }
}

// Отображает приветственное сообщение
const BasicComponentWithLogger = LoggingWrapperComponent(SimpleGreetComponent);

class BasicHOCDemo extends Component {
  state = {
    showComponent: false
  };

  toggleComponent = () => {
    this.setState({ showComponent: !this.state.showComponent });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleComponent}>
          {this.state.showComponent ? 'Скрыть компонент' : 'Показать компонент'}
        </button>
        {this.state.showComponent && <BasicComponentWithLogger name="Мир" />}
      </div>
    );
  }
}

export default BasicHOCDemo;