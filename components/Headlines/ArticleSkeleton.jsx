import { Box, SkeletonText, Text } from '@chakra-ui/react';

const ArticleSkeleton = ({ title }) => (
  <Box p={6} boxShadow="sm" bg="white" w="100%" borderRadius="lg">
    <Text fontSize="lg" fontFamily="LibreFranklin-Regular">
      {title} <br />
      Still in Development
    </Text>
    <SkeletonText mt="4" noOfLines={6} spacing="4" />
  </Box>
);

export default ArticleSkeleton;
