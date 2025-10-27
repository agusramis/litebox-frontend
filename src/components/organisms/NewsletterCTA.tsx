import { Flex } from '@chakra-ui/react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';

export const NewsletterCTA = () => {
    return (
        <Flex
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
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            flexWrap={{ base: "wrap", lg: 'no-wrap' }}
        >
            <Text fontSize={"27px"} fontWeight={400} mr="1" color="brand.white" flex="1">
                Sign up for our newsletter and get daily updates
            </Text>
            <Button variant="primary" >
                Subscribe
            </Button>
        </Flex>
    );
}

