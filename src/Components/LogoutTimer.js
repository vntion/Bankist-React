import { useState, useEffect } from 'react';
import '../index.css';
import { useAccounts } from '../Contexts/AccountsContext';

const TIMEOUT_SEC = 600; // 10 Minutes

export default function LogoutTimer() {
  const [time, setTime] = useState(TIMEOUT_SEC);

  const { dispatch, clicked, currAcc } = useAccounts();

  useEffect(() => {
    const handleTime = function () {
      setTime(time => {
        if (time === 0) {
          dispatch({ type: 'timeout' });
          return 0;
        }

        return time - 1;
      });
    };

    const times = setInterval(handleTime, 1000);

    return () => clearInterval(times);
  }, [dispatch]);

  useEffect(() => {
    setTime(TIMEOUT_SEC);
  }, [clicked, currAcc]);

  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  return (
    <p className="logout-timer">
      You will be logged out in <span className="timer">{`${min}:${sec}`}</span>
    </p>
  );
}
