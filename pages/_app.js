import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Layout from '../components/Layout';
import '../global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
