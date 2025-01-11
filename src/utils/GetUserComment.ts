import { ReactNode } from "react";

export interface CommentInterface {
  id: number;
  content: ReactNode;
  date: string;
  score: number;
  avatar: string;
  username: string;
  replies?: ReplyInterface[];
}

export interface ReplyInterface extends Omit<CommentInterface, "replies"> {
  replyingTo: string;
}

export const GetUserComment = (data: {
  id: number;
  content: ReactNode;
  createdAt: string;
  score: number;
  user: {
    image: { png: string };
    username: string;
  };
  replies?:
    | {
        id: number;
        content: ReactNode;
        createdAt: string;
        score: number;
        replyingTo: string;
        user: {
          image: { png: string };
          username: string;
        };
      }[]
    | null;
}): CommentInterface => {
  const comment: CommentInterface = {
    id: data.id,
    content: data.content,
    date: data.createdAt,
    score: data.score,
    avatar: data.user.image.png,
    username: data.user.username,
    replies: data.replies
      ? data.replies.map((reply) => ({
          id: reply.id,
          content: reply.content,
          date: reply.createdAt,
          score: reply.score,
          replyingTo: reply.replyingTo,
          avatar: reply.user.image.png,
          username: reply.user.username,
        }))
      : undefined,
  };
  return comment;
};
