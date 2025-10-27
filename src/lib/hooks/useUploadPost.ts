export interface UploadArgs {
    title: string;
    file: File;
    onProgress?: (percent: number) => void;
}

export const useUploadPost = () => {
    const upload = async ({ title, file, onProgress }: UploadArgs): Promise<void> => {
        if (onProgress) {
            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                onProgress(i);
            }
        }

        console.info('Mock upload complete', { title, fileName: file.name });

        return Promise.resolve();
    };

    return { upload };
};
