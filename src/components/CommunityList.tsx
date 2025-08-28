import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

export interface Community {
    id: number;
    name: string;
    description: string;
    author: string;
    avatar_url: string;
    icon_url?: string;
    created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
    const {data, error} = await supabase
      .from("communities")
      .select("*")
      .order("created_at", {ascending: false})

    if (error) throw new Error(error.message)
    return data as Community[]
}

export const CommunityList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    
    const { data, error, isLoading } = useQuery<Community[], Error>({
        queryKey: ["communities"], 
        queryFn: fetchCommunities
    })

    // Filter communities based on search query
    const filteredCommunities = useMemo(() => {
        if (!data) return [];
        if (!searchQuery.trim()) return data;
        
        const query = searchQuery.toLowerCase().trim();
        return data.filter(community => {
            const name = community.name?.toLowerCase() || '';
            const description = community.description?.toLowerCase() || '';
            const author = community.author?.toLowerCase() || '';
            
            return name.includes(query) ||
                   description.includes(query) ||
                   author.includes(query);
        });
    }, [data, searchQuery]);

    if (isLoading) {
        return <div className="text-center py-4"> Loading communities... </div>
    }

    if (error) {
        return ( 
          <div className="text-center text-red-500 py-4"> 
            Error: {error.message} 
        </div>
      )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const communitiesToShow = searchQuery.trim() ? filteredCommunities : (data || []);

    return ( 
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search communities by name, description, or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300/50 focus:ring-1 focus:ring-yellow-300/25 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Search Results Info */}
            {searchQuery.trim() && (
                <div className="text-center text-gray-400">
                    {filteredCommunities.length === 0 ? (
                        <p>No communities found matching "{searchQuery}"</p>
                    ) : (
                        <p>
                            Found {filteredCommunities.length} communit{filteredCommunities.length === 1 ? 'y' : 'ies'} 
                            {data && filteredCommunities.length < data.length && ` of ${data.length} total`}
                        </p>
                    )}
                </div>
            )}

            {/* Communities List */}
            <div className="space-y-4">
                {communitiesToShow.map((community) => (
                    <div
                     key={community.id}
                     className="border border-white/10 p-6 rounded-lg hover:-translate-y-1 transition transform bg-gray-900/30"
                    >
                        <div className="flex items-start gap-4">
                            {/* Community Icon */}
                            <div className="flex-shrink-0">
                                {community.icon_url ? (
                                    <img 
                                        src={community.icon_url} 
                                        alt={`${community.name} icon`}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white/10" 
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-xl font-bold text-black">
                                        {community.name[0]}
                                    </div>
                                )}
                            </div>

                            {/* Community Details */}
                            <div className="flex-1">
                                <Link 
                                    to={`/community/${community.id}`}
                                    className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors"
                                >
                                    {community.name}
                                </Link>
                                <p className="text-gray-300 mt-2 mb-3 leading-relaxed"> 
                                    {community.description} 
                                </p>
                                
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        {community.avatar_url ? (
                                            <img 
                                                src={community.avatar_url} 
                                                alt={`${community.author} avatar`}
                                                className="w-5 h-5 rounded-full object-cover" 
                                            />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-tl from-[#8A2BE2] to-[#491F70]" />
                                        )}
                                        <span>
                                            Created by: {" "}
                                            <Link
                                                to={`/user/${community.author}`}
                                                className="text-blue-400 hover:underline"
                                            >
                                                {community.author}
                                            </Link>
                                        </span>
                                    </div>
                                    <span>•</span>
                                    <span>Created {formatDate(community.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {communitiesToShow.length === 0 && !searchQuery.trim() && (
                <div className="text-center text-gray-400 py-12">
                    <div className="text-6xl mb-4">🏘️</div>
                    <p className="text-lg mb-2">No communities yet.</p>
                    <p>Be the first to create one!</p>
                </div>
            )}
        </div>
    )
}