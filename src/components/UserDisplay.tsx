import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";
import type { Post } from "./PostList";
import { Calendar, User2, Settings } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Props {
  username: string;
}

interface PostWithCommunity extends Post {
  communities?: {
    name: string;
    id: number;
  };
}

interface UserProfile {
  user_name: string;
  avatar_url: string;
  bio?: string | null;
  created_at?: string;
  total_posts?: number;
  total_likes?: number;
}

const fetchUserProfile = async (username: string): Promise<UserProfile> => {
  // Get all posts by this user (ascending = earliest first)
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("author, avatar_url, created_at")
    .eq("author", username)
    .order("created_at", { ascending: true });

  if (postsError) throw new Error(postsError.message);

  const earliestPost = posts && posts.length > 0 ? posts[0] : null;

  // Try to get user profile data from "users" table
  const { data: userData } = await supabase
    .from("users")
    .select("user_name, avatar_url, bio, created_at")
    .eq("user_name", username)
    .single();

  // Count posts
  const { count: postCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("author", username);

  return {
    user_name: userData?.user_name || username,
    // Always prefer earliestPost.avatar_url
    avatar_url: earliestPost?.avatar_url || userData?.avatar_url || "",
    bio: userData?.bio || "",
    created_at: earliestPost?.created_at || userData?.created_at || "",
    total_posts: postCount || 0,
    total_likes: 0,
  };
};

const fetchUserPosts = async (username: string): Promise<PostWithCommunity[]> => {
  // Get all posts with counts using the RPC function
  const { data: allPostsData, error: allPostsError } = await supabase.rpc("get_posts_with_counts");
  
  if (allPostsError) throw new Error(allPostsError.message);

  // Filter posts for this user
  const userPosts = allPostsData.filter((post: Post) => post.author === username);

  // For posts that have community_id, fetch the community info
  const postsWithCommunities = await Promise.all(
    userPosts.map(async (post: Post) => {
      if (post.community_id) {
        const { data: communityData, error: communityError } = await supabase
          .from("communities")
          .select("name, id")
          .eq("id", post.community_id)
          .single();

        if (!communityError && communityData) {
          return {
            ...post,
            communities: {
              name: communityData.name,
              id: communityData.id
            }
          };
        }
      }
      return { ...post };
    })
  );

  return postsWithCommunities as PostWithCommunity[];
};

export const UserDisplay = ({ username }: Props) => {
  const { user } = useAuth();

  const {
    data: userProfile,
    error: profileError,
    isLoading: profileLoading,
  } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile", username],
    queryFn: () => fetchUserProfile(username),
  });

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["userPosts", username],
    queryFn: () => fetchUserPosts(username),
  });

  // Additional query to check if this user belongs to the current logged-in user
  const { data: currentUserCheck } = useQuery({
    queryKey: ["currentUserCheck", user?.id, username],
    queryFn: async () => {
      if (!user) return false;
      
      // Check if any posts by this username belong to the current user
      const { data } = await supabase
        .from("posts")
        .select("author_id")
        .eq("author", username)
        .eq("author_id", user.id)
        .limit(1);
      
      return data && data.length > 0;
    },
    enabled: !!user && !!username,
  });

  if (profileLoading || postsLoading) {
    return <div className="text-center py-4">Loading user profile...</div>;
  }

  if (profileError || postsError) {
    return (
      <div className="text-center text-red-500 py-4">
        Error: {profileError?.message || postsError?.message}
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPostTypeStats = () => {
    if (!posts) return { regular: 0, quiz: 0, poll: 0 };
    
    return posts.reduce((acc, post) => {
      const type = post.post_type || 'regular';
      acc[type as keyof typeof acc]++;
      return acc;
    }, { regular: 0, quiz: 0, poll: 0 });
  };

  const postStats = getPostTypeStats();

  // Check if this is the current user's profile
  const isCurrentUser = user && (
    // Check database result first
    currentUserCheck ||
    // Check if the username matches the logged-in user's metadata username
    user.user_metadata?.user_name === username ||
    // Or check if the email prefix matches (fallback)
    user.email?.split('@')[0] === username
  );

  return (
    <div>
      {/* User Profile Header */}
      <div className="mb-12">
        {/* User Profile Card */}
        <div className="max-w-4xl mx-auto bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-6">
            {/* User Avatar on the left */}
            <div className="flex-shrink-0">
              {userProfile?.avatar_url ? (
                <img 
                  src={userProfile.avatar_url} 
                  alt={`${username} avatar`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-yellow-300/30" 
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-3xl font-bold text-black">
                  {username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Info in the center */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-white">{username}</h3>
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                    <User2 size={12} />
                    <span>User Profile</span>
                  </div>
                  {/* Settings button for current user */}
                  {isCurrentUser && (
                    <Link
                      to="/user/settings"
                      className="ml-auto flex items-center gap-1 px-3 py-1 bg-yellow-300/20 text-yellow-300 text-sm rounded-full border border-yellow-300/30 hover:bg-yellow-300/30 transition-colors"
                      title="Account Settings"
                    >
                      <Settings size={14} />
                      <span>Settings</span>
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{posts?.length || 0}</div>
                  <div className="text-sm text-gray-400">Total Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{postStats.regular}</div>
                  <div className="text-sm text-gray-400">Regular Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{postStats.quiz}</div>
                  <div className="text-sm text-gray-400">Quizzes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">{postStats.poll}</div>
                  <div className="text-sm text-gray-400">Polls</div>
                </div>
              </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <span>{userProfile?.bio || "No bio available."}</span>
                </div>

              {userProfile?.created_at && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>First post: {formatDate(userProfile.created_at)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Communities this user has posted in */}
        {posts && posts.length > 0 && (
          <div className="max-w-4xl mx-auto mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Communities Active In</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts
                .filter(post => post.communities)
                .map(post => JSON.stringify({ id: post.communities!.id, name: post.communities!.name }))))
                .map(communityStr => {
                  const community = JSON.parse(communityStr);
                  return (
                    <a
                      key={community.id}
                      href={`/community/${community.id}`}
                      className="px-3 py-1 bg-gray-800/50 border border-white/10 rounded-full text-sm text-gray-300 hover:text-yellow-300 hover:border-yellow-300/30 transition-colors"
                    >
                      {community.name}
                    </a>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-2xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1">
          {username}'s Posts
        </h3>
        
        {posts && posts.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <PostItem post={post} />
                
                {/* Community badge if post is in a community */}
                {post.communities && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <a
                      href={`/community/${post.communities.id}`}
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                      title={`Posted in ${post.communities.name}`}
                    >
                      {post.communities.name}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg mb-2">{username} hasn't created any posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};