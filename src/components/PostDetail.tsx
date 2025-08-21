import { useQuery } from "@tanstack/react-query"
import type { Post } from "./PostList"
import { supabase } from "../supabase-client"
import { LikeButton } from "./LikeButton"
import { CommentSection } from "./CommentSection"

interface Props {
    postId: number
}

const fetchPostById = async (id: number): Promise<Post> => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

      if (error) throw new Error(error.message)

      return data as Post;
}

export const PostDetail = ({ postId }: Props ) => {
    const { data, error, isLoading } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId),
    })

    if (isLoading) {
        return <div> Loading post... </div>
    }

    if (error) {
        return <div> Error: {error.message} </div>
    }

    return ( 
      <div className="space-y-6">
        <h2 className="text-6xl font-bold mb-1 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-3"> 
            {data?.title} 
        </h2>
        {data?.image_url && (
          <img 
            src={data?.image_url} 
            alt={data?.title} 
            className="mt-8 rounded object-cover w-full max-w-3xl h-full max-w-3xl mx-auto"
          />
        )}
        
        {/* Render rich HTML content */}
        <div 
          className="prose prose-invert max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: data?.content || '' }}
        />
        
        <p className="text-gray-500 text-sm"> 
            Posted on: {new Date(data!.created_at).toLocaleDateString()} 
        </p>

        <LikeButton postId={postId} />
        <CommentSection postId={postId} />
      </div> 
    )
}