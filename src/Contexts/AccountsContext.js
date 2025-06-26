import { createContext, useContext, useReducer } from 'react';

import Accounts from '../Components/Accounts';

const AccountsContext = createContext();

const initialState = {
  accounts: Accounts,
  currAcc: null,
  clicked: 0,
};

const reducer = function (state, action) {
  const now = new Date().toISOString();

  switch (action.type) {
    case 'login':
      return { ...state, currAcc: action.payload };
    case 'click':
      return { ...state, clicked: state.clicked + 1 };
    case 'transfer':
      const updatedAccounts = state.accounts.map(acc => {
        // Target Transfer
        if (acc.userName === action.payload.userName) {
          return {
            ...acc,
            movements: [...acc.movements, action.payload.amount],
            movementsDates: [...acc.movementsDates, now],
          };

          // Current account
        } else if (acc.userName === state.currAcc) {
          return {
            ...acc,
            movements: [...acc.movements, -action.payload.amount],
            movementsDates: [...acc.movementsDates, now],
          };
        }

        return acc;
      });

      return { ...state, accounts: updatedAccounts };
    case 'loan':
      return {
        ...state,
        accounts: state.accounts.map(acc =>
          acc.userName === state.currAcc
            ? {
                ...acc,
                movements: [...acc.movements, action.payload],
                movementsDates: [...acc.movementsDates, now],
              }
            : acc
        ),
      };
    case 'closeAccount':
      return {
        ...state,
        accounts: state.accounts.filter(acc => acc.userName !== state.currAcc),
        currAcc: null,
      };

    case 'timeout':
      return { ...state, currAcc: null };
    default:
      throw new Error('Unknown action');
  }
};

function AccountsProvider({ children }) {
  const [{ accounts, currAcc, clicked }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const currAccount = accounts.find(acc => acc.userName === currAcc);

  return (
    <AccountsContext.Provider
      value={{ accounts, clicked, currAcc, currAccount, dispatch }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

function useAccounts() {
  const value = useContext(AccountsContext);
  if (value === undefined)
    throw new Error('AccountsContext was used outside the AccountsProvider');
  return value;
}

export { AccountsProvider, useAccounts };
