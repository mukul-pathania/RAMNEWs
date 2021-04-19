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
    >
      <Heading fontSize="3xl">Sign Up </Heading>
      <FormControl id="name" isRequired="true">
        <FormLabel>Name</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="email" isRequired="true">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id="password" isRequired="true">
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>

      <Button
        type="submit"
        size="md"
        isRound="true"
        bg="#00C896"
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
