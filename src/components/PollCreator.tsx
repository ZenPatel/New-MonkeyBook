import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { PollData, PollOption } from './PostList';

interface Props {
    onPollChange: (pollData: PollData) => void;
}

export const PollCreator = ({ onPollChange }: Props) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<PollOption[]>([
        { id: uuidv4(), text: '', votes: 0 },
        { id: uuidv4(), text: '', votes: 0 }
    ]);
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [expiresAt, setExpiresAt] = useState('');

    const updateOption = (index: number, text: string) => {
        const newOptions = [...options];
        newOptions[index].text = text;
        setOptions(newOptions);
        updatePollData();
    };

    const addOption = () => {
        const newOptions = [...options, { id: uuidv4(), text: '', votes: 0 }];
        setOptions(newOptions);
        updatePollData();
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
            updatePollData();
        }
    };

    const updatePollData = () => {
        onPollChange({
            question,
            options,
            multiple_choice: multipleChoice,
            expires_at: expiresAt || undefined
        });
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={question}
                onChange={(e) => {
                    setQuestion(e.target.value);
                    updatePollData();
                }}
                className="w-full border border-white/10 bg-transparent p-2 rounded"
            />

            <div className="space-y-2">
                <label className="text-sm font-medium">Options:</label>
                {options.map((option, index) => (
                    <div key={option.id} className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option.text}
                            onChange={(e) => updateOption(index, e.target.value)}
                            className="flex-1 border border-white/10 bg-transparent p-2 rounded"
                        />
                        {options.length > 2 && (
                            <button
                                onClick={() => removeOption(index)}
                                className="text-red-500 hover:text-red-400 px-2"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={addOption}
                className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors"
            >
                Add Option
            </button>

            <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={multipleChoice}
                        onChange={(e) => {
                            setMultipleChoice(e.target.checked);
                            updatePollData();
                        }}
                        className="rounded"
                    />
                    <span className="text-sm">Allow multiple selections</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Expires at (optional):</label>
                <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => {
                        setExpiresAt(e.target.value);
                        updatePollData();
                    }}
                    className="border border-white/10 bg-transparent p-2 rounded"
                />
            </div>
        </div>
    );
};