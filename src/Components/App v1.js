import { AccountsProvider } from '../Contexts/AccountsContext';

import WelcomeMsg from './WelcomeMsg';
import Logo from './Logo';
import NavForm from './NavForm';
import Main from './Main';

export default function App() {
  return (
    <AccountsProvider>
      <nav>
        <WelcomeMsg />
        <Logo />
        <NavForm />
      </nav>

      <Main />
    </AccountsProvider>
  );
}
