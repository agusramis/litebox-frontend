import { Box, Heading, Text, Button } from '@chakra-ui/react';

export const NewsletterCTA = () => {
    return (
        <Box
            bg="brand.purple"
            color="brand.black"
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            border="2px solid"
            borderColor="brand.green"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'hard',
            }}
            transition="all 0.3s ease"
        >
            <Heading size={{ base: 'sm', md: 'md' }} mb={2}>
                Sign up for our newsletter
            </Heading>
            <Text fontSize={{ base: 'sm', md: 'md' }} mb={4} color="brand.black">
                Get our latest posts and updates straight to your inbox.
            </Text>
            <Button variant="primary" size={{ base: 'sm', md: 'md' }}>
                Subscribe
            </Button>
        </Box>
    );
}

