import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
    base: {
        fontWeight: '500',
        borderRadius: 0,
        w: "113px",
        h: "auto",
        padding: "16px 32px",
        paddingInline: "0px",
        fontSize: "18px",
        _disabled: {
            bg: 'brand.gray.light',
            color: 'brand.gray.dark',
            cursor: 'not-allowed',
        },
    },
    variants: {
        variant: {
            primary: {
                bg: 'brand.green',
                color: 'brand.black',
                _hover: {
                    bg: 'brand.black',
                    color: 'brand.white'
                },
                _focus: {
                    boxShadow: '0 0 0 2px {brand.black}'
                },
                _active: {
                    bg: 'brand.purple',
                    color: 'brand.white'
                },

            },
            secondary: {
                bg: 'transparent',
                outline: '2px solid',
                borderColor: 'brand.green',
                color: 'brand.black',
                lineHeight: "135%",
                letterSpacing: "0px",
                fontSize: "18px",
                borderWidth: 0,
                _hover: {
                    bg: 'brand.green'
                },
                _active: {
                    bg: 'brand.green',
                    color: 'brand.black'
                },
            },
            black: {
                bg: 'brand.black',
                color: 'brand.white',
                _hover: {
                    bg: 'brand.green',
                    color: 'brand.black'
                },
                _focus: {
                    boxShadow: '0 0 0 2px {brand.black}'
                },
            },
            greenOutline: {
                bg: 'transparent',
                color: 'brand.black',
                border: '2px solid',
                borderColor: 'brand.green',
                _hover: {
                    bg: 'brand.black',
                    color: 'brand.white'
                },
                _active: {
                    bg: 'brand.black'
                },
            },
            filter: {
                borderRadius: 'full',
                fontWeight: 'medium',
                px: 4,
                py: 2,
                border: '1px solid',
                borderColor: 'brand.green',
                bg: 'brand.green',
                color: 'brand.black',
                _checkedHover: {
                    bg: 'brand.green',
                },
                w: "auto"
            },
            filterOutline: {
                borderRadius: 'full',
                fontWeight: 'medium',
                px: 4,
                py: 2,
                border: '1px solid',
                borderColor: 'brand.gray.light',
                bg: 'transparent',
                color: 'brand.gray.light',
                w: "auto"
            },
        }
    },
    defaultVariants: {
        variant: 'primary',
    },
});

