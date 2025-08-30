import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import { User, Settings, Upload, Trash2, Save, X } from "lucide-react";

interface UserProfile {
  user_name: string;
  avatar_url: string | null;
  bio: string | null;
}

export const UserSettings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile>({
    user_name: "",
    avatar_url: null,
    bio: null
  });
  
  const [originalProfile, setOriginalProfile] = useState<UserProfile>({
    user_name: "",
    avatar_url: null,
    bio: null
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load user profile on mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        console.log("No user found, redirecting to login");
        navigate("/login");
        return;
      }

      console.log("Loading profile for user:", user);

      try {
        // Get user info from auth metadata and posts
        const { data: postsData } = await supabase
          .from("posts")
          .select("author, avatar_url")
          .eq("author_id", user.id)
          .order("created_at", { ascending: true })
          .limit(1);

        let userProfile: UserProfile;

        if (postsData && postsData.length > 0) {
          // Use data from posts
          userProfile = {
            user_name: postsData[0].author,
            avatar_url: postsData[0].avatar_url,
            bio: user.user_metadata?.bio || null
          };
        } else {
          // New user with no posts yet - use auth metadata
          userProfile = {
            user_name: user.user_metadata?.user_name || user.user_metadata?.full_name || user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
            avatar_url: user.user_metadata?.avatar_url || null,
            bio: user.user_metadata?.bio || null
          };
        }

        console.log("Setting profile:", userProfile);
        setProfile(userProfile);
        setOriginalProfile(userProfile);
        setAvatarPreview(userProfile.avatar_url);
      } catch (error) {
        console.error("Error loading profile:", error);
        setErrorMsg("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user, navigate]);

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("Avatar must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrorMsg("Please select an image file");
        return;
      }
      
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setErrorMsg(null);
    }
  };

  // Upload avatar to storage
  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Save profile changes
  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let newAvatarUrl = profile.avatar_url;

      // Upload new avatar if one was selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(avatarFile);
        if (!uploadedUrl) {
          setErrorMsg("Failed to upload avatar");
          setIsSaving(false);
          return;
        }
        newAvatarUrl = uploadedUrl;
      }

      const updatedProfile = {
        ...profile,
        avatar_url: newAvatarUrl
      };

      // Update user metadata in auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          user_name: updatedProfile.user_name,
          avatar_url: updatedProfile.avatar_url,
          bio: updatedProfile.bio
        }
      });

      if (authError) throw authError;

      // Update all posts by this user to reflect new username/avatar
      const { error: postsError } = await supabase
        .from("posts")
        .update({
          author: updatedProfile.user_name,
          avatar_url: updatedProfile.avatar_url
        })
        .eq("author_id", user.id);

      if (postsError) {
        console.warn("Failed to update posts:", postsError);
      }

      // Update comments as well
      const { error: commentsError } = await supabase
        .from("comments")
        .update({
          author: updatedProfile.user_name,
          avatar_url: updatedProfile.avatar_url
        })
        .eq("author_id", user.id);

      if (commentsError) {
        console.warn("Failed to update comments:", commentsError);
      }

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      setAvatarFile(null);
      setSuccessMsg("Profile updated successfully!");
      
      // Navigate to updated user page
      setTimeout(() => {
        navigate(`/user/${updatedProfile.user_name}`);
      }, 1500);

    } catch (error) {
      console.error("Error saving profile:", error);
      setErrorMsg("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!user || deleteConfirmText !== "DELETE") {
      setErrorMsg("Please type 'DELETE' to confirm");
      return;
    }

    try {
      // Delete user's posts
      await supabase.from("posts").delete().eq("author_id", user.id);
      
      // Delete user's comments
      await supabase.from("comments").delete().eq("author_id", user.id);

      // Delete the auth user account
      const { error } = await supabase.rpc('delete_user');
      if (error) {
        console.warn("Could not delete auth user:", error);
        // If the RPC function doesn't exist, just sign out
        await signOut();
      } else {
        await signOut();
      }

      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMsg("Failed to delete account");
    }
  };

  // Check if there are unsaved changes
  const hasChanges = () => {
    return (
      profile.user_name !== originalProfile.user_name ||
      profile.bio !== originalProfile.bio ||
      avatarFile !== null
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-yellow-300 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Please log in to access settings</p>
        <button 
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-400 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Settings className="text-yellow-300" size={32} />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent">
            Account Settings
          </h2>
        </div>
        <p className="text-gray-400">Manage your profile and account preferences</p>
      </div>

      {/* Settings Form */}
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
        {/* Avatar Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <User size={20} />
            Avatar
          </h3>
          
          <div className="flex items-start gap-6">
            {/* Current Avatar */}
            <div className="flex-shrink-0">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-yellow-300/30" 
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-2xl font-bold text-black">
                  {profile.user_name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> new avatar
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Username</h3>
          <input
            type="text"
            value={profile.user_name}
            onChange={(e) => setProfile({ ...profile, user_name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300/50 focus:ring-1 focus:ring-yellow-300/25 transition-all"
            placeholder="Enter your username"
          />
        </div>

        {/* Bio Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Bio</h3>
          <textarea
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300/50 focus:ring-1 focus:ring-yellow-300/25 transition-all resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm">{successMsg}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges() || isSaving || isUploading}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSaving ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>

          <button
            onClick={() => navigate(`/user/${profile.user_name}`)}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
          <Trash2 size={20} />
          Danger Zone
        </h3>
        
        <p className="text-gray-300 text-sm">
          Once you delete your account, there is no going back. This will permanently delete your profile, posts, and comments.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-4 p-4 bg-red-900/30 rounded-lg">
            <p className="text-red-300 font-medium">
              Are you absolutely sure? Type "DELETE" to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-red-500/50 rounded text-white focus:outline-none focus:border-red-400"
              placeholder="Type DELETE here"
            />
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE"}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText("");
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};