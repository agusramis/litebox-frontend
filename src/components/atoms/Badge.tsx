import { Badge as ChakraBadge, type BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';
import type { RecipeVariantProps } from "@chakra-ui/react";
import { badgeRecipe } from "@/theme/components/badge";
import type { PropsWithChildren } from 'react';

type BadgeVariantProps = RecipeVariantProps<typeof badgeRecipe> & ChakraBadgeProps;

export type BadgeProps = PropsWithChildren<BadgeVariantProps>;

export const Badge = ({ ...props }: BadgeProps) => (
    <ChakraBadge
        {...props}
    />
);
