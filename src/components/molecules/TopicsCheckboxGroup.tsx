import { Flex, Box } from '@chakra-ui/react';
import { TagPill } from '../atoms/TopicPill';

export interface TopicOption {
    id: string;
    label: string;
}

export interface TopicsCheckboxGroupProps {
    options: TopicOption[];
    value: string[];
    onChange: (next: string[]) => void;
    showCloseOnSelected?: boolean;
}

export const TopicsCheckboxGroup = ({ options, value, onChange, showCloseOnSelected = false }: TopicsCheckboxGroupProps) => {
    const isAllSelected = value.includes('all');
    const allId = 'all';

    const handleTagClick = (optionId: string) => {
        if (optionId === 'all') {
            // If clicking "all" when it's selected, do nothing
            if (isAllSelected) return;
            // Otherwise, select all
            onChange(['all']);
        } else {
            // If clicking a specific topic when "all" is selected, select just that topic
            if (isAllSelected) {
                onChange([optionId]);
            } else {
                // Toggle the topic
                if (value.includes(optionId)) {
                    onChange(value.filter((id) => id !== optionId));
                } else {
                    onChange([...value, optionId]);
                }
            }
        }
    };

    const handleTagClose = (optionId: string) => {
        onChange(value.filter((id) => id !== optionId));
    };

    return (
        <Flex gap={2} flexWrap="wrap">
            {options.map((option) => {
                const isSelected = option.id === allId ? isAllSelected : value.includes(option.id);
                return (
                    <Box key={option.id}>
                        <TagPill
                            label={option.label}
                            isSelected={isSelected}
                            onClick={() => handleTagClick(option.id)}
                            showClose={showCloseOnSelected && isSelected && option.id !== allId}
                            onClose={() => handleTagClose(option.id)}
                        />
                    </Box>
                );
            })}
        </Flex>
    );
};

