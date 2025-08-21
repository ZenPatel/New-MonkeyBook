import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    image_url: string;
    avatar_url?: string;
    like_count?: number;
    comment_count?: number;
}

const fetchPosts = async (): Promise<Post[]> => {
    // Fetch directly from the posts table
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    // Brute force: add default 0 for like_count and comment_count
    return (data as Post[]).map(post => ({
        ...post,
        like_count: 0,
        comment_count: 0,
    }));
}

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
