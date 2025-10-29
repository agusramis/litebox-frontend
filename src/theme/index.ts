import { createSystem, defaultConfig } from '@chakra-ui/react';
import { badgeRecipe, buttonRecipe, tagRecipe } from './components';

export const system = createSystem(defaultConfig, {
    theme: {
        recipes: {
            button: buttonRecipe,
            tag: tagRecipe,
            badge: badgeRecipe,
        },
        tokens: {
            colors: {
                green: { value: '#D8F34E' },
                purple: { value: '#9C73F7' },
                primary: { value: '#0d6efd' },
                black: { value: '#000000' },
                white: { value: '#FFFFFF' },
                gray: {
                    100: { value: '#F7FAFC' },
                    dark: { value: '#4A4A4A' },
                    light: { value: '#C4C4C4' },
                    600: { value: '#4A5568' },
                    800: { value: '#1A202C' },
                },
                red: {
                    500: { value: '#E53E3E' },
                },
            },
            fonts: {
                heading: { value: '"Space Grotesk", system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
                body: { value: '"Space Grotesk", system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
            },
            shadows: {
                hard: { value: '0px 2px 0px rgba(0,0,0,0.15)' },
            },
        },
        semanticTokens: {
            colors: {
                'brand.primary': { value: '{colors.primary}' },
                'brand.green': { value: '{colors.green}' },
                'brand.purple': { value: '{colors.purple}' },
                'brand.black': { value: '{colors.black}' },
                'brand.white': { value: '{colors.white}' },
                'brand.gray.dark': { value: '{colors.gray.dark}' },
                'brand.gray.light': { value: '{colors.gray.light}' },
                'brand.gray.100': { value: '{colors.gray.100}' },
                'semantic.error': { value: '{colors.red.500}' },
            },
        },
        textStyles: {
            headingBoldXl: {
                description: 'Heading Bold 41px / 130%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '700',
                    fontSize: '41px',
                    lineHeight: '130%',
                    letterSpacing: '0px',
                },
            },
            headingBoldLg: {
                description: 'Heading Bold 21px / 150%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '700',
                    fontSize: '21px',
                    lineHeight: '150%',
                    letterSpacing: '0px',
                },
            },
            bodyRegularLg: {
                description: 'Body Regular 27px / 121%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '400',
                    fontSize: '27px',
                    lineHeight: '121%',
                    letterSpacing: '0px',
                },
            },
            bodySemiBoldLg: {
                description: 'Body SemiBold 27px / 121%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '600',
                    fontSize: '27px',
                    lineHeight: '121%',
                    letterSpacing: '0px',
                },
            },
            bodySemiBold: {
                description: 'Body SemiBold 18px / 100%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '600',
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0px',
                },
            },
            bodyMedium: {
                description: 'Body Medium 16px / 180%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '180%',
                    letterSpacing: '0px',
                },
            },
            postTitle: {
                description: 'Body Bold 35px / 120%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '700',
                    fontSize: '35px',
                    lineHeight: '120%',
                    letterSpacing: '0px',
                },
            },
            postTitleSm: {
                description: 'Body Bold 25px / 120%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '700',
                    fontSize: '25px',
                    lineHeight: '120%',
                    letterSpacing: '0px',
                },
            },
            bodyBold: {
                description: 'Body Bold 18px / 150%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '150%',
                    letterSpacing: '0px',
                },
            },
            bodyRegular: {
                description: 'Body Regular 18px / 180%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '180%',
                },
            },
            headingMedium: {
                description: 'Heading Medium 35px / 120%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '500',
                    fontSize: '35px',
                    lineHeight: '120%',
                },
            },
            bodyRegularSm: {
                description: 'Body Regular 16px / 180%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '180%',
                },
            },
            bodySemiBoldMd: {
                description: 'Body SemiBold 16px / 100%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '150%',
                },
            },
            bodySemiBoldSm: {
                description: 'Body SemiBold 16px / 100%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '100%',
                },
            },
            bodyRegularBase: {
                description: 'Body Regular 14px / 160%',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '160%',
                    letterSpacing: '0px',
                },
            },
            buttonMedium: {
                description: 'Button Medium 18px / 135%, centered',
                value: {
                    fontFamily: 'Space Grotesk',
                    fontWeight: '500',
                    fontSize: '18px',
                    lineHeight: '135%',
                    letterSpacing: '0px',
                    textAlign: 'center',
                },
            },
        }
    },
});
