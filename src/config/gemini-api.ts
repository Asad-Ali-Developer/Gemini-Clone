import {
    GoogleGenerativeAI,
    GenerativeModel,
    ChatSession,
} from "@google/generative-ai";

// API key and model setup
const apiKey = 'AIzaSyAw_pXzgpDkyZOFjjQMkC7rn2dwmOHlJl8';
const genAI = new GoogleGenerativeAI(apiKey);

const model: GenerativeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Function to run the generative model
export async function run(prompt: string): Promise<string | undefined> {
    try {
        const chatSession: ChatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        // Ensure result.response exists and has the expected properties
        if (result.response) {
            const responseText = result.response.text;

            return responseText();
            
        } else {
            console.warn("Response is undefined");
            return undefined;
        }
    } catch (error) {
        console.error("Error in run function:", error);
        return undefined;
    }
}
