import type { Metadata } from 'next';
import { Navbar } from '@/components/organisms/Navbar';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { Space_Grotesk } from "next/font/google";
import { FooterSlot } from '@/components/organisms/FooterCondicional';

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

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
        <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
            <body>
                <Providers>
                    <Navbar />
                    {children}
                    <FooterSlot />
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
