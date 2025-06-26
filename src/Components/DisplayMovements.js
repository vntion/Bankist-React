import { useState, useEffect } from 'react';

import Movements from './Movements';
import Summary from './Summary';
import { useAccounts } from '../Contexts/AccountsContext';

export default function DisplayMovements() {
  const [isSort, setIsSort] = useState(false);

  const { currAccount, dispatch } = useAccounts();

  const handleSort = function () {
    setIsSort(sort => !sort);
    dispatch({ type: 'click' });
  };

  useEffect(() => {
    setIsSort(false);
  }, [currAccount]);

  return (
    <>
      <Movements currAcc={currAccount} sort={isSort} />
      <Summary currAcc={currAccount} onSort={handleSort} />
    </>
  );
}
