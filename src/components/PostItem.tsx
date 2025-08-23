import { Link } from "react-router";
import { type Post } from "./PostList";

interface Props {
    post: Post;
}

export const PostItem = ({ post }: Props) => {
    const renderPostTypeIcon = (postType: string) => {
        switch (postType) {
            case 'quiz':
                return <span className="text-lg">🧠</span>;
            case 'poll':
                return <span className="text-lg">📊</span>;
            default:
                return null;
        }
    };

    const getPostTypeLabel = (postType: string) => {
        switch (postType) {
            case 'quiz':
                return 'Quiz';
            case 'poll':
                return 'Poll';
            default:
                return null;
        }
    };

    const hasFileAttachments = post.file_attachments && post.file_attachments.length > 0;

    return (
        <div className="relative group">
            <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-red-500 to-orange-400 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none"></div>
            <Link to={`/post/${post.id}`} className="block relative z-10">
                <div className="w-80 h-76 bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] text-white flex flex-col p-5 overflow-hidden transition-colors duration-300 group-hover:bg-gray-800">
                    {/* Header: Avatar, Title, and Post Type */}
                    <div className="flex items-center space-x-2">
                        {post.avatar_url ? (
                            <img 
                                src={post.avatar_url} 
                                alt="User Avatar"
                                className="w-[35px] h-[35px] rounded-full object-cover" 
                            />
                        ) : (
                            <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-tl from-[#8A2BE2] to-[#491F70]" />
                        )}
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-2">
                                <div className="text-[20px] leading-[22px] font-semibold mt-0.5 flex-1">
                                    {post.title}
                                </div>
                                <div className="flex items-center gap-1">
                                    {renderPostTypeIcon(post.post_type)}
                                    {/* File attachment indicator */}
                                    {hasFileAttachments && (
                                        <span className="text-sm opacity-70" title={`${post.file_attachments!.length} file(s) attached`}>
                                            📎
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                {post.post_type && post.post_type !== 'regular' && (
                                    <div className="text-xs text-blue-400 font-medium">
                                        {getPostTypeLabel(post.post_type)}
                                    </div>
                                )}
                                {hasFileAttachments && (
                                    <div className="text-xs text-gray-400">
                                        {post.file_attachments!.length} file{post.file_attachments!.length > 1 ? 's' : ''}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Image Banner */}
                    <div className="mt-6 flex-1">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full rounded-[20px] object-cover max-h-[150px] mx-auto"
                        />
                    </div>

                    {/* Stats and Indicators */}
                    <div className="flex justify-around items-center">
                        <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
                            ❤️ <span className="ml-2">{post.like_count ?? 0}</span>
                        </span>
                        <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg">
                            💬 <span className="ml-2">{post.comment_count ?? 0}</span>
                        </span>
                        {hasFileAttachments && (
                            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg" title="Has file attachments">
                                📎 <span className="ml-2">{post.file_attachments!.length}</span>
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};