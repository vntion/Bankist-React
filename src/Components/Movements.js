import '../index.css';

import { formatCur, formatMovementDate } from './Helpers';

export default function Movements({ currAcc, sort }) {
  const sortedMovs = sort
    ? currAcc.movements.slice().sort((a, b) => a - b)
    : currAcc.movements;

  // const sortedDates = sort
  //   ? currAcc.movementsDates.slice().sort()
  //   : currAcc.movementsDates;

  // const length = sortedMovs.length;

  return (
    <div className="movements">
      {sortedMovs.map((mov, i) => (
        <Movement mov={mov} currAcc={currAcc} index={i} key={i} />
      ))}
    </div>
  );
}

function Movement({ mov, currAcc, index }) {
  const type = mov > 0 ? 'deposit' : 'withdrawal';

  const date = new Date(currAcc.movementsDates[index]);
  const displayDate = formatMovementDate(date, currAcc.locale);

  return (
    <div className="movements__row">
      <div className={`movements__type movements__type--${type}`}>
        {index + 1} {type}
      </div>
      <div className="movements__date">{displayDate}</div>
      <div className="movements__value">
        {formatCur(mov, currAcc.currency, currAcc.locale)}
      </div>
    </div>
  );
}
