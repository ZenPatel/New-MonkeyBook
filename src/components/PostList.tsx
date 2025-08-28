import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

export interface FileMetadata {
    name: string;
    size: number;
    type: string;
    url: string;
}

export interface MediaItem {
    url: string;
    type: 'image' | 'video' ;
    name: string;
    size: number;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    image_url: string; // This is now just the thumbnail
    author: string;
    avatar_url: string;
    like_count?: number;
    comment_count?: number;
    community_id?: number | null;
    post_type: 'regular' | 'quiz' | 'poll';
    quiz_data?: QuizData | null;
    poll_data?: PollData | null;
    file_attachments?: FileMetadata[] | null;
    media_items?: MediaItem[] | null; // Add this field for the slideshow media
}

export interface QuizData {
    questions: QuizQuestion[];
    allow_retake: boolean;
    show_results: boolean;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation?: string;
}

export interface PollData {
    question: string;
    options: PollOption[];
    multiple_choice: boolean;
    expires_at?: string;
}

export interface PollOption {
    id: string;
    text: string;
    votes: number;
}

export interface QuizResponse {
    id: number;
    post_id: number;
    user_id: string;
    answers: number[];
    score: number;
    completed_at: string;
}

export interface PollResponse {
    id: number;
    post_id: number;
    user_id: string;
    selected_options: string[];
    created_at: string;
}

const fetchPosts = async (): Promise<Post[]> => {
    const { data, error } = await supabase.rpc("get_posts_with_counts")

    if (error) throw new Error(error.message);

    return data as Post[]
};

export const PostList = () => {
    const { data, error, isLoading } = useQuery<Post[], Error>({
        queryKey: ["posts"], 
        queryFn: fetchPosts
    });

    if (isLoading) return <div>Loading posts...</div>;  // added return

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(data);

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {data?.map((post, key) => (
                <PostItem post={post} key={key} />
            ))}
        </div>
    );
};
