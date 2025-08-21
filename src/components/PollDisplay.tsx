import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase-client';
import type { PollResponse, Post } from './PostList';

interface Props {
    post: Post;
}

const submitPollVote = async (
    postId: number,
    userId: string,
    selectedOptions: string[]
) => {
    const { error } = await supabase
        .from('poll_responses')
        .insert({
            post_id: postId,
            user_id: userId,
            selected_options: selectedOptions
        });

    if (error) throw new Error(error.message);
};

const fetchPollResponse = async (postId: number, userId: string): Promise<PollResponse | null> => {
    const { data, error } = await supabase
        .from('poll_responses')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
};

const fetchPollStats = async (postId: number): Promise<{ [key: string]: number }> => {
    const { data, error } = await supabase
        .from('poll_responses')
        .select('selected_options')
        .eq('post_id', postId);

    if (error) throw new Error(error.message);

    const stats: { [key: string]: number } = {};
    data.forEach(response => {
        response.selected_options.forEach((optionId: string) => {
            stats[optionId] = (stats[optionId] || 0) + 1;
        });
    });

    return stats;
};

export const PollDisplay = ({ post }: Props) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const { data: existingResponse } = useQuery({
        queryKey: ['poll-response', post.id, user?.id],
        queryFn: () => fetchPollResponse(post.id, user!.id),
        enabled: !!user
    });

    const { data: pollStats } = useQuery({
        queryKey: ['poll-stats', post.id],
        queryFn: () => fetchPollStats(post.id)
    });

    const { mutate: submitVote, isPending } = useMutation({
        mutationFn: (selectedOptions: string[]) =>
            submitPollVote(post.id, user!.id, selectedOptions),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['poll-response', post.id, user?.id] });
            queryClient.invalidateQueries({ queryKey: ['poll-stats', post.id] });
        }
    });

    if (!post.poll_data) return null;

    const isExpired = post.poll_data.expires_at && new Date(post.poll_data.expires_at) < new Date();
    const canVote = user && !existingResponse && !isExpired;
    const totalVotes = Object.values(pollStats || {}).reduce((sum, count) => sum + count, 0);

    const handleOptionToggle = (optionId: string) => {
        if (!canVote) return;

        if (post.poll_data!.multiple_choice) {
            setSelectedOptions(prev =>
                prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
            );
        } else {
            setSelectedOptions([optionId]);
        }
    };

    const handleSubmit = () => {
        if (!canVote || selectedOptions.length === 0) return;
        submitVote(selectedOptions);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">{post.poll_data.question}</h3>
            
            {isExpired && (
                <div className="bg-red-900/20 border border-red-500/30 p-2 rounded text-red-400 text-sm">
                    This poll has expired
                </div>
            )}

            <div className="space-y-2">
                {post.poll_data.options.map((option) => {
                    const votes = pollStats?.[option.id] || 0;
                    const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                    const isSelected = selectedOptions.includes(option.id);
                    const hasVoted = !!existingResponse;

                    return (
                        <div
                            key={option.id}
                            className={`relative p-3 rounded border cursor-pointer transition-all ${
                                canVote
                                    ? isSelected
                                        ? 'bg-blue-900/30 border-blue-500'
                                        : 'border-white/10 hover:border-white/20'
                                    : 'cursor-default border-white/10'
                            }`}
                            onClick={() => handleOptionToggle(option.id)}
                        >
                            {hasVoted && (
                                <div
                                    className="absolute inset-0 bg-blue-500/20 rounded"
                                    style={{ width: `${percentage}%` }}
                                />
                            )}
                            
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type={post.poll_data?.multiple_choice ? 'checkbox' : 'radio'}
                                        checked={isSelected || (hasVoted && existingResponse?.selected_options.includes(option.id))}
                                        onChange={() => {}}
                                        disabled={!canVote}
                                        className="text-blue-500"
                                    />
                                    <span>{option.text}</span>
                                </div>
                                
                                {hasVoted && (
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <span>{votes} votes</span>
                                        <span>({percentage}%)</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {canVote && (
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOptions.length === 0 || isPending}
                        className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Voting...' : 'Submit Vote'}
                    </button>
                </div>
            )}

            {existingResponse && (
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded text-center">
                    <p className="text-green-400">✓ You have voted on this poll</p>
                    {totalVotes > 0 && (
                        <p className="text-sm text-gray-400 mt-1">Total votes: {totalVotes}</p>
                    )}
                </div>
            )}

            {post.poll_data.expires_at && !isExpired && (
                <div className="text-sm text-gray-400 text-center">
                    Expires: {new Date(post.poll_data.expires_at).toLocaleString()}
                </div>
            )}
        </div>
    );
};