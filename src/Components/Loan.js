import { useState } from 'react';
import '../index.css';
import { useAccounts } from '../Contexts/AccountsContext';

export default function Loan() {
  const [loan, setLoan] = useState('');

  const { currAccount, dispatch } = useAccounts();

  const handleLoan = function (e) {
    setLoan(Number(e.target.value.trim()));
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!loan) return;

    if (loan > 0 && currAccount.movements.some(mov => mov >= loan * 0.1)) {
      setTimeout(function () {
        dispatch({ type: 'loan', payload: loan });
      }, 2000);
      setLoan('');
    }
    dispatch({ type: 'click' });
  };

  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <form className="form form--loan" onSubmit={handleSubmit}>
        <input
          type="number"
          className="form__input form__input--loan-amount"
          value={loan}
          onChange={handleLoan}
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
}
