import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";
import { useAuth } from "../context/AuthContext";
import type { Post } from "./PostList";
import { Trash2, Shield } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}

interface Community {
  id: number;
  name: string;
  description: string;
  author: string;
  avatar_url: string;
  icon_url?: string;
  created_at: string;
}

const fetchCommunityDetails = async (communityId: number): Promise<Community> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .eq("id", communityId)
    .single();

  if (error) throw new Error(error.message);
  return data as Community;
};

const fetchCommunityPosts = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as PostWithCommunity[];
};

const removePostFromCommunity = async (postId: number): Promise<void> => {
  const { error } = await supabase
    .from("posts")
    .update({ community_id: null })
    .eq("id", postId);

  if (error) throw new Error(error.message);
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [removingPostId, setRemovingPostId] = useState<number | null>(null);

  const {
    data: community,
    error: communityError,
    isLoading: communityLoading,
  } = useQuery<Community, Error>({
    queryKey: ["communityDetails", communityId],
    queryFn: () => fetchCommunityDetails(communityId),
  });

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPosts", communityId],
    queryFn: () => fetchCommunityPosts(communityId),
  });

  const removePostMutation = useMutation({
    mutationFn: removePostFromCommunity,
    onSuccess: () => {
      // Invalidate both community posts and general posts queries
      queryClient.invalidateQueries({ queryKey: ["communityPosts", communityId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setRemovingPostId(null);
    },
    onError: (error) => {
      console.error("Error removing post from community:", error);
      setRemovingPostId(null);
    }
  });

  if (communityLoading || postsLoading) {
    return <div className="text-center py-4">Loading community...</div>;
  }

  if (communityError || postsError) {
    return (
      <div className="text-center text-red-500 py-4">
        Error: {communityError?.message || postsError?.message}
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

  // Check if current user is the community author
  const isAuthor = user?.user_metadata.user_name === community?.author;

  const handleRemovePost = async (postId: number, postTitle: string) => {
    if (removingPostId) return; // Prevent multiple simultaneous removals
    
    const confirmed = window.confirm(
      `Are you sure you want to remove "${postTitle}" from this community?\n\nThe post will not be deleted, but will no longer appear in this community.`
    );
    
    if (confirmed) {
      setRemovingPostId(postId);
      removePostMutation.mutate(postId);
    }
  };

  return (
    <div>
      {/* Community Header */}
      <div className="mb-12">
        {/* Community Details Card */}
        <div className="max-w-4xl mx-auto bg-gray-900/50 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-6">
            {/* Community Icon on the left */}
            <div className="flex-shrink-0">
              {community?.icon_url ? (
                <img 
                  src={community.icon_url} 
                  alt={`${community.name} icon`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-yellow-300/30" 
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-2xl font-bold text-black">
                  {community?.name?.[0] || "C"}
                </div>
              )}
            </div>

            {/* Community Info in the center */}
            <div className="flex-1">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-white">{community?.name}</h3>
                  {isAuthor && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-300/20 text-yellow-300 text-xs rounded-full border border-yellow-300/30">
                      <Shield size={12} />
                      <span>Creator</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {community?.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>
                  Created by: {" "}
                  <Link
                      to={`/user/${community?.author}`}
                      className="text-blue-400 hover:underline"
                  >
                      {community?.author}
                  </Link>
                </span>
                <span>•</span>
                <span>Created {community?.created_at ? formatDate(community.created_at) : "Unknown"}</span>
              </div>
            </div>

            {/* Author Avatar on the right */}
            <div className="flex-shrink-0">
              {community?.avatar_url ? (
                <img 
                  src={community.avatar_url} 
                  alt={`${community.author} avatar`}
                  className="w-12 h-12 rounded-full object-cover" 
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tl from-[#8A2BE2] to-[#491F70] flex items-center justify-center text-white font-semibold">
                  {community?.author?.[0] || "U"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Moderation Notice for Authors */}
        {isAuthor && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-yellow-300/10 border border-yellow-300/30 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-300">
              <Shield size={16} />
              <span className="font-medium">Community Moderation</span>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              As the community creator, you can remove posts from this community. Removed posts won't be deleted but will no longer appear here.
            </p>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-2xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1">
          Community Posts
        </h3>
        
        {posts && posts.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.map((post) => (
              <div key={post.id} className="relative z-10">

                <PostItem post={post} />

                {/* Remove button for community authors */}
                {isAuthor && (
                  <button
                    onClick={() => handleRemovePost(post.id, post.title)}
                    disabled={removingPostId === post.id}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group z-20"
                    title="Remove post from community"
                  >
                    {removingPostId === post.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg mb-2">No posts in this community yet.</p>
          </div>
        )}
      </div>

      {/* Error handling for post removal */}
      {removePostMutation.isError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <p className="font-medium">Error removing post</p>
          <p className="text-sm opacity-90">Please try again later.</p>
        </div>
      )}
    </div>
  );
};