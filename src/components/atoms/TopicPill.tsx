import { Tag } from '@chakra-ui/react';

export interface TopicPillProps {
    label: string;
    isSelected?: boolean;
    onClick?: () => void;
    showClose?: boolean;
    onClose?: () => void;
}



export const TopicPill = ({ label, isSelected = false, onClick, showClose = false, onClose }: TopicPillProps) => {
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

