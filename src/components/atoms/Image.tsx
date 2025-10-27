import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    sizes?: string;
    fill?: boolean;
    id?: string;
}

export const Image = ({
    src,
    alt,
    width,
    height,
    priority = false,
    sizes,
    fill = false,
    id,
}: ImageProps) => {
    const defaultSizes = sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    return (
        <NextImage
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            sizes={defaultSizes}
            priority={priority}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
            {...(id && { id })}
        />

    );
};
