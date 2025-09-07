import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  postId: number;
  postTitle: string;
  postAuthor: string;
  currentUser?: string;
  onDelete?: () => void;
  className?: string;
}

const deletePost = async (postId: number): Promise<void> => {
  // First delete all comments for this post (cascade will handle replies)
  const { error: commentsError } = await supabase
    .from("comments")
    .delete()
    .eq("post_id", postId);

  if (commentsError) throw new Error(`Failed to delete comments: ${commentsError.message}`);

  // Delete the post
  const { error: postError } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (postError) throw new Error(`Failed to delete post: ${postError.message}`);
};

export const DeletePost = ({ postId, postTitle, postAuthor, currentUser, onDelete, className }: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deletePostMutation, isPending } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["communityPosts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      
      if (onDelete) {
        onDelete();
      } else {
        // Navigate to home if no callback provided
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  });

  // Only show delete button if current user is the post author
  if (!currentUser || currentUser !== postAuthor) {
    return null;
  }

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deletePostMutation();
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-white/10 rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-bold text-white mb-4">Delete Post</h3>
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete "{postTitle}"?
          </p>
          <p className="text-sm text-red-400 mb-6">
            This action cannot be undone. All comments will also be deleted.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelDelete}
              disabled={isPending}
              className="px-4 py-2 border border-white/10 text-gray-300 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isPending}
              className="px-4 py-2 bg-red-500 text-black rounded hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleDelete}
      className={`flex items-center gap-2 px-3 py-2 bg-red-500 text-black rounded hover:text-white transition-colors ${className || ''}`}
      title="Delete Post"
    >
      <Trash2 size={16} />
      Delete Post
    </button>
  );
};