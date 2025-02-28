import React, { Component } from 'react';

interface StateContract {
  rates: { [key: string]: number };
  base: string;
  date: string;
  loading: boolean;
}

class AdvancedLifecycleComponent extends Component<{}, StateContract> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rates: {},
      base: 'USD',
      date: '',
      loading: true
    };
    console.log('Constructor: компонент создается');
  }
   
  // componentDidMount - вызывается после монтирования компонента
  componentDidMount() {
    console.log('componentDidMount: компонент был смонтирован');
    this.fetchRates();
  }
  
  // shouldComponentUpdate - вызывается перед обновлением компонента
  shouldComponentUpdate(nextProps: {}, nextState: StateContract) {
    console.log('shouldComponentUpdate: нужно ли компоненту обновляться?');
    console.log('nextState:', nextState, 'nextProps:', nextProps);
    return true;
  }
  
  // componentDidUpdate - вызывается после обновления компонента
  componentDidUpdate(prevProps: {}, prevState: StateContract) {
      console.log('componentDidUpdate: компонент был обновлен');
    console.log('prevProps:', prevProps, 'prevState:', prevState);
    if (prevState.base !== this.state.base) {
      this.fetchRates();
    }
  }
  // componentWillUnmount - вызывается перед размонтированием компонента
  componentWillUnmount() {
    console.log('componentWillUnmount: компонент будет размонтирован');
  }

  fetchRates = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${this.state.base}`);
      const data = await response.json();
      const filteredRates = Object.keys(data.rates)
        .filter(currency => ['AED', 'RUB', 'BYN', 'USD', 'EUR'].includes(currency))
        .reduce((obj, key) => {
          obj[key] = data.rates[key];
          return obj;
        }, {} as { [key: string]: number });
      this.setState({
        rates: filteredRates,
        date: data.date,
        loading: false
      });
    } catch (error) {
      console.error('Ошибка при загрузке курсов валют:', error);
      this.setState({ loading: false });
    }
  };

  handleBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ base: event.target.value, loading: true });
  };

  render() {
    console.log('Render: компонент рендерится');
    const { rates, base, date, loading } = this.state;

    if (loading) {
      return <div>Загрузка...</div>;
    }

    return (
      <div>
        <h1>Курсы валют</h1>
        <p>Дата: {date}</p>
        <select value={base} onChange={this.handleBaseChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="RUB">RUB</option>
        </select>
        <div>
          {Object.keys(rates).map(currency => (
            <p key={currency}>
              {currency}: {rates[currency]}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default AdvancedLifecycleComponent;