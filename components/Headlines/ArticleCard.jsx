import { Box, Button, Link, Text } from '@chakra-ui/react';
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
  <Box p={6} boxShadow="sm" bg="white" w="100%" borderRadius="lg">
    <Text>{article.title}</Text>
    <Text>{moment(article.publishedAt).fromNow()}</Text>
    <Link href={article.url} target="_blank">
      <Button>Read More</Button>
    </Link>
  </Box>
);

export default ArticleCard;
