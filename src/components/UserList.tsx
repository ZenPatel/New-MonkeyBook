import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";

export interface User {
    user_name: string;
    avatar_url: string;
    bio?: string;
    created_at: string;
    post_count: number;
    latest_post_date?: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    // Get all unique users from posts table with their post counts and latest activity
    const { data: usersData, error } = await supabase
        .from("posts")
        .select("author, avatar_url, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    // Group by user and calculate stats
    const userMap = new Map<string, User>();
    
    usersData?.forEach(post => {
        const username = post.author;
        if (userMap.has(username)) {
            const user = userMap.get(username)!;
            user.post_count += 1;
            // Update latest post date if this post is newer
            if (new Date(post.created_at) > new Date(user.latest_post_date || '1970-01-01')) {
                user.latest_post_date = post.created_at;
            }
        } else {
            userMap.set(username, {
                user_name: username,
                avatar_url: post.avatar_url || "",
                bio: "", // We don't have bio in posts table
                created_at: post.created_at, // First post date
                post_count: 1,
                latest_post_date: post.created_at
            });
        }
    });

    // Convert map to array and sort by post count (most active first)
    return Array.from(userMap.values()).sort((a, b) => b.post_count - a.post_count);
};

export const UserList = () => {
    const { data, error, isLoading } = useQuery<User[], Error>({
        queryKey: ["users"], 
        queryFn: fetchUsers
    });

    if (isLoading) {
        return <div className="text-center py-4">Loading users...</div>;
    }

    if (error) {
        return ( 
            <div className="text-center text-red-500 py-4"> 
                Error: {error.message} 
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getActivityStatus = (latestPostDate?: string) => {
        if (!latestPostDate) return "No recent activity";
        
        const daysSincePost = Math.floor(
            (Date.now() - new Date(latestPostDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysSincePost === 0) return "Active today";
        if (daysSincePost === 1) return "Active yesterday";
        if (daysSincePost < 7) return `Active ${daysSincePost} days ago`;
        if (daysSincePost < 30) return `Active ${Math.floor(daysSincePost / 7)} weeks ago`;
        return `Active ${Math.floor(daysSincePost / 30)} months ago`;
    };

    return ( 
        <div className="max-w-5xl mx-auto space-y-4"> 
            {data?.map((user) => (
                <div
                    key={user.user_name}
                    className="border border-white/10 p-6 rounded-lg hover:-translate-y-1 transition transform bg-gray-900/30"
                >
                    <div className="flex items-start gap-4">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                            {user.avatar_url ? (
                                <img 
                                    src={user.avatar_url} 
                                    alt={`${user.user_name} avatar`}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white/10" 
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-xl font-bold text-black">
                                    {user.user_name[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* User Details */}
                        <div className="flex-1">
                            <Link 
                                to={`/user/${user.user_name}`}
                                className="block text-2xl font-bold text-white hover:text-yellow-300 transition-colors mb-2"
                            >
                                {user.user_name}
                            </Link>
                            
                            {user.bio && (
                                <p className="text-gray-300 mt-2 mb-3 leading-relaxed"> 
                                    {user.bio} 
                                </p>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-yellow-300">{user.post_count}</span>
                                    <span>{user.post_count === 1 ? 'post' : 'posts'}</span>
                                </div>
                                <span>•</span>
                                <span>{getActivityStatus(user.latest_post_date)}</span>
                            </div>
                            
                            <div className="text-sm text-gray-400">
                                <span>First post: {formatDate(user.created_at)}</span>
                            </div>
                        </div>

                        {/* Activity Indicator */}
                        <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                                user.latest_post_date && 
                                (Date.now() - new Date(user.latest_post_date).getTime()) < (7 * 24 * 60 * 60 * 1000)
                                    ? 'bg-green-400' 
                                    : 'bg-gray-600'
                            }`} title={
                                user.latest_post_date && 
                                (Date.now() - new Date(user.latest_post_date).getTime()) < (7 * 24 * 60 * 60 * 1000)
                                    ? 'Active this week' 
                                    : 'Inactive'
                            } />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};