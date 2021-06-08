import { Flex } from '@chakra-ui/react';
import { GridLoader } from 'react-spinners';

const PageLoadingSkeleton = () => (
  <Flex minW="100vw" minH="100vh" align="center" justify="center">
    {/* <CircularProgress isIndeterminate size="50vh" thickness={4} color="#00c896" /> */}
    <GridLoader loading size={60} margin={5} color="#00c896" />
  </Flex>
);

export default PageLoadingSkeleton;
