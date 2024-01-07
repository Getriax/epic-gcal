import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GoogleSignInButton } from './compontents/GoogleSignInButton.tsx';
import { useApi } from './api/useApi.ts';
import { EventsTable } from './compontents/EventsTable.tsx';
import { EventItem } from './api/calendar.ts';

function App() {
  const { auth, calendar } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);

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
        })
        .catch((error) => console.error('Error:', error));
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

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      {!isLoggedIn && <GoogleSignInButton />}
      {isLoggedIn && events && events.length > 0 && (
        <EventsTable events={events} />
      )}
    </Flex>
  );
}

export default App;
