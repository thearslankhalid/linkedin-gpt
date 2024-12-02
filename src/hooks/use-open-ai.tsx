import { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import { generate } from "@/lib/ai"

interface OpenAIHookProps {
  topic: string,
  description: string
}

// Common API interface for all LLM apis
// Responsible for returning the generated text
// This is to be followed for other models like Claude as well
// De-couples the model logic from the component
function useOpenAI({ topic, description }: OpenAIHookProps) {
  const [post, setPost] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => generate(topic, description),
    onSuccess: (data) => {
      const generatedText = data.choices[0].message.content;
      setPost(generatedText ?? "Could not generate post");
    }
  });


  return {
    data: post,
    mutate,
    isLoading: isPending,
    error
  }
}

export { useOpenAI }
