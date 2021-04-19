import { Flex } from '@chakra-ui/react';
import LoginImage from '../components/LoginImage';
import Login from '../components/Login';

const LoginPage = () => (
  <Flex align="center" justify="center" minH="100vh" backgroundColor="lightcyan">
    <LoginImage />
    <Login />
  </Flex>
);

export default LoginPage;
