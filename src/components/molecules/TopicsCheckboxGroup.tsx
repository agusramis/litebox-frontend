import { Flex, Box } from '@chakra-ui/react';
import { TopicPill } from '../atoms/TopicPill';

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
            if (isAllSelected) return;
            onChange(['all']);
            return;
        }

        if (isAllSelected) {
            onChange([optionId]);
            return;
        }

        if (value.includes(optionId)) {
            onChange(value.filter((id) => id !== optionId));
            return;
        }

        onChange([...value, optionId]);
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
                        <TopicPill
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
