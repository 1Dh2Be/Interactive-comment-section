import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
import { CommentInterface } from "../utils/GetUserComment";

interface CommentProps {
  avatar: string;
  username: string;
  date: string;
  content: string;
  replies: CommentInterface[];
}

export const Comment = ({
  avatar,
  username,
  date,
  content,
  replies,
}: CommentProps) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => {
    setCount((prevCount) => {
      if (prevCount === 0) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };

  return (
    <div className="h-64 rounded-xl bg-white mt-4 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10">
          <img className="w-full h-full" src={avatar} alt="User avatar image" />
        </div>
        <h2 className="text-neutral-darkBlue font-medium">{username}</h2>
        <span className="text-neutral-grayishBlue">{date}</span>
      </div>

      <p>{content}</p>

      <div>
        <div className="w-20 h-8 rounded-lg bg-primary-lightGrayishBlue/30 flex justify-between items-center px-2">
          <FaPlus
            onClick={increment}
            className="text-primary-lightGrayishBlue"
            size="12px"
          />
          <span className="text-primary-moderateBlue font-bold">{count}</span>
          <FaMinus
            onClick={decrement}
            className="text-primary-lightGrayishBlue"
            size="12px"
          />
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div>
          {replies.map((reply: any) => (
            <Comment
              avatar={reply.avatar}
              username={reply.username}
              date={reply.createdAt}
              content={reply.content}
              replies={reply.replies}
            />
          ))}
        </div>
      )}
    </div>
  );
};
