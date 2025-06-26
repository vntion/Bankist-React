import { useAccounts } from '../Contexts/AccountsContext';
import '../index.css';

import { formatCur } from './Helpers';

export default function Balance() {
  const { currAccount } = useAccounts();

  // Date
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    // weekday: 'long',
  };
  const date = new Intl.DateTimeFormat(currAccount.locale, options).format(now);

  // Set Balance
  const balance = currAccount.movements.reduce((acc, mov) => acc + mov, 0);

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{date}</span>
        </p>
      </div>
      <p className="balance__value">
        {formatCur(balance, currAccount.currency, currAccount.locale)}
      </p>
    </div>
  );
}
