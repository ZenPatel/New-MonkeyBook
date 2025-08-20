import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";
import type { Post } from "./PostList";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}

interface Community {
  name: string;
}

const fetchCommunityName = async (communityId: number): Promise<Community> => {
  const { data, error } = await supabase
    .from("communities")
    .select("name")
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

export const CommunityDisplay = ({ communityId }: Props) => {
  const {
    data: community,
    error: communityError,
    isLoading: communityLoading,
  } = useQuery<Community, Error>({
    queryKey: ["communityName", communityId],
    queryFn: () => fetchCommunityName(communityId),
  });

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPosts", communityId],
    queryFn: () => fetchCommunityPosts(communityId),
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

  return (
    <div>
      <h2 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1">
        {community?.name || "Community"}
      </h2>

      {posts && posts.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No posts in this community yet.
        </p>
      )}
    </div>
  );
};