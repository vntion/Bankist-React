import '../index.css';

import { formatCur } from './Helpers';

export default function Summary({ currAcc, onSort }) {
  const incomes = currAcc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outcomes = currAcc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = currAcc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currAcc.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">
        {formatCur(incomes, currAcc.currency, currAcc.locale)}
      </p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">
        {formatCur(Math.abs(outcomes), currAcc.currency, currAcc.locale)}
      </p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        {formatCur(interest, currAcc.currency, currAcc.locale)}
      </p>
      <button className="btn--sort" onClick={onSort}>
        &darr; SORT
      </button>
    </div>
  );
}
