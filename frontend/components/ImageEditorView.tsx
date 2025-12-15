import React, { useState, useCallback } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { editImageWithGemini } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';

const ImageEditorView: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<{ url: string; file: File } | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalImage({ url: URL.createObjectURL(file), file });
            setEditedImage(null);
            setError(null);
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!originalImage || !prompt) {
            setError('Please upload an image and provide a prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setEditedImage(null);
        try {
            const base64Image = await fileToBase64(originalImage.file);
            const editedBase64 = await editImageWithGemini(prompt, base64Image, originalImage.file.type);
            setEditedImage(`data:image/png;base64,${editedBase64}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, prompt]);

    const ImagePlaceholder: React.FC<{ text: string }> = ({ text }) => (
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:bg-gray-700/50 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );

    return (
        <Card title="AI Image Editor powered by Gemini 2.5 Flash Image">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Panel: Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">1. Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-bc-green/10 file:text-bc-green hover:file:bg-bc-green/20 dark:text-gray-400 dark:file:bg-bc-green/20 dark:hover:file:bg-bc-green/30"
                        />
                    </div>
                    {originalImage && (
                        <div className="w-full h-64">
                            <img src={originalImage.url} alt="Original" className="w-full h-full object-contain rounded-lg" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">2. Describe your edit</label>
                        <textarea
                            id="prompt"
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder='e.g., "Add a retro filter" or "Remove the person in the background"'
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-bc-green focus:border-bc-green dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>
                    <Button onClick={handleSubmit} disabled={isLoading || !originalImage || !prompt}>
                        {isLoading ? 'Generating...' : 'Generate Image'}
                    </Button>
                    {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                </div>

                {/* Right Panel: Output */}
                <div className="flex flex-col space-y-4">
                    <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">Edited Image</p>
                    <div className="flex-grow w-full h-96 relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center rounded-lg z-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bc-green"></div>
                            </div>
                        )}
                        {!editedImage && !isLoading && <ImagePlaceholder text="Your edited image will appear here" />}
                        {editedImage && (
                            <img src={editedImage} alt="Edited" className="w-full h-full object-contain rounded-lg" />
                        )}
                    </div>
                     {editedImage && !isLoading && (
                        <a
                            href={editedImage}
                            download="edited-image.png"
                            className="w-full text-center px-4 py-2 rounded-lg font-semibold bg-bc-blue text-white hover:bg-sky-800 transition-colors duration-200"
                        >
                            Download Image
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ImageEditorView;