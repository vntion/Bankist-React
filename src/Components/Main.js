import { useAccounts } from '../Contexts/AccountsContext';
import Balance from './Balance';
import Close from './Close';
import DisplayMovements from './DisplayMovements';
import Loan from './Loan';
import LogoutTimer from './LogoutTimer';
import Transfers from './Transfers';

export default function Main() {
  const { currAccount } = useAccounts();

  return (
    <main className={'app'} style={currAccount && { opacity: 1 }}>
      {currAccount && (
        <>
          <Balance />
          <DisplayMovements />
          <Transfers />
          <Loan />
          <Close />
          <LogoutTimer />
        </>
      )}
    </main>
  );
}
