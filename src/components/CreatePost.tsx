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

const createPost = async (post: PostInput, imageFile: File) => {
    const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, imageFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURLData } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath);

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
            poll_data: post.poll_data
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

    const { user } = useAuth();

    const { data: communities } = useQuery<Community[], Error>({
        queryKey: ["communities"], 
        queryFn: fetchCommunities
    });

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: { post: PostInput, imageFile: File }) => {
            return createPost(data.post, data.imageFile);
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
                content: content || "", // Ensure content is not null
                avatar_url: user?.user_metadata.avatar_url || "", // Ensure avatar_url is not null
                community_id: communityId,
                post_type: postType,
                quiz_data: postType === 'quiz' ? quizData : null,
                poll_data: postType === 'poll' ? pollData : null
            }, 
            imageFile: selectedFile 
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
        // Reset data when changing type
        if (newType !== 'quiz') setQuizData(null);
        if (newType !== 'poll') setPollData(null);
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