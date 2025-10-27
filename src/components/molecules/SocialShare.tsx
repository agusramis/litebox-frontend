'use client';

import { useEffect, useMemo, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { LinkedInIcon } from '@/app/icons/LinkedInIcon';
import { FacebookIcon } from '@/app/icons/FacebookIcon';
import { XIcon } from '@/app/icons/XIcon';

interface SocialShareProps {
    title: string;
    path?: string;
}

export const SocialShare = ({ title, path }: SocialShareProps) => {
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        const origin = window.location.origin;
        const url = path ? `${origin}${path}` : window.location.href;
        setShareUrl(url);
    }, [path]);

    const encoded = useMemo(
        () => ({
            url: encodeURIComponent(shareUrl),
            title: encodeURIComponent(title),
        }),
        [shareUrl, title]
    );

    return (
        <HStack gap={6}>
            <Tooltip content="Share on LinkedIn" showArrow>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInIcon color="brand.black" size="lg" />
                </a>
            </Tooltip>

            <Tooltip content="Share on Facebook" showArrow>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FacebookIcon color="brand.black" size="lg" />
                </a>
            </Tooltip>
            <Tooltip content="Share on X (Twitter)" showArrow>
                <a
                    href={`https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <XIcon color="brand.black" size="lg" />
                </a>
            </Tooltip>
        </HStack>
    );
};
