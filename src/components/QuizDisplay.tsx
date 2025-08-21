import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase-client';
import type { Post, QuizResponse } from './PostList';

interface Props {
    post: Post;
}

const submitQuizResponse = async (
    postId: number,
    userId: string,
    answers: number[],
    score: number
) => {
    const { error } = await supabase
        .from('quiz_responses')
        .insert({
            post_id: postId,
            user_id: userId,
            answers,
            score
        });

    if (error) throw new Error(error.message);
};

const fetchQuizResponse = async (postId: number, userId: string): Promise<QuizResponse | null> => {
    const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .maybeSingle();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
};

export const QuizDisplay = ({ post }: Props) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const { data: existingResponse } = useQuery({
        queryKey: ['quiz-response', post.id, user?.id],
        queryFn: () => fetchQuizResponse(post.id, user!.id),
        enabled: !!user
    });

    const { mutate: submitQuiz, isPending } = useMutation({
        mutationFn: (data: { answers: number[]; score: number }) =>
            submitQuizResponse(post.id, user!.id, data.answers, data.score),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quiz-response', post.id, user?.id] });
            if (post.quiz_data?.show_results) {
                setShowResults(true);
            }
        }
    });

    if (!post.quiz_data) return null;

    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...currentAnswers];
        newAnswers[questionIndex] = answerIndex;
        setCurrentAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!user || currentAnswers.length !== post.quiz_data!.questions.length) return;

        const calculatedScore = post.quiz_data!.questions.reduce((score, question, index) => {
            return score + (question.correct_answer === currentAnswers[index] ? 1 : 0);
        }, 0);

        const percentageScore = Math.round((calculatedScore / post.quiz_data!.questions.length) * 100);
        setScore(percentageScore);
        submitQuiz({ answers: currentAnswers, score: percentageScore });
    };

    const canTakeQuiz = !existingResponse || post.quiz_data.allow_retake;
    const hasCompleted = existingResponse && !showResults;

    if (hasCompleted && !post.quiz_data.show_results) {
        return (
            <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-green-400">✓ Quiz completed! Score: {existingResponse.score}%</p>
                {post.quiz_data.allow_retake && (
                    <button
                        onClick={() => {
                            setCurrentAnswers([]);
                            setShowResults(false);
                            setScore(null);
                        }}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                        Retake Quiz
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {post.quiz_data.questions.map((question, questionIndex) => (
                <div key={question.id} className="border border-white/10 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">{questionIndex + 1}. {question.question}</h4>
                    
                    <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                            const isSelected = currentAnswers[questionIndex] === optionIndex;
                            const isCorrect = question.correct_answer === optionIndex;
                            const showAnswer = showResults || (existingResponse && post.quiz_data!.show_results);
                            
                            return (
                                <div
                                    key={optionIndex}
                                    className={`p-2 rounded border cursor-pointer transition-colors ${
                                        showAnswer
                                            ? isCorrect
                                                ? 'bg-green-900/30 border-green-500'
                                                : isSelected
                                                    ? 'bg-red-900/30 border-red-500'
                                                    : 'border-white/10'
                                            : isSelected
                                                ? 'bg-blue-900/30 border-blue-500'
                                                : 'border-white/10 hover:border-white/20'
                                    }`}
                                    onClick={() => canTakeQuiz && !showResults && handleAnswerChange(questionIndex, optionIndex)}
                                >
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`question-${questionIndex}`}
                                            checked={isSelected}
                                            onChange={() => {}}
                                            disabled={!canTakeQuiz || showResults}
                                            className="text-blue-500"
                                        />
                                        <span>{option}</span>
                                        {showAnswer && isCorrect && <span className="text-green-400 ml-auto">✓</span>}
                                    </label>
                                </div>
                            );
                        })}
                    </div>

                    {showResults && question.explanation && (
                        <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
                            <p className="text-sm text-blue-300">
                                <strong>Explanation:</strong> {question.explanation}
                            </p>
                        </div>
                    )}
                </div>
            ))}

            {canTakeQuiz && !showResults && (
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={currentAnswers.length !== post.quiz_data.questions.length || isPending}
                        className="bg-yellow-300 text-black px-6 py-2 rounded font-medium hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                </div>
            )}

            {showResults && score !== null && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-yellow-400">Your Score: {score}%</h3>
                    <p className="text-gray-300 mt-2">
                        You got {post.quiz_data.questions.filter((q, i) => q.correct_answer === currentAnswers[i]).length} out of {post.quiz_data.questions.length} correct!
                    </p>
                </div>
            )}
        </div>
    );
};