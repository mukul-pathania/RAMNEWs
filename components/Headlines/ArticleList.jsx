import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ArticleSkeleton from './ArticleSkeleton';
import api from '../../adapters/api';
import ArticleCard from './ArticleCard';

const ArticleList = ({ title, endpoint }) => {
  const test = [1, 2, 3, 4, 5];
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  const getArticles = async () => {
    try {
      const resp = await api.get(endpoint);
      if (resp.data.error) {
        setError(resp.data.message);
        return;
      }
      setArticles(resp.data.articles);
    } catch (e) {
      setError('An error occured while processing your request');
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <VStack w={{ base: '100%', md: '80%' }} mx="auto" spacing={4}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Could not process your request</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseIcon position="absolute" right="8px" top="8px" onClick={() => setError('')} />
        </Alert>
      )}
      {!articles.length && test.map((item) => <ArticleSkeleton key={item} />)}
      {articles.length &&
        articles.map((article) => <ArticleCard key={article.title} article={article} />)}
    </VStack>
  );
};

export default ArticleList;
