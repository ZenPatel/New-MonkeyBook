import { useState, type ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { fetchCommunities, type Community } from "./CommunityList";
import { RichTextEditor } from "./RichTextEditor";
import { QuizCreator } from "./QuizCreator";
import { PollCreator } from "./PollCreator";
import type { QuizData, PollData } from "../types/index";
import { X, Play } from 'lucide-react';

interface PostInput {
    title: string;
    content: string;
    avatar_url: string;
    community_id?: number | null;
    post_type: 'regular' | 'quiz' | 'poll';
    quiz_data?: QuizData | null;
    poll_data?: PollData | null;
}

interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
}

interface MediaItem {
    id: string;
    name: string;
    size: number;
    type: 'image' | 'video';
    file: File;
    preview: string;
}

const ALLOWED_FILE_TYPES = {
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'application/rtf': '.rtf',
    'text/rtf': '.rtf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'audio/ogg': '.ogg',
};

const ALLOWED_MEDIA_TYPES = {
    // Images
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg', 
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    // Videos
    'video/mp4': '.mp4',
    'video/webm': '.webm',
    'video/ogg': '.ogg',
    'video/avi': '.avi',
    'video/mov': '.mov',
    'video/wmv': '.wmv',
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for files
const MAX_MEDIA_SIZE = 50 * 1024 * 1024; // 50MB for videos
const MAX_FILES = 5;
const MAX_MEDIA = 10;

const uploadFiles = async (files: FileAttachment[], postTitle: string): Promise<string[]> => {
    const uploadPromises = files.map(async (attachment) => {
        const filePath = `${postTitle}-${Date.now()}-${attachment.file.name}`;
        
        const { error: uploadError } = await supabase.storage
            .from("post-files")
            .upload(filePath, attachment.file);

        if (uploadError) throw new Error(`Failed to upload ${attachment.name}: ${uploadError.message}`);

        const { data: publicURLData } = supabase.storage
            .from("post-files")
            .getPublicUrl(filePath);

        return publicURLData.publicUrl;
    });

    return Promise.all(uploadPromises);
};

const uploadMedia = async (mediaItems: MediaItem[], postTitle: string): Promise<{url: string; type: 'image' | 'video'; name: string; size: number}[]> => {
    const uploadPromises = mediaItems.map(async (item) => {
        const filePath = `${postTitle}-${Date.now()}-${item.file.name}`;
        
        const { error: uploadError } = await supabase.storage
            .from("post-media")
            .upload(filePath, item.file);

        if (uploadError) throw new Error(`Failed to upload ${item.name}: ${uploadError.message}`);

        const { data: publicURLData } = supabase.storage
            .from("post-media")
            .getPublicUrl(filePath);

        return {
            url: publicURLData.publicUrl,
            type: item.type,
            name: item.name,
            size: item.size
        };
    });

    return Promise.all(uploadPromises);
};

const createPost = async (post: PostInput, thumbnailFile: File, fileAttachments: FileAttachment[], mediaItems: MediaItem[]) => {
    // Upload thumbnail image
    const thumbnailFilePath = `${post.title}-${Date.now()}-${thumbnailFile.name}`;
    const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(thumbnailFilePath, thumbnailFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURLData } = supabase.storage
        .from("post-images")
        .getPublicUrl(thumbnailFilePath);

    // Upload file attachments
    const fileUrls = fileAttachments.length > 0 ? await uploadFiles(fileAttachments, post.title) : [];

    // Upload media items
    const mediaData = mediaItems.length > 0 ? await uploadMedia(mediaItems, post.title) : [];

    // Create file metadata
    const fileMetadata = fileAttachments.map((attachment, index) => ({
        name: attachment.name,
        size: attachment.size,
        type: attachment.type,
        url: fileUrls[index]
    }));

    const { data, error } = await supabase
        .from("posts")
        .insert({
            title: post.title,
            content: post.content,
            image_url: publicURLData.publicUrl,
            avatar_url: post.avatar_url,
            community_id: post.community_id,
            post_type: post.post_type,
            quiz_data: post.quiz_data,
            poll_data: post.poll_data,
            file_attachments: fileMetadata,
            media_items: mediaData 
        });

    if (error) throw new Error(error.message);
    return data;
};

export const CreatePost = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [communityId, setCommunityId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // This is the thumbnail
    const [postType, setPostType] = useState<'regular' | 'quiz' | 'poll'>('regular');
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [pollData, setPollData] = useState<PollData | null>(null);
    const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>([]);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAuth();

    const { data: communities } = useQuery<Community[], Error>({
        queryKey: ["communities"], 
        queryFn: fetchCommunities
    });

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: { post: PostInput, thumbnailFile: File, fileAttachments: FileAttachment[], mediaItems: MediaItem[] }) => {
            return createPost(data.post, data.thumbnailFile, data.fileAttachments, data.mediaItems);
        },
        onSuccess: () => {
            // Reset form
            setTitle("");
            setContent("");
            setCommunityId(null);
            setSelectedFile(null);
            setPostType('regular');
            setQuizData(null);
            setPollData(null);
            setFileAttachments([]);
            setMediaItems([]);
        }
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (isSubmitting || !selectedFile) return;
        setIsSubmitting(true);

        try {
            // Validation based on post type
            if (postType === 'quiz' && (!quizData || quizData.questions.some(q => !q.question || q.options.some(opt => !opt)))) {
                alert('Please complete all quiz questions and options');
                return;
            }

            if (postType === 'poll' && (!pollData || !pollData.question || pollData.options.some(opt => !opt.text))) {
                alert('Please complete the poll question and all options');
                return;
            }

            await mutate({ 
                post: { 
                    title, 
                    content: content || "",
                    avatar_url: user?.user_metadata.avatar_url || "",
                    community_id: communityId,
                    post_type: postType,
                    quiz_data: postType === 'quiz' ? quizData : null,
                    poll_data: postType === 'poll' ? pollData : null
                }, 
                thumbnailFile: selectedFile,
                fileAttachments: fileAttachments,
                mediaItems: mediaItems
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCommunityId(value ? Number(value) : null);
    };

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handlePostTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as 'regular' | 'quiz' | 'poll';
        setPostType(newType);
        if (newType !== 'quiz') setQuizData(null);
        if (newType !== 'poll') setPollData(null);
    };

    const handleFileAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const validFiles: FileAttachment[] = [];

        files.forEach(file => {
            if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
                alert(`File type ${file.type} is not supported for file attachments.`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                return;
            }

            if (fileAttachments.length + validFiles.length >= MAX_FILES) {
                alert(`Maximum ${MAX_FILES} files allowed.`);
                return;
            }

            validFiles.push({
                id: `${Date.now()}-${Math.random()}`,
                name: file.name,
                size: file.size,
                type: file.type,
                file: file
            });
        });

        if (validFiles.length > 0) {
            setFileAttachments(prev => [...prev, ...validFiles]);
        }

        e.target.value = '';
    };

    const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const validMedia: MediaItem[] = [];

        files.forEach(file => {
            if (!ALLOWED_MEDIA_TYPES[file.type as keyof typeof ALLOWED_MEDIA_TYPES]) {
                alert(`Media type ${file.type} is not supported.`);
                return;
            }

            const isVideo = file.type.startsWith('video/');
            const maxSize = isVideo ? MAX_MEDIA_SIZE : MAX_FILE_SIZE;
            
            if (file.size > maxSize) {
                alert(`File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
                return;
            }

            if (mediaItems.length + validMedia.length >= MAX_MEDIA) {
                alert(`Maximum ${MAX_MEDIA} media items allowed.`);
                return;
            }

            const mediaType: 'image' | 'video' = isVideo ? 'video' : 'image';
            const preview = URL.createObjectURL(file);

            validMedia.push({
                id: `${Date.now()}-${Math.random()}`,
                name: file.name,
                size: file.size,
                type: mediaType,
                file: file,
                preview: preview
            });
        });

        if (validMedia.length > 0) {
            setMediaItems(prev => [...prev, ...validMedia]);
        }

        e.target.value = '';
    };

    const removeFileAttachment = (id: string) => {
        setFileAttachments(prev => prev.filter(file => file.id !== id));
    };

    const removeMediaItem = (id: string) => {
        setMediaItems(prev => {
            const item = prev.find(item => item.id === id);
            if (item) {
                URL.revokeObjectURL(item.preview);
            }
            return prev.filter(item => item.id !== id);
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('document')) return '📝';
        if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
        if (type.includes('powerpoint') || type.includes('presentation')) return '📈';
        if (type.includes('text')) return '📃';
        return '📎';
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6"> 
            <div>
                <label htmlFor="title" className="block mb-2 font-medium"> 
                    Title *
                </label> 
                <input 
                    type="text" 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-white/10 bg-transparent p-2 rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="postType" className="block mb-2 font-medium"> 
                    Post Type
                </label> 
                <select 
                    id="postType" 
                    value={postType}
                    onChange={handlePostTypeChange}
                    className="w-full border border-white/10 bg-transparent p-2 rounded"
                >
                    <option value="regular" className="text-black">Regular Post</option>
                    <option value="quiz" className="text-black">Quiz</option>
                    <option value="poll" className="text-black">Poll</option>
                </select>
            </div>

            {postType === 'regular' && (
                <div>
                    <label htmlFor="content" className="block mb-2 font-medium"> 
                        Content
                    </label> 
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                    />
                </div>
            )}

            {postType === 'quiz' && (
                <div>
                    <label className="block mb-2 font-medium"> 
                        Quiz Setup
                    </label>
                    <QuizCreator onQuizChange={setQuizData} />
                    
                    <div className="mt-4">
                        <label htmlFor="quizContent" className="block mb-2 font-medium text-sm"> 
                            Quiz Description 
                        </label> 
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                        />
                    </div>
                </div>
            )}

            {postType === 'poll' && (
                <div>
                    <label className="block mb-2 font-medium"> 
                        Poll Question
                    </label>
                    <PollCreator onPollChange={setPollData} />
                    
                    <div className="mt-4">
                        <label htmlFor="pollContent" className="block mb-2 font-medium text-sm"> 
                            Poll Description 
                        </label> 
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                        />
                    </div>
                </div>
            )}

            {/* Thumbnail Upload */}
            <div>
                <label htmlFor="thumbnail" className="block mb-2 font-medium">
                    Thumbnail *
                </label>
                <div className="text-sm text-gray-400 mb-2">
                    This image will be used as the thumbnail for the post  
                </div>
                <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-full text-gray-200"
                    required
                />
                {selectedFile && (
                    <div className="mt-2 p-2 bg-gray-800 rounded border border-white/10">
                        <p className="text-sm text-green-400">✓ Thumbnail selected: {selectedFile.name}</p>
                    </div>
                )}
            </div>

            {/* Media Upload - Only for regular posts */}
            {postType === 'regular' && (
                <div>
                    <label htmlFor="media" className="block mb-2 font-medium">
                        Media Gallery 
                    </label>
                    <div className="text-sm text-gray-400 mb-2">
                        Upload photos and videos for a slideshow gallery. Supported: JPG, PNG, GIF, MP4, WebM (Max 50MB for videos, 10MB for images, up to {MAX_MEDIA} items)
                    </div>
                    <input
                        type="file"
                        id="media"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="w-full text-gray-200 mb-4"
                        disabled={mediaItems.length >= MAX_MEDIA}
                    />

                    {/* Display selected media */}
                    {mediaItems.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm">Media Gallery ({mediaItems.length}/{MAX_MEDIA}):</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {mediaItems.map(item => (
                                    <div key={item.id} className="relative group">
                                        <div className="aspect-video bg-gray-800 rounded border border-white/10 overflow-hidden">
                                            {item.type === 'video' ? (
                                                <div className="relative w-full h-full">
                                                    <video
                                                        src={item.preview}
                                                        className="w-full h-full object-cover"
                                                        muted
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Play size={24} className="text-white bg-black bg-opacity-50 rounded-full p-1" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <img
                                                    src={item.preview}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeMediaItem(item.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="mt-1 text-xs text-gray-400 truncate">
                                            {item.name} ({formatFileSize(item.size)})
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* File Attachments Section - Only for regular posts */}
            {postType === 'regular' && (
                <div>
                    <label htmlFor="fileAttachments" className="block mb-2 font-medium">
                        File Attachments 
                    </label>
                    <div className="text-sm text-gray-400 mb-2">
                        Supported: PDF, TXT, RTF, DOC, DOCX, XLS, XLSX, PPT, PPTX, MP3, WAV, OGG (Max 10MB each, up to {MAX_FILES} files)
                    </div>
                    <input
                        type="file"
                        id="fileAttachments"
                        multiple
                        accept=".pdf,.txt,.rtf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.wav,.ogg"
                        onChange={handleFileAttachmentChange}
                        className="w-full text-gray-200 mb-4"
                        disabled={fileAttachments.length >= MAX_FILES}
                    />

                    {/* Display attached files */}
                    {fileAttachments.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm">Attached Files:</h4>
                            {fileAttachments.map(attachment => (
                                <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{getFileIcon(attachment.type)}</span>
                                        <div>
                                            <p className="text-sm font-medium text-white">{attachment.name}</p>
                                            <p className="text-xs text-gray-400">{formatFileSize(attachment.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFileAttachment(attachment.id)}
                                        className="text-red-400 hover:text-red-300 text-sm px-2 py-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div>
                <label htmlFor="community" className="block mb-2 font-medium"> 
                    Select Community 
                </label>
                <select 
                    id="community" 
                    onChange={handleCommunityChange}
                    value={communityId ?? ""}
                    className="w-full border border-white/10 bg-transparent p-2 rounded"
                >
                    <option value="" className="text-gray-700"> -- Choose a Community -- </option>
                    {communities?.map((community) => (
                        <option key={community.id} value={community.id} className="text-black">
                            {community.name}
                        </option>
                    ))}
                </select>
            </div>

            <button 
                type="submit"
                disabled={isPending || !selectedFile || isSubmitting}
                className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            > 
                {isPending || isSubmitting ? "Creating..." : `Create ${postType === 'regular' ? 'Post' : postType === 'quiz' ? 'Quiz' : 'Poll'}`} 
            </button>

            {isError && <p className="text-red-500"> Error creating post. </p>}
        </form>
    );
};