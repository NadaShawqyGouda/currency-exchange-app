import './App.css';
import CurrencyRow from './CurrencyRow';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=7ccf70fda9dd3ef5110af738be6555e7';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  
  let fromAmount, toAmount;
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  function handleFromAmoutChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmoutChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data =>{
      const firstCurrency = Object.keys(data.rates)[27]
      setCurrencyOptions([ ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}&from=${fromCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  return (
    <div className="App">
      <h1>convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={fromCurrency}
        onChangeFunc = {e => setFromCurrency(e.target.value)}
        onChangeAmount = {handleFromAmoutChange}
        amount = {fromAmount}
      />
      <div>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={toCurrency}
        onChangeFunc = {e => setToCurrency(e.target.value)}
        onChangeAmount = {handleToAmoutChange}
        amount = {toAmount}
      />
    </div>
  );
}

export default App;
