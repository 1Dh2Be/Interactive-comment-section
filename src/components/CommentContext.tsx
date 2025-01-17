import { createContext, ReactNode, useContext, useState } from "react";
import {
  CommentInterface,
  GetUserComment,
  ReplyInterface,
} from "../utils/GetUserComment";
import data from "../data.json";

interface CommentsContextProps {
  comments: CommentInterface[];
  id: number;
  newId: () => number;
  addComment: (newComment: CommentInterface) => void;
  deleteComment: (id: number) => void;
  retrieveCommentText: (id: number) => string | undefined;
  updateComment: (id: number, text: string) => void;
  addReply: (id: number, newReply: ReplyInterface) => void;
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

  const retrieveCommentText = (id: number): string | undefined => {
    const findComment = (
      comments: CommentInterface[]
    ): CommentInterface | undefined => {
      return comments.find((comment) => comment.id === id);
    };

    const comment = findComment(comments);

    if (comment && typeof comment.content === "string") {
      return comment.content;
    }

    return undefined;
  };

  const updateComment = (id: number, text: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: text };
        }
        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === id ? { ...reply, content: text } : reply
          );
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  };

  const addReply = (id: number, newReply: ReplyInterface) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        id,
        addComment,
        newId,
        deleteComment,
        retrieveCommentText,
        updateComment,
        addReply,
      }}
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
