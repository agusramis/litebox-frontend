'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';


export const FooterSlot = () => {
    const pathname = usePathname();

    let bgColor = 'brand.black';

    if (pathname.startsWith('/post/')) {
        bgColor = 'brand.white';
    }

    if (pathname === '/') {
        bgColor = 'brand.black';
    }

    return <Footer bgColor={bgColor} />;
};