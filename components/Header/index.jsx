import React from 'react';
import { Link, Box, Flex, Text, Button, Stack } from '@chakra-ui/react';
import Logo from './Logo';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer boxShadow="lg" {...props}>
      <Logo w="8rem" color="black" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="black">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    {isOpen ? <CloseIcon /> : <MenuIcon />}
  </Box>
);

const MenuItem = ({ children, isLast, to = '/', ...rest }) => (
  <Link href={to}>
    <Text display="block" fontFamily="Rajdhani-SemiBold" fontSize="xl" {...rest}>
      {children}
    </Text>
  </Link>
);

const MenuLinks = ({ isOpen }) => (
  <Box
    display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
    flexBasis={{ base: '100%', md: 'auto' }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/">Headlines</MenuItem>
      <MenuItem to="/">Your Stories</MenuItem>
      <MenuItem to="/" isLast>
        <Button
          size="sm"
          variant="ghost"
          rounded="md"
          fontFamily="Rajdhani-SemiBold"
          fontSize="xl"
          bg="#00c896"
          color="#2f2e41"
          _hover={{
            boxShadow:
              '0 12px 20px -10px rgba(0, 200, 150, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 200, 150, 0.2)',
            transform: 'translateY(-0.1rem)',
          }}
        >
          Create Account
        </Button>
      </MenuItem>
    </Stack>
  </Box>
);

const NavBarContainer = ({ children, ...props }) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    position="fixed"
    wrap="wrap"
    w="100%"
    mb={8}
    px={12}
    py={5}
    zIndex="dropdown"
    bg="white"
    color="black"
    {...props}
  >
    {children}
  </Flex>
);

export default NavBar;
