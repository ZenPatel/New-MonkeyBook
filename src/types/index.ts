export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    image_url: string;
    avatar_url: string;
    like_count?: number;
    comment_count?: number;
    community_id?: number | null;
    post_type: 'regular' | 'quiz' | 'poll';
    quiz_data?: QuizData | null;
    poll_data?: PollData | null;
}

export interface QuizData {
    questions: QuizQuestion[];
    allow_retake: boolean;
    show_results: boolean;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation?: string;
}

export interface PollData {
    question: string;
    options: PollOption[];
    multiple_choice: boolean;
    expires_at?: string;
}

export interface PollOption {
    id: string;
    text: string;
    votes: number;
}

export interface QuizResponse {
    id: number;
    post_id: number;
    user_id: string;
    answers: number[];
    score: number;
    completed_at: string;
}

export interface PollResponse {
    id: number;
    post_id: number;
    user_id: string;
    selected_options: string[];
    created_at: string;
}

export interface Community {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    parent_comment_id: number | null;
    content: string;
    user_id: string;
    created_at: string;
    author: string;
}

// API Response types
export interface QuizStats {
    total_attempts: number;
    average_score: number;
    completion_rate: number;
}

export interface PollResults {
    option_id: string;
    vote_count: number;
}