import { Flex, Tab, Tabs, TabList, Heading, css, TabPanels, TabPanel } from '@chakra-ui/react';
import ArticleList from './ArticleList';
import Categories from './Categories';
import useAuth from '../../contexts/AuthContext';

const Headlines = () => {
  const { user } = useAuth();
  return (
    <Flex
      direction="column"
      px={{ sm: 2, md: 12 }}
      pt={24}
      minH="100vh"
      // bgGradient={{
      //   base: 'linear(to-b, #f2ecff, #ece5f9, #e5dff3, #dfd8ed, #d9d2e7)',
      //   md: 'linear(to-l, #f2ecff, #ece5f9, #e5dff3, #dfd8ed, #d9d2e7)',
      // }}
      bg="#eee"
    >
      <Heading fontFamily="LibreFranklin-Medium" fontSize="4xl" textAlign="center" p={4}>
        Hello {user.name}
      </Heading>
      <Tabs align="start" isFitted isLazy variant="unstyled" defaultIndex={0}>
        <TabList
          overflowX="auto"
          mx={{ base: 1, md: 'auto' }}
          px={2}
          width={{ base: '100%', md: '80%' }}
          css={css({
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': { display: 'none' },
          })}
        >
          {Categories.map((category) => (
            <Tab
              _active={{
                color: '#00c896',
                bg: 'white',
                opacity: 1,
                borderRadius: 'lg',
                boxShadow:
                  '0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-0.1rem) scale(1.02)',
              }}
              _selected={{
                color: '#00c896',
                bg: 'white',
                opacity: 1,
                borderRadius: 'lg',
                boxShadow:
                  '0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-0.1rem) scale(1.02)',
              }}
              _hover={{
                opacity: 1,
              }}
              opacity="0.6"
              key={category.title}
              fontSize="2xl"
              fontFamily="Rajdhani-SemiBold"
              my={1}
              mx={1}
              px={2}
            >
              {category.title}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {Categories.map((category) => (
            <TabPanel key={category.title}>
              <ArticleList title={category.title} endpoint={category.endpoint} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Headlines;
