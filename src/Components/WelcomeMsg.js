import { useAccounts } from '../Contexts/AccountsContext';

export default function WelcomeMsg() {
  const { currAccount } = useAccounts();

  return (
    <p className="welcome">
      {currAccount
        ? `Welcome back, ${currAccount.owner.split(' ')[0]}`
        : 'Log in to get started'}
    </p>
  );
}
