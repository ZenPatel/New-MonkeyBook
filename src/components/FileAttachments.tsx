import { useState } from 'react';

import { 
    formatFileSize, 
    getFileIcon, 
    getFileTypeName, 
    canPreviewInBrowser,
    createFileDownloadLink,
    getFileTypeStats,
    getTotalFileSize
} from '../utils/fileUtils';

interface FileMetadata {
    name: string;
    size: number;
    type: string;
    url: string;
}

interface Props {
    files: FileMetadata[];
}

export const FileAttachments = ({ files }: Props) => {
    const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
    const [previewContent, setPreviewContent] = useState<string>('');
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);

    if (!files || files.length === 0) return null;

    const fileTypeStats = getFileTypeStats(files);
    const totalSize = getTotalFileSize(files);

    const handleFileClick = async (file: FileMetadata) => {
        if (canPreviewInBrowser(file.type)) {
            // For text files, try to load and show preview
            if (file.type.includes('text/') || file.type === 'application/json') {
                await loadTextPreview(file);
            } else {
                // For PDFs, open in new tab
                window.open(file.url, '_blank');
            }
        } else {
            // Download the file
            createFileDownloadLink(file.url, file.name);
        }
    };

    const loadTextPreview = async (file: FileMetadata) => {
        if (expandedPreview === file.url) {
            setExpandedPreview(null);
            return;
        }

        setIsLoadingPreview(true);
        try {
            const response = await fetch(file.url);
            const text = await response.text();
            setPreviewContent(text);
            setExpandedPreview(file.url);
        } catch (error) {
            console.error('Failed to load file preview:', error);
            // Fallback to download
            createFileDownloadLink(file.url, file.name);
        } finally {
            setIsLoadingPreview(false);
        }
    };

    const closePreview = () => {
        setExpandedPreview(null);
        setPreviewContent('');
    };

    return (
        <div className="mt-6">
            {/* Header with statistics */}
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-300 flex items-center">
                    <span className="mr-2">📎</span>
                    File Attachments ({files.length})
                </h4>
                <div className="text-xs text-gray-500">
                    Total: {formatFileSize(totalSize)}
                </div>
            </div>

            {/* File type summary */}
            {Object.keys(fileTypeStats).length > 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {Object.entries(fileTypeStats).map(([type, count]) => (
                        <span 
                            key={type}
                            className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                        >
                            {type}: {count}
                        </span>
                    ))}
                </div>
            )}

            {/* Files list */}
            <div className="space-y-2">
                {files.map((file, index) => {
                    const canPreview = canPreviewInBrowser(file.type);
                    const isTextFile = file.type.includes('text/') || file.type === 'application/json';
                    const isExpanded = expandedPreview === file.url;

                    return (
                        <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                            <div 
                                onClick={() => handleFileClick(file)}
                                className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer group"
                            >
                                <span className="text-2xl">{getFileIcon(file.type)}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors truncate">
                                        {file.name}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                                        <span>{getFileTypeName(file.type)}</span>
                                        <span>•</span>
                                        <span>{formatFileSize(file.size)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500 group-hover:text-gray-400">
                                        {canPreview ? (isTextFile ? 'Click to preview' : 'Click to open') : 'Click to download'}
                                    </span>
                                    {canPreview ? (
                                        isTextFile ? (
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        )
                                    ) : (
                                        <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    )}
                                </div>
                            </div>

                            {/* Text file preview */}
                            {isExpanded && isTextFile && (
                                <div className="border-t border-white/10 bg-gray-900">
                                    <div className="flex items-center justify-between p-3 border-b border-white/10">
                                        <h5 className="text-sm font-medium text-white">File Preview</h5>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    createFileDownloadLink(file.url, file.name);
                                                }}
                                                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
                                            >
                                                Download
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closePreview();
                                                }}
                                                className="text-xs px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 max-h-64 overflow-y-auto">
                                        {isLoadingPreview ? (
                                            <div className="text-center py-4 text-gray-400">
                                                Loading preview...
                                            </div>
                                        ) : (
                                            <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words">
                                                {previewContent.length > 5000 
                                                    ? `${previewContent.substring(0, 5000)}...\n\n[File truncated - download to view full content]`
                                                    : previewContent
                                                }
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};