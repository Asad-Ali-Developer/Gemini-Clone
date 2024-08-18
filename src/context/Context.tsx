import { createContext } from 'react';

// Define the shape of the context value
export interface ContextType {
    onSent: (prompt: string) => Promise<void>; // Ensure `onSent` returns a Promise
    previousPrompt: string[];
    setPreviousPrompt: React.Dispatch<React.SetStateAction<string[]>>;
    recentPrompt: string;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    showResults: boolean;
    loading: boolean;
    resultData: any | null;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an initial value or allow it to be undefined
const Context = createContext<ContextType | undefined>(undefined);

export default Context;
