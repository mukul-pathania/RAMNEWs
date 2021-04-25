import { Box, SkeletonText } from '@chakra-ui/react';

const ArticleSkeleton = () => (
  <Box p={6} boxShadow="sm" bg="white" w="100%" borderRadius="lg">
    <SkeletonText mt="4" noOfLines={6} spacing="4" />
  </Box>
);

export default ArticleSkeleton;
