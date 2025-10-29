import { Field } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface FormLabelProps {
    children: ReactNode;
    required?: boolean;
}

export const FormLabel = ({ children, required }: FormLabelProps) => (
    <Field.Label fontSize="sm" fontWeight="500" color="brand.black" mb={2}>
        {children}
        {required && (
            <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
        )}
    </Field.Label>
);
