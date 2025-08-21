import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";

interface CommunityInput {
    name: string;
    description: string;
}

const createCommunity = async (community: CommunityInput) => {
    const {data, error} = await supabase.from("communities").insert(community)
    
    if (error) throw new Error(error.message)
    return data
}

export const CreateCommunity = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: createCommunity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] })
            navigate("/communities")
        }
  })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate({ name, description })
    }
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
      <button
        type="submit"
        className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors"
      > {isPending ? "Creating..." : "Create Community"} </button>

      {isError && <p> Error creating community. </p>}
    </form>
  )
}
