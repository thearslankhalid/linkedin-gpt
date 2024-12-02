import { createContext, Dispatch } from "react";

type StateKeys = "topic" | "description" | "post"

export type PostAction = {
  key: StateKeys;
  value: string;
};

export type PostState = {
  topic: string;
  description: string;
  post: string;
};

export const initialState: PostState = {
  topic: "",
  description: "",
  post: ""
};

export const postReducer = (state: PostState, action: PostAction) => {
  return {
    ...state,
    [action.key]: action.value,
  };
};

export const PostContext = createContext<PostState>(initialState);
export const PostDispatchContext = createContext<Dispatch<PostAction>>(
  (() => undefined) as Dispatch<PostAction>
);
