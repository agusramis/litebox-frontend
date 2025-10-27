import type { Metadata } from 'next';
import { Navbar } from '@/components/organisms/Navbar';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/organisms/Footer';

export const metadata: Metadata = {
    title: 'LiteBox - Tech Blog',
    description: 'Discover the latest in technology and innovation',
    icons: {
        icon: [
            { url: '/Logito.svg', type: 'image/svg+xml' },
            { url: '/Logito.ico', type: 'image/x-icon' },
        ],
        apple: [
            { url: '/Logito.svg', type: 'image/svg+xml' },
        ],
    },
    openGraph: {
        title: 'LiteBox - Tech Blog',
        description: 'Discover the latest in technology and innovation',
        type: 'website',
        locale: 'en_US',
        siteName: 'LiteBox',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LiteBox - Tech Blog',
        description: 'Discover the latest in technology and innovation',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>
                    <Navbar />
                    {children}
                    <Footer />
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
