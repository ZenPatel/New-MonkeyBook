import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { QuizData, QuizQuestion } from './PostList';

interface Props {
    onQuizChange: (quizData: QuizData) => void;
}

export const QuizCreator = ({ onQuizChange }: Props) => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([
        {
            id: uuidv4(),
            question: '',
            options: ['', '', '', ''],
            correct_answer: 0,
            explanation: ''
        }
    ]);
    const [allowRetake, setAllowRetake] = useState(true);
    const [showResults, setShowResults] = useState(true);

    const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        setQuestions(newQuestions);
        updateQuizData(newQuestions);
    };

    const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
        updateQuizData(newQuestions);
    };

    const addQuestion = () => {
        const newQuestion: QuizQuestion = {
            id: uuidv4(),
            question: '',
            options: ['', '', '', ''],
            correct_answer: 0,
            explanation: ''
        };
        const newQuestions = [...questions, newQuestion];
        setQuestions(newQuestions);
        updateQuizData(newQuestions);
    };

    const removeQuestion = (index: number) => {
        if (questions.length > 1) {
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
            updateQuizData(newQuestions);
        }
    };

    const updateQuizData = (updatedQuestions: QuizQuestion[]) => {
        onQuizChange({
            questions: updatedQuestions,
            allow_retake: allowRetake,
            show_results: showResults
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={showResults}
                        onChange={(e) => {
                            setShowResults(e.target.checked);
                            updateQuizData(questions);
                        }}
                        className="rounded"
                    />
                    <span className="text-sm">Show results after completion</span>
                </label>
            </div>

            {questions.map((question, questionIndex) => (
                <div key={question.id} className="border border-white/10 p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                        <h4 className="text-lg font-semibold">Question {questionIndex + 1}</h4>
                        {questions.length > 1 && (
                            <button
                                onClick={() => removeQuestion(questionIndex)}
                                className="text-red-500 hover:text-red-400 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Enter your question"
                        value={question.question}
                        onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                        className="w-full border border-white/10 bg-transparent p-2 rounded"
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Answer Options:</label>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={`correct-${questionIndex}`}
                                    checked={question.correct_answer === optionIndex}
                                    onChange={() => updateQuestion(questionIndex, 'correct_answer', optionIndex)}
                                    className="text-green-500"
                                />
                                <input
                                    type="text"
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                                    className="flex-1 border border-white/10 bg-transparent p-2 rounded"
                                />
                            </div>
                        ))}
                    </div>

                    <textarea
                        placeholder="Explanation (optional)"
                        value={question.explanation || ''}
                        onChange={(e) => updateQuestion(questionIndex, 'explanation', e.target.value)}
                        className="w-full border border-white/10 bg-transparent p-2 rounded"
                        rows={2}
                    />
                </div>
            ))}

            <button
                onClick={addQuestion}
                className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors"
            >
                Add Question
            </button>
        </div>
    );
};