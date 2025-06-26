import { useState } from 'react';
import { useAccounts } from '../Contexts/AccountsContext';

export default function NavForm() {
  const [user, setUser] = useState('');
  const [pin, setPin] = useState('');

  const { accounts, dispatch } = useAccounts();

  const handleUser = function (e) {
    setUser(e.target.value.trim());
  };

  const handlePin = function (e) {
    setPin(e.target.value.trim());
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const curAcc = accounts.find(
      acc => acc.userName === user.toLowerCase() && acc.pin === Number(pin)
    );

    if (!curAcc) return;

    dispatch({ type: 'login', payload: user });
    setUser('');
    setPin('');
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="user"
        className="login__input login__input--user"
        value={user}
        onChange={handleUser}
      />
      <input
        type="password"
        placeholder="PIN"
        maxLength="4"
        className="login__input login__input--pin"
        value={pin}
        onChange={handlePin}
      />
      <button className="login__btn">&rarr;</button>
    </form>
  );
}
