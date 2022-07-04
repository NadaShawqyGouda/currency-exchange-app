import React from 'react'

export default function CurrencyRow(props) {
  const  {currencyOptions, selectedCurrency , onChangeFunc, amount, onChangeAmount} = props
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeFunc}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
