import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import '../global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CSSReset />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
