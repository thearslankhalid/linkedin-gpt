import { useEffect, useCallback, useReducer, useContext } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel, Pencil, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOpenAI } from "@/hooks/use-open-ai";
import {
  initialState,
  PostContext,
  PostDispatchContext,
  postReducer,
} from "@/app/generate-post-context";

const GeneratePostButton = () => {
  const state = useContext(PostContext);
  const dispatch = useContext(PostDispatchContext);
  const { topic, description } = state;
  const { data, mutate, isLoading, error } = useOpenAI({ topic, description });
  const { toast } = useToast();
  const isButtonDisabled = isLoading || !topic;

  const generatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
  };

  const showToast = useCallback(
    (errorMessage: string) => {
      toast({
        title: "Please try again!",
        description: errorMessage,
      });
    },
    [toast]
  );

  useEffect(() => {
    if (data) {
      dispatch({
        key: "post",
        value: data,
      });
    } else if (error) {
      showToast(error.message);
    }
  }, [data, error, showToast, dispatch]);

  return (
    <Button
      onClick={generatePost}
      disabled={isButtonDisabled}
      className="flex items-center"
    >
      {isLoading && (
        <>
          <LoaderPinwheel className="animate-spin" />
          <span>Generating...</span>
        </>
      )}
      {!isLoading && (
        <>
          <Pencil />
          <span>Generate Post</span>
        </>
      )}
    </Button>
  );
};

const GeneratePostForm = () => {
  const state = useContext(PostContext);
  const dispatch = useContext(PostDispatchContext);
  const { topic, description } = state;

  const onChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      key: "topic",
      value: e.target.value,
    });

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({
      key: "description",
      value: e.target.value,
    });

  return (
    <div className="w-96 p-4 border rounded-md flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="topic">Post Topic</Label>
        <Input
          id="topic"
          placeholder="Your post topic in few words"
          value={topic}
          onChange={onChangeTopic}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Post Description</Label>
        <Textarea
          className="resize-none h-24"
          id="description"
          placeholder="Your post description"
          value={description}
          onChange={onChangeDescription}
        />
      </div>
      <GeneratePostButton />
    </div>
  );
};

const ViewGeneratedPostBar = () => {
  const state = useContext(PostContext);
  const { post } = state;
  const { toast } = useToast();

  const onCopy = async () => {
    await navigator.clipboard.writeText(post);
    toast({
      title: "Post copied!",
    });
  };

  return (
    <div className="flex items-center justify-end gap-2 border-b p-2">
      <Button variant="outline" size="icon" onClick={onCopy} disabled={!post}>
        <Copy className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Copy</span>
      </Button>
    </div>
  );
};

const ViewGeneratedPost = () => {
  const state = useContext(PostContext);
  const dispatch = useContext(PostDispatchContext);
  const { post } = state;

  const onChangePostText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({
      key: "post",
      value: e.target.value,
    });

  return (
    <div className="border rounded-md flex-1 flex flex-col">
      <ViewGeneratedPostBar />
      <div className="p-4 flex-1">
        <Textarea
          className="resize-none h-full"
          id="postText"
          placeholder="Your generated post will be right here!"
          value={post}
          onChange={onChangePostText}
        />
      </div>
    </div>
  );
};

function GeneratePost() {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <div className="flex gap-6 w-full h-full">
      <PostContext.Provider value={state}>
        <PostDispatchContext.Provider value={dispatch}>
          <GeneratePostForm />
          <ViewGeneratedPost />
        </PostDispatchContext.Provider>
      </PostContext.Provider>
    </div>
  );
}

export default GeneratePost;
