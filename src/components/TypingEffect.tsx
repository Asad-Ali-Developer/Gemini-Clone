import React, { useState, ReactNode } from 'react';
import Context, { ContextType } from '../context/Context';
import { run } from '../config/gemini-api';
import DOMPurify from 'dompurify';

interface ProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [input, setInput] = useState<string>('');
    const [recentPrompt, setRecentPrompt] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string | null>(null);
    const [previousPrompt, setPreviousPrompt] = useState<string[]>([]);

    // Format the result using HTML and sanitize it
    const formatResult = (result: string): string => {
        const resultArray = result.split("**");
        return resultArray.map((segment, index) => 
            index % 2 === 0
                ? `<b>${segment}</b>`
                : `<p>${segment}</p>`
        ).join('');
    };

    const onSent = async (prompt: string) => {
        console.log("Prompt sent:", prompt);
        setLoading(true);

        try {
            const result = await run(prompt);
            console.log("Result received:", result);

            if (result) {
                // Sanitize the result before setting it
                const sanitizedResult = DOMPurify.sanitize(formatResult(result));
                setResultData(sanitizedResult);
                setShowResults(true);
                setRecentPrompt(prompt);
                setInput('');
            } else {
                setResultData("No result returned from API");
            }
        } catch (error) {
            console.error("Error during API call:", error);
            setResultData("An error occurred while fetching the result");
        } finally {
            setLoading(false);
        }
    };

    const contextValue: ContextType = {
        onSent,
        previousPrompt,
        setPreviousPrompt,
        recentPrompt,
        setRecentPrompt,
        showResults,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
