import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Image,
  Heading,
  useToast,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useReducer } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../contexts/AuthContext';

const formState = { email: '', password: '', showPassword: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.value };
    case 'password':
      return { ...state, password: action.value };
    case 'showPassword':
      return { ...state, showPassword: action.value };
    default:
      return state;
  }
};

const buttonStyle = {
  boxShadow:
    '0 12px 20px -10px rgba(0, 200, 150, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 200, 150, 0.2)',
  transform: 'translateY(-0.1rem) scale(1.02)',
};

export default function Login() {
  const [state, dispatch] = useReducer(reducer, formState);
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isLoggedIn = await login(state);
      if (isLoggedIn.error) {
        toast({
          title: 'Login Failed',
          description: isLoggedIn.message,
          status: 'error',
          duration: '5000',
          position: 'top',
          variant: 'subtle',
          isClosable: true,
        });
        return;
      }
      router.push('/headlines');
    } catch (e) {
      toast({
        title: 'Error Occured',
        description: 'An error occured while processing your request',
        status: 'error',
        duration: '5000',
        position: 'top',
        variant: 'subtle',
        isClosable: true,
      });
    }
  };
  return (
    <Flex bg="#00c896" minH="100vh" justify="center" align="center" pt={24}>
      <Flex
        w={{ base: '90%', md: '70%' }}
        bg="white"
        borderRadius="xl"
        shadow="lg"
        mb={12}
      >
        <Image
          bgGradient="linear(to-tr, #c6fced, #c5faff, #d1f5ff, #e3f0ff, #f2ecff)"
          //   bgGradient="linear(to-l,#f2ecff, #00bb9b, #00af9d, #00a19c, #009498)"
          src="/images/login.svg"
          maxW="50%"
          borderTopLeftRadius="xl"
          borderBottomLeftRadius="xl"
          display={{ base: 'none', md: 'block' }}
        />
        <Flex direction="column" justify="center" px={12} py={16} w="100%">
          <Heading
            fontFamily="Rajdhani-Bold"
            size="2xl"
            textAlign={{ base: 'center', md: 'left' }}
          >
            Login
          </Heading>
          <form id="loginForm" onSubmit={handleSubmit}>
            <FormControl id="email" mt="10">
              <FormLabel fontFamily="Rajdhani-SemiBold" fontSize="xl">
                Email:
              </FormLabel>
              <Input
                focusBorderColor="#009498"
                isRequired
                variant="flushed"
                fontFamily="Rajdhani-Medium"
                fontSize="lg"
                type="email"
                value={state.email}
                placeholder="Enter your email"
                onChange={(e) =>
                  dispatch({ type: 'email', value: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password" mt="10">
              <FormLabel fontFamily="Rajdhani-SemiBold" fontSize="xl">
                Password:
              </FormLabel>
              <Input
                focusBorderColor="#009498"
                isRequired
                fontSize="lg"
                variant="flushed"
                fontFamily="Rajdhani-Medium"
                placeholder="Enter password"
                type={state.showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={(e) =>
                  dispatch({ type: 'password', value: e.target.value })
                }
              />
            </FormControl>
            <Checkbox
              mt="10"
              size="lg"
              onChange={() =>
                dispatch({ type: 'showPassword', value: !state.showPassword })
              }
            >
              <Text fontFamily="Rajdhani-Medium" fontSize="md">
                Show Password
              </Text>
            </Checkbox>

            <Button
              isFullWidth
              rightIcon={<ArrowForwardIcon />}
              type="submit"
              borderRadius="8px"
              py="4"
              px="4"
              mt="8"
              bgGradient="linear(to-r,#00c896, #00bb9b, #00af9d, #00a19c, #009498)"
              color="#2f2e41"
              fontFamily="Rajdhani-SemiBold"
              fontSize="2xl"
              size="lg"
              _hover={buttonStyle}
              _focus={buttonStyle}
              _active={buttonStyle}
            >
              Login
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
