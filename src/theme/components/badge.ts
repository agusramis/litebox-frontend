import { defineRecipe } from '@chakra-ui/react';

export const badgeRecipe = defineRecipe({
    base: {
        borderRadius: '56px',
        fontWeight: 'bold',
        paddingBlock: "0px",
        paddingInline: "0px"
    },
    variants: {
        variant: {
            solid: {
                bg: 'brand.green',
                color: 'brand.black',
            },
            outline: {
                color: 'brand.gray.light',
                bg: 'transparent',
            },
        },
    },
    defaultVariants: {
        variant: 'solid',
    },
});
