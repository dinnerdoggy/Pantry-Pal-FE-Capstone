import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '100vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <Image src="/images/Pantry_Pal_Logo.png" alt="Pantry Pal Logo" className="frontLogo" width={550} height={400} />
      <br />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
