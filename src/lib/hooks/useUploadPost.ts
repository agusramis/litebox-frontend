/**
 * Hook for uploading posts
 * TODO: Integrate with your backend (S3/Strapi)
 */

export interface UploadArgs {
    title: string;
    file: File;
    onProgress?: (percent: number) => void;
}

export const useUploadPost = () => {
    const upload = async ({ title, file, onProgress }: UploadArgs): Promise<void> => {
        // Simulate progress updates for demonstration
        if (onProgress) {
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                onProgress(i);
            }
        }

        // TODO: Replace with actual API call
        console.info('Mock upload complete', { title, fileName: file.name });
        // Example integration:
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('file', file);
        // 
        // await fetch('/api/posts/upload', {
        //     method: 'POST',
        //     body: formData,
        // });

        return Promise.resolve();
    };

    return { upload };
};
