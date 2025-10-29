import { Flex } from '@chakra-ui/react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';

export const NewsletterCTA = () => {
    return (
        <Flex
            bg="brand.purple"
            color="brand.black"
            p={{ base: 10, md: 8 }}
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'hard',
            }}
            transition="all 0.3s ease"
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            flexWrap={{ base: "wrap", lg: 'no-wrap' }}
            gap={{ base: '28px' }}
        >
            <Text textStyle="bodyRegularLg" color="brand.white" flex="1">
                Sign up for our newsletter <Text textStyle={"bodySemiBoldLg"}>and get daily updates</Text>
            </Text>
            <Button variant="primary" w={{ base: "100%", md: '152px' }} h="56px" >
                Subscribe
            </Button>
        </Flex >
    );
}

