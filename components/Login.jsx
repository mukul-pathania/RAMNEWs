import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Spacer,
  Button,
  Heading,
  Box,
  StackDivider,
  useToast,
} from '@chakra-ui/react';

export default function Login() {
  const toast = useToast();
  return (
    <VStack
      width="700px"
      height="500px"
      m="4"
      p="8"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      backgroundColor="white"
    >
      <Heading fontSize="3xl">Login </Heading>

      <FormControl id="email" isRequired="true" _hover={{ color: '#00c896' }}>
        <FormLabel fontFamily="Rajdhani-SemiBold">Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl id="password" isRequired="true" _hover={{ color: '#00c896' }}>
        <FormLabel fontFamily="Rajdhani-SemiBold">Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Spacer />
      <Button
        type="submit"
        bg="#00c896"
        size="md"
        fontFamily="LibreFranklin-Light"
        _hover={{ color: '#616161' }}
        onClick={() =>
          toast({
            title: 'Success',
            description: 'Please Wait while we setup the page for you',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'bottom-right',
          })
        }
      >
        Submit{' '}
      </Button>
      <Spacer />
      <FormLabel fontSize="small" fontFamily="LibreFranklin-ExtraLight">
        Don't have an account ?
      </FormLabel>
      <Button
        bg="#616161"
        fontFamily="LibreFranklin-Light"
        size="sm"
        _hover={{ color: '#00c896' }}
        onClick={() =>
          toast({
            title: 'Redirecting to Signup Page.',
            description: 'Please Wait...........',
            status: 'success',
            duration: 4000,
            isClosable: false,
            position: 'bottom-left',
          })
        }
      >
        SignUp
      </Button>
    </VStack>
  );
}
