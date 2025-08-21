import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { QuizDisplay } from "./QuizDisplay";
import { PollDisplay } from "./PollDisplay";

interface Props {
    postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);
    return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
    const { data, error, isLoading } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId),
    });

    if (isLoading) {
        return <div className="text-center py-4">Loading post...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
    }

    const renderPostTypeIcon = (postType: string) => {
        switch (postType) {
            case 'quiz':
                return <span className="text-2xl">🧠</span>;
            case 'poll':
                return <span className="text-2xl">📊</span>;
            default:
                return null;
        }
    };

    return ( 
        <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
                {renderPostTypeIcon(data!.post_type)}
                <h2 className="text-6xl font-bold text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight"> 
                    {data?.title} 
                </h2>
            </div>
            
            {data?.post_type && data.post_type !== 'regular' && (
                <div className="text-center">
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-900/30 border border-blue-500/50 text-blue-300">
                        {data.post_type.charAt(0).toUpperCase() + data.post_type.slice(1)}
                    </span>
                </div>
            )}

            {data?.image_url && (
                <img 
                    src={data.image_url} 
                    alt={data.title} 
                    className="mt-8 rounded object-cover w-full max-w-3xl h-auto mx-auto"
                />
            )}
            
            {/* Content - only show if there is content */}
            {data?.content && data.content.trim() !== '' && (
                <div 
                    className="prose prose-invert max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            )}

            {/* Quiz Display */}
            {data?.post_type === 'quiz' && <QuizDisplay post={data} />}

            {/* Poll Display */}
            {data?.post_type === 'poll' && <PollDisplay post={data} />}
            
            <p className="text-gray-500 text-sm"> 
                Posted on: {new Date(data!.created_at).toLocaleDateString()} 
            </p>

            <LikeButton postId={postId} />
            <CommentSection postId={postId} />
        </div> 
    );
};