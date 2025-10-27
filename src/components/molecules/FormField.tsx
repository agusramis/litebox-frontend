import { Field } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { FormLabelA } from '../atoms/FormLabelA';
import { HelperTextA } from '../atoms/HelperTextA';

export interface FormFieldProps {
    id: string;
    label?: string;
    helperText?: string;
    errorText?: string;
    required?: boolean;
    children: ReactNode;
}

export const FormField = ({ id, label, helperText, errorText, required, children }: FormFieldProps) => {
    const isInvalid = !!errorText;

    return (
        <Field.Root id={id} invalid={isInvalid} required={required}>
            {label && <FormLabelA required={required}>{label}</FormLabelA>}
            {children}
            <HelperTextA text={helperText} errorText={errorText} isInvalid={isInvalid} />
        </Field.Root>
    );
};
