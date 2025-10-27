import { defineRecipe } from '@chakra-ui/react';

export const dialogRecipe = defineRecipe({
    slots: ['backdrop', 'content', 'header', 'title', 'description', 'closeTrigger', 'body', 'footer'],
    base: {
        backdrop: {
            bg: 'rgba(0, 0, 0, 0.4)',
        },
        content: {
            bg: 'white',
            borderRadius: 'md',
            maxW: 'md',
        },
    },
    variants: {
        variant: {
            newPost: {
                _backdrop: {
                    bg: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(8px)',
                },
                content: {
                    borderWidth: '4px',
                    borderStyle: 'solid',
                    borderColor: 'brand.black',
                    borderRadius: 'md',
                    bg: 'brand.green',
                },
                maxW: { base: '90%', sm: 'md' },
                header: {
                    px: { base: 6, md: 6 },
                    pt: { base: 6, md: 6 },
                    pb: 0,
                },
                title: {
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    lineHeight: 'short',
                    color: 'brand.black',
                },
                description: {
                    fontSize: 'sm',
                    color: 'brand.gray.dark',
                    mt: 2,
                },
                closeTrigger: {
                    position: 'absolute',
                    top: { base: 6, md: 6 },
                    right: { base: 6, md: 6 },
                    color: 'brand.black',
                    _hover: {
                        bg: 'brand.black',
                        color: 'brand.white',
                    },
                },
                body: {
                    px: { base: 6, md: 6 },
                    py: { base: 6, md: 6 },
                },
                footer: {
                    px: { base: 6, md: 6 },
                    pb: { base: 6, md: 6 },
                    pt: 0,
                },
            },
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
