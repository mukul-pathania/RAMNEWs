import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="2xl" fontFamily="Logo" cursor="pointer">
        RAMNEWS
      </Text>
      <Box w="70%" bg="#f2ecff" h="1" />
    </Box>
  );
}
