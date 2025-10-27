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
            // If "All" is clicked, clear all selections or select only "All"
            if (selected.length === 0 || selected.includes('All')) {
                onChange([]);
            } else {
                onChange(['All']);
            }
        } else {
            // If a specific topic is clicked
            let newSelection: string[];

            // If "All" is selected, start fresh with just this topic
            if (selected.includes('All')) {
                newSelection = [topic];
            } else {
                // Toggle the specific topic
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
