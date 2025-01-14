import { createContext, ReactNode, useContext, useState } from "react";
import { CommentInterface, GetUserComment } from "../utils/GetUserComment";
import data from "../data.json";

interface CommentsContextProps {
  comments: CommentInterface[];
  id: number;
  newId: () => number;
  addComment: (newComment: CommentInterface) => void;
  deleteComment: (id: number) => void;
}

const CommentsContext = createContext<CommentsContextProps | undefined>(
  undefined
);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const initialComments = data.comments.map(GetUserComment);

  const [comments, setComments] = useState<CommentInterface[]>(initialComments);
  const [id, setId] = useState(4);

  const newId = () => {
    setId((prevId) => prevId + 1);
    return id + 1;
  };

  const addComment = (newComments: CommentInterface) => {
    setComments((prevComments) => [...prevComments, newComments]);
  };

  const deleteComment = (id: number) => {
    const filterComments = (
      comments: CommentInterface[]
    ): CommentInterface[] => {
      return comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies?.filter((reply) => reply.id !== id) || [],
        }));
    };

    setComments((prevComments) => filterComments(prevComments));
  };

  return (
    <CommentsContext.Provider
      value={{ comments, id, addComment, newId, deleteComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error("useComment must be used inside a CommentProvider");
  }

  return context;
};
