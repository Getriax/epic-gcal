import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GoogleSignInButton } from './compontents/GoogleSignInButton.tsx';
import { useApi } from './api/useApi.ts';

function App() {
  const { auth, calendar } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let ignore = false;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !ignore) {
      auth
        .getToken({ code })
        .then((data) => {
          if (!data?.token) {
            return;
          }

          localStorage.setItem('auth', data.token);
          setIsLoggedIn(true);
        })
        .catch((error) => console.error('Error:', error));
    } else {
      const storedData = localStorage.getItem('auth');
      if (storedData) {
        setIsLoggedIn(true);
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    calendar.getNextEvents({}).then((events) => {
      console.log(events);
    });
  }, [isLoggedIn]);

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      {!isLoggedIn && <GoogleSignInButton />}
    </Flex>
  );
}

export default App;
