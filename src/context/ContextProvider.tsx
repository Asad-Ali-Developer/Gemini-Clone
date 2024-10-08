import React, { useState, ReactNode } from 'react';
import Context, { ContextType } from './Context';
import { run } from '../config/gemini-api';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

interface ProviderProps {
    children: ReactNode;
}

const md = new MarkdownIt({
    html: true,  // Enable HTML tags
    linkify: true,  // Automatically convert URLs into links
    typographer: true  // Enable some typographic replacements
});

const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],  // Customize as needed
        ALLOWED_ATTR: ['href']  // Customize as needed
    });
};

const ContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [input, setInput] = useState<string>('');
    const [recentPrompt, setRecentPrompt] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string | null>(null);
    const [previousPrompt, setPreviousPrompt] = useState<string[]>([]);

    const formatResult = (result: string): string => {
        // Convert Markdown to HTML
        const html = md.render(result);
        // Sanitize HTML
        return sanitizeHtml(html);
    };

    const onSent = async (prompt: string) => {
        console.log("Prompt sent:", prompt);
        setLoading(true);

        try {
            const result = await run(prompt);
            console.log("Result received:", result);

            if (result) {
                setResultData(formatResult(result));
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
