import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack, useDisclosure,
  ModalOverlay, ModalContent, Modal, ModalHeader, ModalCloseButton, Image,
  ModalBody } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ArticleSkeleton from './ArticleSkeleton';
import api from '../../adapters/api';
import ArticleCard from './ArticleCard';

const ArticleList = ({ title, endpoint }) => {
  const test = [1, 2, 3, 4, 5];
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [summary, setSummary] = useState({sentiment: "", summary: "", title: "", imageUrl: ""});

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

  const getSummary = async(articleUrl,imageUrl)=>{
    try{
      const resp = await api.post("summarize", {url: articleUrl});
      if(resp.data.error){
        setError(resp.data.message); return;
      }
      setSummary({summary: resp.data.summary, title: resp.data.title, sentiment: resp.data.sentiment, imageUrl});
      onOpen();

    }catch(e){
      setError('An error occured while processing your request');
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
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
          articles.map((article) => <ArticleCard key={article.title} article={article} getSummary={getSummary} />)}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay/>
        <ModalContent paddingY="35px" paddingX="20px">
          <ModalHeader>{summary.title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Image
              borderRadius="lg"
              marginTop="10px"
              marginBottom="25px"
              src={summary.imageUrl}
              />

            {summary.summary.split('\n').map(str=>(<p>{str}</p>))}
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  );
};

export default ArticleList;
