import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  username: string;
  currentUser?: string;
  isCurrentUser?: boolean;
}

const deleteUserAccount = async (username: string, user_id: string): Promise<void> => {
  // Delete all comments by this user
  const { error: commentsError } = await supabase
    .from("comments")
    .delete()
    .eq("author", username);

  if (commentsError) throw new Error(`Failed to delete comments: ${commentsError.message}`);

  // Delete all posts by this user
  const { error: postsError } = await supabase
    .from("posts")
    .delete()
    .eq("author", username);

  if (postsError) throw new Error(`Failed to delete posts: ${postsError.message}`);

  // Delete all communities by this user
  const { error: communitiesError } = await supabase
    .from("communities")
    .delete()
    .eq("author", username);
  
  if (communitiesError) throw new Error(`Failed to delete communities: ${communitiesError.message}`);

  // Delete all chat messages by this user
  const { error: messagesError } = await supabase
    .from("chat_messages")
    .delete()
    .eq("user_name", username);

  if (messagesError) throw new Error(`Failed to delete chat messages: ${messagesError.message}`);

  // Delete all votes by this user
  const { error: votesError } = await supabase
    .from("votes")
    .delete()
    .eq("user_id", user_id);

  if (votesError) throw new Error(`Failed to delete posts: ${votesError.message}`);

  // Delete user profile data if it exists
  await supabase
    .from("users")
    .delete()
    .eq("user_name", username);

  await supabase.auth.signOut();
};

export const DeleteAccount = ({ username, currentUser, isCurrentUser }: Props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: deleteAccountMutation, isPending } = useMutation({
    mutationFn: () => deleteUserAccount(username, user?.id || ""),
    onSuccess: () => {
      // Clear all caches
      queryClient.clear();
      
      // Navigate to home
      navigate("/");
    },
    onError: (error) => {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  });

  // Only show delete button if it's the current user's own account
  if (!isCurrentUser || !currentUser || currentUser !== username) {
    return null;
  }

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (confirmationText !== "DELETE MY ACCOUNT") {
      alert('Please type "DELETE MY ACCOUNT" to confirm.');
      return;
    }
    deleteAccountMutation();
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setConfirmationText("");
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-red-500/50 rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <h3 className="text-lg font-bold text-white">Delete Account</h3>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-gray-300">
              Are you sure you want to permanently delete your account?
            </p>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded p-3">
              <p className="text-sm text-red-400 font-medium mb-2">
                This action will permanently delete:
              </p>
              <ul className="text-sm text-red-400 space-y-1 ml-4">
                <li>• All your posts and their comments</li>
                <li>• All your comments on other posts</li>
                <li>• All communities you created</li>
                <li>• Your user profile and account data</li>
              </ul>
              <p className="text-sm text-red-400 font-medium mt-2">
                This action cannot be undone!
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type "DELETE MY ACCOUNT" to confirm:
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded text-white placeholder-gray-400"
                placeholder="DELETE MY ACCOUNT"
              />
            </div>
          </div>
          
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
              disabled={isPending || confirmationText !== "DELETE MY ACCOUNT"}
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
                  Delete Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-red-500/30">
      <h4 className="text-lg font-medium text-red-400 mb-2 flex items-center gap-2">
        <AlertTriangle size={18} />
        Danger Zone
      </h4>
      <p className="text-sm text-gray-400 mb-4">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-black rounded hover:text-white transition-colors"
      >
        <Trash2 size={16} />
        Delete My Account
      </button>
    </div>
  );
};