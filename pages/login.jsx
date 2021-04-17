import { FormControl, FormLabel, Input, Container, Button } from '@chakra-ui/react';
import { useReducer } from 'react';
import axios from 'axios';
import Api from '../adapters/api';

export default function Login() {
  const formState = { email: '', password: '' };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'email':
        return { ...state, email: action.value };
      case 'password':
        return { ...state, password: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, formState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting');
    console.log(state);
    try {
      await Api.post('login', state, { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <form id="loginForm" onSubmit={handleSubmit}>
        <FormControl id="email" mt="10">
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
          />
        </FormControl>
        <FormControl id="password" mt="10">
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'password', value: e.target.value })}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt="10">
          Submit
        </Button>
        <Button onClick={() => Api.get('/headlines/sports')}>Test</Button>
      </form>
    </Container>
  );
}
