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

export default function SignUp() {
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
      <Heading fontSize="3xl" fontFamily="Rajdhani-Medium">
        Sign Up
      </Heading>
      <FormControl id="name" isRequired="true" _hover={{ color: '#00c896' }}>
        <FormLabel fontFamily="Rajdhani-SemiBold">Name</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="email" isRequired="true" _hover={{ color: '#00c896' }}>
        <FormLabel fontFamily="Rajdhani-SemiBold">Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id="password" isRequired="true" _hover={{ color: '#00c896' }}>
        <FormLabel fontFamily="Rajdhani-SemiBold">Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Spacer />
      <Button
        fontFamily="LibreFranklin-Medium"
        type="submit"
        size="md"
        isRound="true"
        bg="#00c896"
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'bottom-right',
          })
        }
      >
        Submit{' '}
      </Button>
    </VStack>
  );
}
