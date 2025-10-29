import { Button as ChakraButton } from '@chakra-ui/react';
import type { RecipeVariantProps, ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import { buttonRecipe } from "@/theme/components/button"

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe> & ChakraButtonProps

export interface ButtonProps
    extends React.PropsWithChildren<ButtonVariantProps> {
    variant?: 'primary' | 'black' | 'ghost' | 'secondary' | 'greenOutline' | 'filter' | 'filterOutline';
    isLoading?: boolean;
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
    return (
        <ChakraButton
            variant={variant}
            {...props}
        />
    );
}





