import { Flex } from '@chakra-ui/react';
import SignUpImage from '../components/SignUpImage';
import SignUp from '../components/SignUp';

const SignupPage = () => (
  <Flex align="center" justify="center" minH="100vh" backgroundColor="lightcyan">
    <SignUpImage />
    <SignUp />
  </Flex>
);

export default SignupPage;
