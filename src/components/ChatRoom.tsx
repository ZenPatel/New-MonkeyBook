import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { Send, Trash2, MessageCircle } from "lucide-react";

interface ChatMessage {
    id: number;
    message: string;
    user_name: string;
    user_id: string;
    avatar_url?: string;
    created_at: string;
}

const fetchMessages = async (): Promise<ChatMessage[]> => {
    const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(100); // Limit to last 100 messages

    if (error) throw new Error(error.message);
    return data as ChatMessage[];
};

const sendMessage = async (messageData: {
    message: string;
    user_name: string;
    user_id: string;
    avatar_url?: string;
}) => {
    const { data, error } = await supabase
        .from("chat_messages")
        .insert(messageData)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

const deleteMessage = async (messageId: number) => {
    const { error } = await supabase
        .from("chat_messages")
        .delete()
        .eq("id", messageId);

    if (error) throw new Error(error.message);
};

export const ChatRoom = () => {
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const { data: messages = [], isLoading } = useQuery<ChatMessage[], Error>({
        queryKey: ["chatMessages"],
        queryFn: fetchMessages,
        refetchInterval: 2000, // Refresh every 2 seconds for real-time feel
    });

    const sendMessageMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
            setNewMessage("");
            setIsTyping(false);
        },
        onError: (error) => {
            console.error("Failed to send message:", error);
        },
    });

    const deleteMessageMutation = useMutation({
        mutationFn: deleteMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
        },
        onError: (error) => {
            console.error("Failed to delete message:", error);
        },
    });

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Set up real-time subscription for new messages
    useEffect(() => {
        const channel = supabase
            .channel("chat_messages")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "chat_messages",
                },
                () => {
                    queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newMessage.trim() || !user) return;

        const messageData = {
            message: newMessage.trim(),
            user_name: user.user_metadata?.user_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
            user_id: user.id,
            avatar_url: user.user_metadata?.avatar_url || "",
        };

        sendMessageMutation.mutate(messageData);
    };

    const handleDeleteMessage = (messageId: number) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            deleteMessageMutation.mutate(messageId);
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateString: string) => {
        const messageDate = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return messageDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    };

    // Group messages by date
    const groupedMessages = messages.reduce((groups, message) => {
        const date = new Date(message.created_at).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as Record<string, ChatMessage[]>);

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8 text-center">
                    <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-white mb-2">Join in on the rap</h3>
                    <p className="text-gray-400 mb-4">
                        Please log in to do brutal rap.
                    </p>
                    <a
                        href="/login"
                        className="inline-block bg-yellow-300 text-black px-6 py-2 rounded hover:text-white transition-colors"
                    >
                        Log In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gray-800/50 border-b border-white/10 p-4">
                    <div className="flex items-center gap-2">
                        <MessageCircle size={24} className="text-yellow-300" />
                        <h3 className="text-xl font-semibold text-white">The Rap Mill</h3>
                        <div className="ml-auto text-sm text-gray-400">
                            {messages.length} raps
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <div className="text-center text-gray-400 py-8">
                            Loading raps...
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                            <p>No raps yet. Be the first to do brutal rap!</p>
                        </div>
                    ) : (
                        Object.entries(groupedMessages).map(([date, dateMessages]) => (
                            <div key={date}>
                                {/* Date Separator */}
                                <div className="text-center text-xs text-gray-500 mb-4">
                                    <span className="bg-gray-800 px-2 py-1 rounded">
                                        {formatDate(dateMessages[0].created_at)}
                                    </span>
                                </div>

                                {/* Messages for this date */}
                                {dateMessages.map((message) => (
                                    <div key={message.id} className="group flex items-start gap-3 mb-3">
                                        {/* User Avatar */}
                                        <div className="flex-shrink-0">
                                            {message.avatar_url ? (
                                                <img
                                                    src={message.avatar_url}
                                                    alt={`${message.user_name} avatar`}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-pink-700 flex items-center justify-center text-sm font-bold text-black">
                                                    {message.user_name[0]?.toUpperCase()}
                                                </div>
                                            )}
                                        </div>

                                        {/* Message Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-medium text-white">
                                                    {message.user_name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatTime(message.created_at)}
                                                </span>
                                            </div>
                                            <div className="text-gray-300 text-sm break-words">
                                                {message.message}
                                            </div>
                                        </div>

                                        {/* Delete Button (only for message author) */}
                                        {user.id === message.user_id && (
                                            <button
                                                onClick={() => handleDeleteMessage(message.id)}
                                                className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1 text-red-400 hover:text-red-300 transition-all"
                                                title="Delete message"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-white/10 p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => {
                                    setNewMessage(e.target.value);
                                    setIsTyping(e.target.value.length > 0);
                                }}
                                placeholder="Type a message..."
                                className="w-full bg-gray-800/50 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-300/50 focus:ring-1 focus:ring-yellow-300/25"
                                maxLength={500}
                                disabled={sendMessageMutation.isPending}
                            />
                            {isTyping && (
                                <div className="absolute -top-6 left-2 text-xs text-gray-500">
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || sendMessageMutation.isPending}
                            className="bg-yellow-300 text-black px-4 py-2 rounded hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Send size={16} />
                            {sendMessageMutation.isPending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                    <div className="text-xs text-gray-500 mt-1">
                        Press Enter to send • Max 500 characters
                    </div>
                </div>
            </div>
        </div>
    );
};