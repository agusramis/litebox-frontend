'use client';

import { Box, CheckboxGroup, HStack } from '@chakra-ui/react';
import { FilterButton } from '@/components/atoms/FilterButton';

export interface TopicsFilterProps {
    topics: string[];
    selected: string[];
    onChange: (values: string[]) => void;
}

export const TopicsFilter = ({ topics, selected, onChange }: TopicsFilterProps) => {
    const handleToggle = (topic: string) => {
        if (topic === 'All') {
            if (selected.length === 0 || selected.includes('All')) {
                onChange([]);
            } else {
                onChange(['All']);
            }
        } else {
            let newSelection: string[];

            if (selected.includes('All')) {
                newSelection = [topic];
            } else {
                if (selected.includes(topic)) {
                    newSelection = selected.filter((t) => t !== topic);
                } else {
                    newSelection = [...selected, topic];
                }
            }

            onChange(newSelection);
        }
    };

    const isAllSelected = selected.length === 0;
    const isChecked = (topic: string) => {
        if (topic === 'All') {
            return isAllSelected;
        }
        return selected.includes(topic);
    };

    return (
        <Box overflowX="auto">
            <CheckboxGroup value={isAllSelected ? ['All'] : selected}>
                <HStack gap={3} minW="fit-content">
                    {topics.map((topic) => (
                        <Box key={topic}>
                            <input
                                type="checkbox"
                                value={topic}
                                checked={isChecked(topic)}
                                onChange={() => handleToggle(topic)}
                                style={{ display: 'none' }}
                                readOnly
                            />
                            <FilterButton
                                label={topic}
                                isChecked={isChecked(topic)}
                                onToggle={() => handleToggle(topic)}
                            />
                        </Box>
                    ))}
                </HStack>
            </CheckboxGroup>
        </Box>
    );
};
