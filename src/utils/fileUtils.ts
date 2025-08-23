export interface FileValidationResult {
    isValid: boolean;
    error?: string;
}

export interface FileMetadata {
    name: string;
    size: number;
    type: string;
    url: string;
}

export interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
}

export const ALLOWED_FILE_TYPES = {
    'application/pdf': { ext: '.pdf', icon: '📄', name: 'PDF' },
    'text/plain': { ext: '.txt', icon: '📃', name: 'Text' },
    'application/rtf': { ext: '.rtf', icon: '📃', name: 'RTF' },
    'text/rtf': { ext: '.rtf', icon: '📃', name: 'RTF' },
    'application/msword': { ext: '.doc', icon: '📝', name: 'Word' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { 
        ext: '.docx', icon: '📝', name: 'Word' 
    },
    'application/vnd.ms-excel': { ext: '.xls', icon: '📊', name: 'Excel' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { 
        ext: '.xlsx', icon: '📊', name: 'Excel' 
    },
    'application/vnd.ms-powerpoint': { ext: '.ppt', icon: '📈', name: 'PowerPoint' },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': { 
        ext: '.pptx', icon: '📈', name: 'PowerPoint' 
    },
    'text/csv': { ext: '.csv', icon: '📊', name: 'CSV' },
    'application/json': { ext: '.json', icon: '📄', name: 'JSON' },
    'text/markdown': { ext: '.md', icon: '📝', name: 'Markdown' },
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;

export const validateFile = (file: File): FileValidationResult => {
    // Check file type
    if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
        const allowedTypes = Object.values(ALLOWED_FILE_TYPES).map(t => t.name).join(', ');
        return {
            isValid: false,
            error: `File type "${file.type}" is not supported. Allowed types: ${allowedTypes}`
        };
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return {
            isValid: false,
            error: `File "${file.name}" is too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`
        };
    }

    // Check for potentially dangerous files
    if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
        return {
            isValid: false,
            error: 'Invalid file name. File names cannot contain path separators.'
        };
    }

    return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (type: string): string => {
    const fileType = ALLOWED_FILE_TYPES[type as keyof typeof ALLOWED_FILE_TYPES];
    return fileType ? fileType.icon : '📎';
};

export const getFileTypeName = (type: string): string => {
    const fileType = ALLOWED_FILE_TYPES[type as keyof typeof ALLOWED_FILE_TYPES];
    return fileType ? fileType.name : 'Unknown';
};

export const generateUniqueFileName = (originalName: string, postTitle: string): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const sanitizedTitle = postTitle.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const extension = originalName.split('.').pop();
    
    return `${sanitizedTitle}_${timestamp}_${randomString}.${extension}`;
};

export const sanitizeFileName = (fileName: string): string => {
    // Remove or replace potentially problematic characters
    return fileName
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
};

export const isTextFile = (type: string): boolean => {
    return type.includes('text/') || type === 'application/json' || type === 'text/markdown';
};

export const isPDFFile = (type: string): boolean => {
    return type === 'application/pdf';
};

export const canPreviewInBrowser = (type: string): boolean => {
    return isTextFile(type) || isPDFFile(type);
};

// File processing utilities
export const processFileForUpload = (file: File, _postTitle: string): FileAttachment => {
    return {
        id: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
    };
};

export const createFileDownloadLink = (url: string, fileName: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Batch file validation
export const validateFiles = (files: File[], existingCount: number = 0): {
    validFiles: File[];
    errors: string[];
} => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Check total file limit
    if (existingCount + files.length > MAX_FILES) {
        errors.push(`Maximum ${MAX_FILES} files allowed. You can add ${MAX_FILES - existingCount} more files.`);
        return { validFiles, errors };
    }

    files.forEach(file => {
        const validation = validateFile(file);
        if (validation.isValid) {
            validFiles.push(file);
        } else {
            errors.push(validation.error!);
        }
    });

    return { validFiles, errors };
};

// File type statistics
export const getFileTypeStats = (files: FileMetadata[]): Record<string, number> => {
    const stats: Record<string, number> = {};
    
    files.forEach(file => {
        const typeName = getFileTypeName(file.type);
        stats[typeName] = (stats[typeName] || 0) + 1;
    });

    return stats;
};

export const getTotalFileSize = (files: FileMetadata[] | FileAttachment[]): number => {
    return files.reduce((total, file) => total + file.size, 0);
};