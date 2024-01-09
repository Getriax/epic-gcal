import { useEffect, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { GoogleSignInButton } from './compontents/GoogleSignInButton.tsx';
import { useApi } from './api/useApi.ts';
import { EventsTable } from './compontents/EventsTable.tsx';
import { EventItem } from './api/calendar.ts';

function App() {
  const { auth, calendar } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const auth = localStorage.getItem('auth');
      setIsLoggedIn(auth != null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      setIsLoggedIn(true);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      auth
        .getToken({ code })
        .then((data) => {
          if (!data?.token) {
            return;
          }

          localStorage.setItem('auth', data.token);
          setIsLoggedIn(true);
          window.location.href = window.location.href.split('?')[0];
        })
        .catch((error) => console.error('Error fetching token:', error));
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    calendar.getNextEvents({}).then((data) => {
      data?.events && setEvents(data.events);
    });
  }, [isLoggedIn]);

  const handleLogout = () => {
    auth
      .disconnectUser({})
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('auth');
      })
      .catch((error) =>
        console.error('Error while disconnecting user:', error)
      );
  };

  return (
    <>
      <Flex direction="column" align="right">
        {/* ... other components */}
        {isLoggedIn && (
          <Button
            onClick={handleLogout}
            alignSelf="flex-end"
            m={4}
            colorScheme="red"
          >
            Disconnect
          </Button>
        )}
      </Flex>
      <Flex width="100vw" height="100vh" align="center" justify="center">
        {!isLoggedIn && <GoogleSignInButton />}
        {isLoggedIn && events && events.length > 0 && (
          <EventsTable events={events} />
        )}
      </Flex>
    </>
  );
}

export default App;
