import { useState } from "react";
import { supabase } from "../supabase-client";

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdatePassword = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) setErrorMsg(error.message);
    else setSuccessMsg("Password updated! You can now log in.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 to-pink-700">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4">Set New Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-transparent text-white"
        />
        {errorMsg && <p className="text-red-500 mt-3">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 mt-3">{successMsg}</p>}
        <button
          onClick={handleUpdatePassword}
          className="mt-4 w-full py-2 bg-yellow-300 text-black rounded hover:text-white"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};
