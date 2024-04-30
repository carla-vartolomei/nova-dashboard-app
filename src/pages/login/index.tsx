import { useLogin } from '@refinedev/core';
import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CredentialResponse } from '../../interfaces/google';

import nova from '../../assets/nova.png';

const GOOGLE_CLIENT_ID =
  '501443261664-ipuvtrqi96duagc9n8p2b89tgl43ubpi.apps.googleusercontent.com';

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={divRef}
      />
    );
  };

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <Box component="div">
          <img
            src={nova}
            alt="Nova Logo"
            style={{ width: '350px', height: '100px' }}
          />
        </Box>

        <GoogleButton />
      </Box>
    </Container>
  );
};
