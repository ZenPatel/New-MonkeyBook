import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";

interface CommunityInput {
    name: string;
    description: string;
    author: string;
    avatar_url: string;
    icon_url?: string;
}

const uploadCommunityIcon = async (iconFile: File, communityName: string): Promise<string> => {
    const iconPath = `${communityName}-${Date.now()}-${iconFile.name}`;
    
    const { error: uploadError } = await supabase.storage
        .from("community-icons")
        .upload(iconPath, iconFile);

    if (uploadError) throw new Error(`Failed to upload community icon: ${uploadError.message}`);

    const { data: publicURLData } = supabase.storage
        .from("community-icons")
        .getPublicUrl(iconPath);

    return publicURLData.publicUrl;
};

const createCommunity = async (community: CommunityInput, iconFile: File | null) => {
    let iconUrl = null;
    
    if (iconFile) {
        iconUrl = await uploadCommunityIcon(iconFile, community.name);
    }

    const { data, error } = await supabase.from("communities").insert({
        ...community,
        icon_url: iconUrl
    });
    
    if (error) throw new Error(error.message);
    return data;
};

export const CreateCommunity = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: ({ community, iconFile }: { community: CommunityInput, iconFile: File | null }) => 
            createCommunity(community, iconFile),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] });
            navigate("/communities");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ 
            community: { 
                name, 
                description,
                author: user?.user_metadata.user_name || "Anonymous",
                avatar_url: user?.user_metadata.avatar_url || ""
            }, 
            iconFile: selectedIcon 
        });
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedIcon(e.target.files[0]);
        }
    };

    return ( 
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4"> 
            <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1"> 
                Create New Community 
            </h2>
            
            <div>
                <label htmlFor="name" className="block mb-2 font-medium"> 
                    Community Name 
                </label>
                <input 
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-white/10 bg-transparent p-2 rounded"
                    required 
                />
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 font-medium"> 
                    Description 
                </label>
                <textarea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-white/10 bg-transparent p-2 rounded"
                    rows={3}
                    required 
                />
            </div>

            <div>
                <label htmlFor="icon" className="block mb-2 font-medium">
                    Community Icon
                </label>
                <div className="text-sm text-gray-400 mb-2">
                    Upload an image to represent your community 
                </div>
                <input
                    type="file"
                    id="icon"
                    accept="image/*"
                    onChange={handleIconChange}
                    className="w-full text-gray-200"
                    required
                />
                {selectedIcon && (
                    <div className="mt-2 p-2 bg-gray-800 rounded border border-white/10">
                        <p className="text-sm text-green-400">✓ Icon selected: {selectedIcon.name}</p>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            > 
                {isPending ? "Creating..." : "Create Community"} 
            </button>

            {isError && <p className="text-red-500"> Error creating community. </p>}
        </form>
    );
};