import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client";
import { Link } from "react-router";

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
    const { data, error, isLoading } = useQuery<Community[], Error>({
        queryKey: ["communities"], 
        queryFn: fetchCommunities
    })

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

    return ( 
      <div className="max-w-5xl mx-auto space-y-4"> 
        {data?.map((community) => (
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
                                <span>By {community.author}</span>
                            </div>
                            <span>•</span>
                            <span>Created {formatDate(community.created_at)}</span>
                        </div>
                    </div>
                </div>
            </div>
          ))}
        </div>
    )
}