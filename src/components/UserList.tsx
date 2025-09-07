import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

export interface User {
    user_name: string;
    avatar_url: string;
    bio?: string;
    created_at: string;
    post_count: number;
    latest_post_date?: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    // Get all unique users from posts table with their post counts and latest activity
    const { data: usersData, error } = await supabase
        .from("posts")
        .select("author, avatar_url, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    // Group by user and calculate stats
    const userMap = new Map<string, User>();
    
    usersData?.forEach(post => {
        const username = post.author;
        if (userMap.has(username)) {
            const user = userMap.get(username)!;
            user.post_count += 1;
            // Update latest post date if this post is newer
            if (new Date(post.created_at) > new Date(user.latest_post_date || '1970-01-01')) {
                user.latest_post_date = post.created_at;
            }
        } else {
            userMap.set(username, {
                user_name: username,
                avatar_url: post.avatar_url || "",
                bio: "", // We don't have bio in posts table
                created_at: post.created_at, // First post date
                post_count: 1,
                latest_post_date: post.created_at
            });
        }
    });

    // Convert map to array and sort by post count (most active first)
    return Array.from(userMap.values()).sort((a, b) => b.post_count - a.post_count);
};

export const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data, error, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"], 
    queryFn: fetchUsers
  });

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase().trim();
    return data.filter(user => user.user_name?.toLowerCase().includes(query));
  }, [data, searchQuery]);

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

  const getActivityStatus = (latestPostDate?: string) => {
    if (!latestPostDate) return "No recent activity";
    const daysSincePost = Math.floor(
      (Date.now() - new Date(latestPostDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSincePost === 0) return "Active today";
    if (daysSincePost === 1) return "Active yesterday";
    if (daysSincePost < 7) return `Active ${daysSincePost} days ago`;
    if (daysSincePost < 30) return `Active ${Math.floor(daysSincePost / 7)} weeks ago`;
    return `Active ${Math.floor(daysSincePost / 30)} months ago`;
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-2 sm:px-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 sm:py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300/50 focus:ring-1 focus:ring-yellow-300/25 transition-all text-sm sm:text-base"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery.trim() && (
        <div className="text-center text-gray-400 text-sm sm:text-base">
          {filteredUsers.length === 0 ? (
            <p>No users found matching "{searchQuery}"</p>
          ) : (
            <p>
              Found {filteredUsers.length} user{filteredUsers.length === 1 ? "" : "s"}{" "}
              {data && filteredUsers.length < data.length && ` of ${data.length} total`}
            </p>
          )}
        </div>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.user_name}
            className="border border-white/10 p-4 sm:p-6 rounded-lg hover:-translate-y-1 transition transform bg-gray-900/30"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={`${user.user_name} avatar`}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-lg sm:text-xl font-bold text-black">
                    {user.user_name[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1 text-center sm:text-left">
                <Link
                  to={`/user/${user.user_name}`}
                  className="block text-lg sm:text-2xl font-bold text-white hover:text-yellow-300 transition-colors mb-2"
                >
                  {user.user_name}
                </Link>

                {user.bio && (
                  <p className="text-gray-300 text-sm sm:text-base mt-1 mb-3 leading-relaxed">
                    {user.bio}
                  </p>
                )}

                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 text-xs sm:text-sm text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-yellow-300">{user.post_count}</span>
                    <span>{user.post_count === 1 ? "post" : "posts"}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>{getActivityStatus(user.latest_post_date)}</span>
                </div>

                <div className="text-xs sm:text-sm text-gray-400">
                  <span>First post: {formatDate(user.created_at)}</span>
                </div>
              </div>

              {/* Activity Indicator */}
              <div className="flex-shrink-0 mt-2 sm:mt-0">
                <div
                  className={`w-3 h-3 rounded-full ${
                    user.latest_post_date &&
                    Date.now() - new Date(user.latest_post_date).getTime() <
                      7 * 24 * 60 * 60 * 1000
                      ? "bg-green-400"
                      : "bg-gray-600"
                  }`}
                  title={
                    user.latest_post_date &&
                    Date.now() - new Date(user.latest_post_date).getTime() <
                      7 * 24 * 60 * 60 * 1000
                      ? "Active this week"
                      : "Inactive"
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && !searchQuery.trim() && (
        <div className="text-center text-gray-400 py-12">
          <div className="text-5xl sm:text-6xl mb-4">👥</div>
          <p className="text-base sm:text-lg mb-2">No users found.</p>
        </div>
      )}
    </div>
  );
};