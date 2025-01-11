export interface CommentInterface {
  content: string;
  date: string;
  score: number;
  avatar: string;
  username: string;
  replies?: CommentInterface[];
}

export const GetUserComment = (data: {
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: { png: string };
    username: string;
  };
  replies?:
    | {
        content: string;
        createdAt: string;
        score: number;
        user: {
          image: { png: string };
          username: string;
        };
      }[]
    | null;
}): CommentInterface => {
  const comment: CommentInterface = {
    content: data.content,
    date: data.createdAt,
    score: data.score,
    avatar: data.user.image.png,
    username: data.user.username,
    replies: data.replies
      ? data.replies.map((reply) => ({
          content: reply.content,
          date: reply.createdAt,
          score: reply.score,
          avatar: reply.user.image.png,
          username: reply.user.username,
        }))
      : undefined,
  };
  return comment;
};
