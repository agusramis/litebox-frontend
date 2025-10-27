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
    },
});
