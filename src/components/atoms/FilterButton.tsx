'use client';

import { Button, HStack, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export interface FilterButtonProps {
    label: string;
    isChecked: boolean;
    onToggle: () => void;
}

export const FilterButton = ({ label, isChecked, onToggle }: FilterButtonProps) => {
    return (
        <Button
            variant={isChecked ? "filter" : 'filterOutline'}
            onClick={onToggle}
            data-checked={isChecked}
        >
            <HStack gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                    {label}
                </Text>
                {isChecked && (
                    <CloseIcon
                        boxSize={3}
                        _hover={{ opacity: 0.7 }}
                        cursor="pointer"
                    />
                )}
            </HStack>
        </Button>
    );
}





