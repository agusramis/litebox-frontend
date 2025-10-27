import { Tag } from '@chakra-ui/react';

export interface TagPillProps {
    label: string;
    isSelected?: boolean;
    onClick?: () => void;
    showClose?: boolean;
    onClose?: () => void;
}

interface TopicPillProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
    showClose?: boolean;
    onClose?: () => void;
}

export const TagPill = ({ label, isSelected = false, onClick, showClose = false, onClose }: TagPillProps) => {
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose?.();
    };

    return (
        <Tag.Root
            size="md"
            variant={isSelected ? 'solid' : 'outline'}
            onClick={onClick}
            cursor={onClick ? 'pointer' : 'default'}
        >
            <Tag.Label>{label}</Tag.Label>
            {showClose && (
                <Tag.EndElement>
                    <Tag.CloseTrigger onClick={handleClose} cursor="pointer" />
                </Tag.EndElement>
            )}
        </Tag.Root>
    );
};

// Keep backward compatibility
export const TopicPill = ({ label, active = false, onClick, showClose = false, onClose }: TopicPillProps) => (
    <TagPill label={label} isSelected={active} onClick={onClick} showClose={showClose} onClose={onClose} />
);
