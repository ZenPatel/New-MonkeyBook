import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  communityId: number;
  communityName: string;
  communityAuthor: string;
  currentUser?: string;
  onDelete?: () => void;
  className?: string;
}

const deleteCommunity = async (communityId: number): Promise<void> => {
  // First, update all posts in this community to remove the community reference
  const { error: postsError } = await supabase
    .from("posts")
    .update({ community_id: null })
    .eq("community_id", communityId);

  if (postsError) throw new Error(`Failed to update posts: ${postsError.message}`);

  // Delete the community
  const { error: communityError } = await supabase
    .from("communities")
    .delete()
    .eq("id", communityId);

  if (communityError) throw new Error(`Failed to delete community: ${communityError.message}`);
};

export const DeleteCommunity = ({ communityId, communityName, communityAuthor, currentUser, onDelete, className }: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteCommunityMutation, isPending } = useMutation({
    mutationFn: () => deleteCommunity(communityId),
    onSuccess: () => {
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["communityDetails", communityId] });
      queryClient.invalidateQueries({ queryKey: ["communityPosts", communityId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      
      if (onDelete) {
        onDelete();
      } else {
        // Navigate to communities page
        navigate("/communities");
      }
    },
    onError: (error) => {
      console.error("Error deleting community:", error);
      alert("Failed to delete community. Please try again.");
    }
  });

  // Only show delete button if current user is the community author
  if (!currentUser || currentUser !== communityAuthor) {
    return null;
  }

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deleteCommunityMutation();
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-white/10 rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-bold text-white mb-4">Delete Community</h3>
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete the community "{communityName}"?
          </p>
          <p className="text-sm text-red-400 mb-6">
            This action cannot be undone. Posts in this community will be moved back to the general feed.
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
                  Delete Community
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
      title="Delete Community"
    >
      <Trash2 size={16} />
      Delete Community
    </button>
  );
};