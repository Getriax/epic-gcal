import { Button, Flex } from '@chakra-ui/react';
import { useApi } from '../api/useApi.ts';

export const GoogleSignInButton = () => {
  const { auth } = useApi();
  const handleSignIn = async () => {
    try {
      const data = await auth.getRedirectUrl({});
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <Flex>
      <Button colorScheme="teal" onClick={handleSignIn}>
        Sign in with Google
      </Button>
    </Flex>
  );
};
