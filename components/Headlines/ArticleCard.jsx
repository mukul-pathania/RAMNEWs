import { Box, Button, Link, Text, Image } from '@chakra-ui/react';
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

const ArticleCard = ({ article }) => (
  <Box
    d="flex"
    p={6}
    boxShadow="sm"
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
      <Link href={article.url} target="_blank">
        <Button bg="#00C896">Read More</Button>
      </Link>
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
