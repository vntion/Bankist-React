import { useState } from 'react';

import Accounts from './Accounts';
import WelcomeMsg from './WelcomeMsg';
import Logo from './Logo';
import NavForm from './NavForm';
import Main from './Main';
import Balance from './Balance';
import Transfers from './Transfers';
import Loan from './Loan';
import Close from './Close';
import LogoutTimer from './LogoutTimer';
import DisplayMovements from './DisplayMovements';

export default function App() {
  const [accounts, setAccounts] = useState(Accounts);
  const [currAccount, setCurrAccount] = useState(null);
  const [clicked, setClicked] = useState(0);

  const handleClicked = function () {
    setClicked(click => click + 1);
  };

  const handleCurrAccount = function (acc) {
    setCurrAccount(acc);
  };

  const handleLoan = function (currAcc, loan, date) {
    const updatedMovements = [...currAcc.movements, Number(loan)];
    const updatedMovementsDates = [...currAcc.movementsDates, date];

    // Add loan
    setCurrAccount(acc => ({
      ...acc,
      movements: updatedMovements,
      movementsDates: updatedMovementsDates,
    }));

    // Update accounts
    setAccounts(accs =>
      accs.map(acc =>
        acc.id === currAcc.id
          ? {
              ...acc,
              movements: updatedMovements,
              movementsDates: updatedMovementsDates,
            }
          : acc
      )
    );
  };

  const handleTransfer = function (userName, amount) {
    if (
      !accounts.some(acc => acc.userName === userName) ||
      currAccount.userName === userName
    )
      return;

    const now = new Date().toISOString();

    setCurrAccount(acc => ({
      ...acc,
      movements: [...acc.movements, -amount],
      movementsDates: [...acc.movementsDates, new Date().toISOString()],
    }));

    // Add amount
    setAccounts(accs =>
      accs.map(acc => {
        if (acc.userName === userName) {
          // Receiving account
          return {
            ...acc,
            movements: [...acc.movements, amount],
            movementsDates: [...acc.movementsDates, now],
          };
        } else if (acc.userName === currAccount.userName) {
          // Current account
          return {
            ...acc,
            movements: [...acc.movements, -amount],
            movementsDates: [...acc.movementsDates, now],
          };
        }
        return acc;
      })
    );
  };

  const handleCloseAccount = function () {
    setAccounts(accs => accs.filter(acc => acc.id !== currAccount.id));
    setCurrAccount(null);
  };

  return (
    <>
      <nav>
        <WelcomeMsg currAccount={currAccount} />
        <Logo />
        <NavForm accounts={accounts} onCurrAccount={handleCurrAccount} />
      </nav>

      <Main style={currAccount && { opacity: 1 }}>
        {currAccount && (
          <>
            <Balance currAcc={currAccount} />
            <DisplayMovements currAcc={currAccount} onClicked={handleClicked} />
            <Transfers onTransfer={handleTransfer} onClicked={handleClicked} />
            <Loan
              currAcc={currAccount}
              onLoan={handleLoan}
              onClicked={handleClicked}
            />
            <Close currAcc={currAccount} onClose={handleCloseAccount} />
            <LogoutTimer onCurrAccount={handleCurrAccount} clicked={clicked} />
          </>
        )}
      </Main>
    </>
  );
}
