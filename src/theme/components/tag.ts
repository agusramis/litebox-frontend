import { defineRecipe } from '@chakra-ui/react';

export const tagRecipe = defineRecipe({
    base: {
        borderRadius: 'full',
        px: 4,
        py: 2,
        transition: 'all 0.2s ease',
        border: '1px solid',
    },
    variants: {
        variant: {
            solid: {
                bg: 'brand.green',
                color: 'brand.black',
                borderColor: 'brand.green',
                cursor: 'pointer',
                _hover: {
                    bg: 'brand.green',
                    transform: 'translateY(-2px)',
                },
            },
            outline: {
                bg: 'transparent',
                color: 'brand.white',
                borderColor: 'brand.gray.dark',
                cursor: 'pointer',
                _hover: {
                    bg: 'brand.gray.dark',
                    transform: 'translateY(-2px)',
                },
            },
        },
        size: {
            sm: { fontSize: 'sm' },
            md: { fontSize: 'md' },
            lg: { fontSize: 'lg' },
        },
    },
    defaultVariants: {
        variant: 'outline',
        size: 'md',
    },
});