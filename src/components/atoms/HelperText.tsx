import { Field } from '@chakra-ui/react';
import { Text } from './Text';

interface HelperTextProps {
    text?: string;
    errorText?: string;
    isInvalid?: boolean;
}

export const HelperText = ({ text, errorText, isInvalid }: HelperTextProps) => {
    if (isInvalid && errorText) {
        return (
            <Field.ErrorText color="semantic.error" fontSize="sm" mt={1}>
                {errorText}
            </Field.ErrorText>
        );
    }

    if (text) {
        return (
            <Text fontSize="sm" color="brand.gray.dark" mt={1}>
                {text}
            </Text>
        );
    }

    return null;
};
