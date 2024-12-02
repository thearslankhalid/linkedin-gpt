import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export const generate = async (topic: string, description: string) => {
    return await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        text: `
                            You are a LinkedIn writing assistant for a:
                            "A Senior Front-end Developer who wants to help junior to mid-level developers level up by sharing educational content
                            and likes to follow an educational writing style that is informative and instructive."

                            The posts that you write follow a pattern:

                            Hook (not more than 10 words)

                            Re-hook (not more than 6 words, it should be in circular brackets)

                            Ask a thoughtful question related to the topic.
                            Give the answer to the question in 3 easy to read sentences.

                            Next follow the following instructions to write a post between 250 - 450 words.

                            General instructions for the post:
                            - Make the hook as catchy as possible.
                            - The goal of the hook is to make the user scroll-stop.
                            - Each sentence should start on a new line.
                            - No sentence should be longer than 10 words.
                            - Use plain simple english.
                            - Use the word You as much as possible.
                            - If the Topic allows, add a couple of 3 item listicles.
                            - Do not use ** to bold anything.

                            Ask a useful question at the end the post.
                            Make it easier for the reader to answer the question by giving options.

                            If Description is provided by the user in triple commas, use it as additional instructions.
                        `
                    }
                ]
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `
                            Topic: """${topic}"""
                            Description: """${description}"""

                        `
                    }
                ]
            }
        ]
    });
};
