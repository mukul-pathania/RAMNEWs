import { VStack } from '@chakra-ui/react';
import ArticleSkeleton from './ArticleSkeleton';

const ArticleList = ({ title }) => {
  const test = [1, 2, 3, 4, 5];
  return (
    <VStack w={{ base: '100%', md: '80%' }} mx="auto" spacing={4}>
      {test.map((item) => (
        <ArticleSkeleton key={item} title={title} />
      ))}
    </VStack>
  );
};

export default ArticleList;
