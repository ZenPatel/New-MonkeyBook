import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  commentId: number;
  commentAuthor: string;
  currentUser?: string;
  postId: number;
}

const deleteComment = async (commentId: number): Promise<void> => {
  // Delete the comment (cascade will handle replies due to foreign key constraint)
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw new Error(`Failed to delete comment: ${error.message}`);
};

export const DeleteComment = ({ commentId, commentAuthor, currentUser, postId }: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteCommentMutation, isPending } = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      // Invalidate comments query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  });

  // Only show delete button if current user is the comment author
  if (!currentUser || currentUser !== commentAuthor) {
    return null;
  }

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deleteCommentMutation();
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-white/10 rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-bold text-white mb-4">Delete Comment</h3>
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete this comment?
          </p>
          <p className="text-sm text-red-400 mb-6">
            This action cannot be undone. All replies will also be deleted.
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
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={14} />
                  Delete
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
      className="text-red-400 hover:text-red-300 text-sm ml-2"
      title="Delete Comment"
    >
      <Trash2 size={14} />
    </button>
  );
};