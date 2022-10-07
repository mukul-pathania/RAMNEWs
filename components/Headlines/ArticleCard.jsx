import { Box, Button, Link, Image, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import moment from 'moment';

/**
*
* @Rohit please work on this component, this component will receive an article in the props
* you will have to do the tough work of making it look good. Please try to make it like google news.
* All the required data is provided in the article, please check what data is present in the article
* and display it accordingly and also be beware that you may have to format some of the data given and
* also sometimes some data we are relying upon is not present in the article.
*
*
* Use moment to render the timestamp.
*/

const ArticleCard = ({ article, getSummary }) => (
  <Box
    d="flex"
    p={6}
    boxShadow="lg"
    bg="white"
    w="100%"
    borderRadius="lg"
    flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
    justifyContent="space-around"
  >
    <Box
      p="4"
      d="flex"
      //   border="1px solid black"
      w={{ base: '100%', md: '90%', lg: '90%' }}
      flexDirection="column"
    >
      <h1
        style={{
          fontFamily: 'Rajdhani-SemiBold',
          fontSize: '1.8rem',
          textTransform: 'uppercase',
        }}
      >
        {article.title}
      </h1>
      <p style={{ fontFamily: 'Rajdhani-SemiBold', fontSize: '1.3rem' }}>
        {moment(article.publishedAt).fromNow()}
      </p>
      <p style={{ fontFamily: 'Rajdhani-SemiBold', fontSize: '1.3rem' }}>
        Source : {article.source.name}
      </p>
      <ul>
        <li>
          <p style={{ fontFamily: 'Rajdhani-Medium', fontSize: '1.5rem' }}>{article.description}</p>
        </li>
      </ul>
      <HStack spacing="24px">
        <Link
          as={NextLink}
          href={article.url}
          target="_blank"
          style={{ maxWidth: '10rem', marginTop: '2rem' }}
        >
          <Button bg="#00C896" width="full">Read More</Button>
        </Link>
        <Button bg="#000" color="#fff" width="full" _hover={{bg: "#ccc", color: "#000"}} onClick={()=>getSummary(article.url, article.urlToImage)}>View Summary</Button>
      </HStack>
    </Box>
    <Image
      width={{ base: '50%', md: '50%', lg: '35%' }}
      height={{ base: '100%', md: '100%', lg: '100%' }}
      borderRadius="lg"
      src={article.urlToImage}
      />
  </Box>
);

export default ArticleCard;
