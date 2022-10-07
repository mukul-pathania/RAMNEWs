import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Hero({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}) {
  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-between', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="no-wrap"
      bgGradient={{
        base: 'linear(to-b, #f2ecff, #ece5f9, #e5dff3, #dfd8ed, #d9d2e7)',
        md: 'linear(to-l, #f2ecff, #ece5f9, #e5dff3, #dfd8ed, #d9d2e7)',
      }}
      minH="100vh"
      px={{ sm: 4, md: 12 }}
      pt={24}
      pb={14}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: '80%', md: '40%' }}
        align={['center', 'center', 'flex-start', 'flex-start']}
      >
        <Heading
          as="h1"
          size="2xl"
          //   fontWeight="bold"
          color="black"
          fontFamily="Rajdhani-Medium"
          textAlign={['center', 'center', 'left', 'left']}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="black"
          opacity="0.8"
          //   fontWeight="normal"
          fontFamily="LibreFranklin-Regular"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}
        >
          {subtitle}
        </Heading>
        <Link as={NextLink} href={ctaLink} _hover={{ textDecoration: 'none' }}>
          <Button
            rightIcon={<ArrowForwardIcon />}
            borderRadius="8px"
            py="4"
            px="4"
            mt="4"
            bg="#00c896"
            color="#2f2e41"
            lineHeight="1"
            fontFamily="LibreFranklin-Regular"
            fontSize="xl"
            size="lg"
            _hover={{
              boxShadow:
                '0 12px 20px -10px rgba(0, 200, 150, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 200, 150, 0.2)',
              transform: 'translateY(-0.1rem) scale(1.02)',
            }}
          >
            {ctaText}
          </Button>
        </Link>
        {/* <Text fontSize="xs" mt={2} textAlign="center" color="primary.800" opacity="0.6">
          No credit card required.
        </Text> */}
      </Stack>
      <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
        <Image src={image} size="100%" rounded="1rem" />
      </Box>
    </Flex>
  );
}
