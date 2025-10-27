import { Button as ChakraButton } from '@chakra-ui/react';
import type { RecipeVariantProps, ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import { buttonRecipe } from "@/theme/components/button"

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe> & ChakraButtonProps

export interface ButtonProps
    extends React.PropsWithChildren<Omit<ButtonVariantProps, 'size'>> {
    variant?: 'primary' | 'black' | 'ghost' | 'secondary' | 'greenOutline' | 'filter' | 'filterOutline';
    size?: 'lg' | 'sm';
    isLoading?: boolean;
}

export const Button = ({ variant = 'primary', size = 'lg', ...props }: ButtonProps) => {
    return (
        <ChakraButton
            variant={variant}
            size={size}
            {...props}
        />
    );
}





