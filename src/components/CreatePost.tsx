import { useState, type ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { fetchCommunities, type Community } from "./CommunityList";
import { RichTextEditor } from "./RichTextEditor";
import { QuizCreator } from "./QuizCreator";
import { PollCreator } from "./PollCreator";
import type { QuizData, PollData } from "../types/index";

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
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

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

const createPost = async (post: PostInput, imageFile: File, fileAttachments: FileAttachment[]) => {
    // Upload main image
    const imageFilePath = `${post.title}-${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(imageFilePath, imageFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURLData } = supabase.storage
        .from("post-images")
        .getPublicUrl(imageFilePath);

    // Upload file attachments
    const fileUrls = fileAttachments.length > 0 ? await uploadFiles(fileAttachments, post.title) : [];

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
            file_attachments: fileMetadata // Add this field to your posts table
        });

    if (error) throw new Error(error.message);
    return data;
};

export const CreatePost = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [communityId, setCommunityId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [postType, setPostType] = useState<'regular' | 'quiz' | 'poll'>('regular');
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [pollData, setPollData] = useState<PollData | null>(null);
    const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>([]);

    const { user } = useAuth();

    const { data: communities } = useQuery<Community[], Error>({
        queryKey: ["communities"], 
        queryFn: fetchCommunities
    });

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: { post: PostInput, imageFile: File, fileAttachments: FileAttachment[] }) => {
            return createPost(data.post, data.imageFile, data.fileAttachments);
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
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile) return;

        // Validation based on post type
        if (postType === 'quiz' && (!quizData || quizData.questions.some(q => !q.question || q.options.some(opt => !opt)))) {
            alert('Please complete all quiz questions and options');
            return;
        }

        if (postType === 'poll' && (!pollData || !pollData.question || pollData.options.some(opt => !opt.text))) {
            alert('Please complete the poll question and all options');
            return;
        }

        mutate({ 
            post: { 
                title, 
                content: content || "",
                avatar_url: user?.user_metadata.avatar_url || "",
                community_id: communityId,
                post_type: postType,
                quiz_data: postType === 'quiz' ? quizData : null,
                poll_data: postType === 'poll' ? pollData : null
            }, 
            imageFile: selectedFile,
            fileAttachments: fileAttachments
        });
    };

    const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCommunityId(value ? Number(value) : null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            // Check file type
            if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
                alert(`File type ${file.type} is not supported. Supported types: PDF, TXT, RTF, DOC, DOCX, XLS, XLSX, PPT, PPTX`);
                return;
            }

            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                return;
            }

            // Check total number of files
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

        // Reset input
        e.target.value = '';
    };

    const removeFileAttachment = (id: string) => {
        setFileAttachments(prev => prev.filter(file => file.id !== id));
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

            {/* File Attachments Section - Only for regular posts */}
            {postType === 'regular' && (
                <div>
                    <label htmlFor="fileAttachments" className="block mb-2 font-medium">
                        File Attachments 
                    </label>
                    <div className="text-sm text-gray-400 mb-2">
                        Supported: PDF, TXT, RTF, DOC, DOCX, XLS, XLSX, PPT, PPTX (Max 10MB each, up to {MAX_FILES} files)
                    </div>
                    <input
                        type="file"
                        id="fileAttachments"
                        multiple
                        accept=".pdf,.txt,.rtf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
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

            <div>
                <label htmlFor="image" className="block mb-2 font-medium">
                    Upload Image *
                </label> 
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-gray-200"
                    required
                />
            </div>

            <button 
                type="submit"
                disabled={isPending || !selectedFile}
                className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            > 
                {isPending ? "Creating..." : `Create ${postType === 'regular' ? 'Post' : postType === 'quiz' ? 'Quiz' : 'Poll'}`} 
            </button>

            {isError && <p className="text-red-500"> Error creating post. </p>}
        </form>
    );
};