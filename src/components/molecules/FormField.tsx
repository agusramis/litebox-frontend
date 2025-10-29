import { Field, type FieldRootProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { FormLabel } from '../atoms/FormLabel';
import { HelperText } from '../atoms/HelperText';

export interface FormFieldProps extends FieldRootProps {
    id: string;
    label?: string;
    helperText?: string;
    errorText?: string;
    required?: boolean;
    children: ReactNode;
}

export const FormField = ({ id, label, helperText, errorText, required, children, ...props }: FormFieldProps) => {
    const isInvalid = !!errorText;

    return (
        <Field.Root id={id} invalid={isInvalid} required={required} {...props}>
            {label && <FormLabel required={required}>{label}</FormLabel>}
            {children}
            <HelperText text={helperText} errorText={errorText} isInvalid={isInvalid} />
        </Field.Root>
    );
};
