import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/email.png";
import person from "../assets/person.png";
import passwordIcon from "../assets/password.png";
import github from "../assets/github.png";
import google from "../assets/google.png";
import discord from "../assets/discord.png";

export const Login = () => {
  const [action, setAction] = useState<"Login" | "Sign Up">("Login");
  const [resetMode, setResetMode] = useState(false); // 👈 Forgot password mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const {
    signInWithGitHub,
    signInWithGoogle,
    signInWithDiscord,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();

  // ---------------- File Upload ----------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("Profile picture must be less than 5MB");
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

  // ---------------- Auth ----------------
  const handleAuth = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password || (action === "Sign Up" && (!user_name || !avatarFile))) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (action === "Login") {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMsg(error.message);
      } else {
        navigate("/")
      }
    } else {
      let avatar_url = null;

      if (avatarFile) {
        avatar_url = await uploadAvatar(avatarFile);
        if (!avatar_url) {
          setErrorMsg("Failed to upload profile picture. Please try again.");
          return;
        }
      }

      const { error } = await signUpWithEmail(
        email,
        password,
        user_name,
        avatar_url || undefined
      );
      if (error) { 
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("User has been created. The confirm link has been sent to your email.")
      }
    }
  };

  // ---------------- Reset Password ----------------
  const handleResetPassword = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, 
    });

    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Password reset email sent! Check your inbox.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 to-pink-700">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-300">
            {resetMode ? "Reset Password" : action}
          </h1>
          <div className="h-1 w-16 bg-yellow-300 mx-auto mt-2 rounded"></div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {!resetMode && action === "Sign Up" && (
            <>
              <div className="flex items-center border rounded px-3 py-2">
                <img src={person} alt="person" className="w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  value={user_name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none bg-transparent text-white"
                />
              </div>

              {/* Avatar Upload */}
              <div className="space-y-3">
                <label className="block text-white text-sm font-medium">
                  Avatar
                </label>
                {avatarPreview && (
                  <div className="flex justify-center">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-yellow-300"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      required={action === "Sign Up"}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="flex items-center border rounded px-3 py-2">
            <img src={emailIcon} alt="email" className="w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent text-white"
            />
          </div>

          {/* Password (hide if resetMode) */}
          {!resetMode && (
            <div className="flex items-center border rounded px-3 py-2">
              <img src={passwordIcon} alt="password" className="w-5 h-5 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-white"
              />
            </div>
          )}
        </div>

        {/* Error/success messages */}
        {errorMsg && <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-500 text-sm mt-3 text-center">{successMsg}</p>
        )}

        {/* Forgot Password link */}
        {!resetMode && action === "Login" && (
          <div className="text-sm text-gray-400 mt-4 text-center">
            Forgot Password?{" "}
            <span
              className="text-yellow-300 cursor-pointer"
              onClick={() => setResetMode(true)}
            >
              Click Here!
            </span>
          </div>
        )}

        {/* Reset Password Mode */}
        {resetMode ? (
          <div className="mt-6">
            <button
              onClick={handleResetPassword}
              className="w-full py-2 rounded bg-yellow-300 text-black hover:text-white transition-colors"
            >
              Send Reset Link
            </button>
            <p
              className="text-gray-400 text-sm text-center mt-4 cursor-pointer"
              onClick={() => setResetMode(false)}
            >
              Back to Login
            </p>
          </div>
        ) : (
          <>
            {/* Action toggle */}
            <div className="flex justify-between mt-6">
              <button
                className={`w-full py-2 mr-2 rounded bg-yellow-300 text-black hover:text-white transition-colors ${
                  action === "Sign Up" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setAction("Sign Up")}
                disabled={action === "Sign Up"}
              >
                Sign Up
              </button>
              <button
                className={`w-full py-2 ml-2 rounded bg-yellow-300 text-black hover:text-white transition-colors ${
                  action === "Login" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setAction("Login")}
                disabled={action === "Login"}
              >
                Login
              </button>
            </div>

            {/* Main action button */}
            <div className="mt-6">
              <button
                onClick={handleAuth}
                disabled={isUploading}
                className="w-full py-2 rounded bg-yellow-300 text-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading
                  ? "Uploading..."
                  : action === "Login"
                  ? "Login with Email"
                  : "Sign Up with Email"}
              </button>
            </div>

            {/* OAuth Providers */}
            <div className="mt-4">
              <button
                onClick={signInWithGitHub}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-yellow-300 text-black rounded hover:text-white transition-colors"
              >
                <img src={github} alt="GitHub" className="w-5 h-5" />
                Continue with GitHub
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-yellow-300 text-black rounded hover:text-white transition-colors"
              >
                <img src={google} alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={signInWithDiscord}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-yellow-300 text-black rounded hover:text-white transition-colors"
              >
                <img src={discord} alt="Discord" className="w-5 h-5" />
                Continue with Discord
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
