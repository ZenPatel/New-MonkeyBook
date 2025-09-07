import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { QuizDisplay } from "./QuizDisplay";
import { PollDisplay } from "./PollDisplay";
import { FileAttachments } from "./FileAttachments";
import { MediaSlideshow, type MediaItem } from "./MediaSlideshow";
import { DeletePost } from "./DeletePost";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    const { user } = useAuth();
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

    const mediaItems: MediaItem[] = data?.media_items?.map((item: any, index: number) => ({
        id: `media-${index}`,
        url: item.url,
        type: item.type,
        name: item.name,
        size: item.size
    })) || [];

    return ( 
        <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
                {renderPostTypeIcon(data!.post_type)}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight px-2"> 
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

            {/* Media Slideshow - only show for regular posts with media */}
            {data?.post_type === 'regular' && mediaItems.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white flex items-center">
                            <span className="mr-2">🎬</span>
                            Media Gallery ({mediaItems.length})
                        </h3>
                    </div>
                    <MediaSlideshow 
                        media={mediaItems} 
                        className="max-w-4xl mx-auto"
                    />
                </div>
            )}

            {/* File Attachments - only show for regular posts with files */}
            {data?.post_type === 'regular' && data.file_attachments && data.file_attachments.length > 0 && (
                <FileAttachments files={data.file_attachments} />
            )}

            {/* Quiz Display */}
            {data?.post_type === 'quiz' && <QuizDisplay post={data} />}

            {/* Poll Display */}
            {data?.post_type === 'poll' && <PollDisplay post={data} />}

            {data?.content && data.content.trim() !== '' && (
                <div 
                    className="prose prose-invert max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            )}
            
            <p className="text-gray-500 text-sm"> 
                Posted on: {new Date(data!.created_at).toLocaleDateString()} 
            </p>
            <p className="text-gray-500 text-sm"> 
                Created by: {" "} 
                <Link
                  to={`/user/${data?.author}`}
                  className="text-blue-400 hover:underline"
                >
                  {data?.author}
                </Link>
            </p>

            {/* Delete button - only show for post author */}
            <div className="flex justify-between items-center">
                <LikeButton postId={postId} />
                <DeletePost 
                    postId={postId}
                    postTitle={data?.title || ""}
                    postAuthor={data?.author || ""}
                    currentUser={user?.user_metadata?.user_name || user?.user_metadata?.full_name}
                />
            </div>
            <CommentSection postId={postId} />
        </div> 
    );
};