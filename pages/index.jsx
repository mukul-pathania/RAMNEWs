import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Heading>Home Page</Heading>
    </div>
  );
}
