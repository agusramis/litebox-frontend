'use client';

import { Provider } from '@/components/ui/provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            {children}
        </Provider>
    );
};
