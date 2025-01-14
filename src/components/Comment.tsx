import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { useState } from "react";
import { CommentInterface } from "../utils/GetUserComment";
import { GetCurrentUser } from "../utils/GetCurrentUser";
import data from "../data.json";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useComment } from "./CommentContext";

export const Comment = ({
  id,
  avatar,
  username,
  date,
  content,
  score,
  replies,
}: CommentInterface) => {
  const { deleteComment } = useComment();
  const [count, setCount] = useState<number>(score);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => {
    setCount((prevCount) => {
      if (prevCount === 0) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };

  const handleDelete = () => deleteComment(id);

  const CurrentUser = GetCurrentUser(data);
  return (
    <div className="w-full flex flex-col items-end">
      <div className="h-fit rounded-xl bg-white mt-4 p-4 flex flex-col gap-3 w-full">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9">
            <img
              className="w-full h-full"
              src={avatar}
              alt="User avatar image"
            />
          </div>
          <h2 className="text-neutral-darkBlue font-medium">{username}</h2>
          <span className="text-neutral-grayishBlue text-sm">{date}</span>
          <span>{id}</span>
        </div>

        <p>{content}</p>

        <div className="flex justify-between items-center">
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
          {CurrentUser.username === username ? (
            <div className="flex gap-3">
              <div className="flex items-center gap-1" onClick={handleDelete}>
                <FaTrash className="text-red-500" size="16px" />
                <p className="text-red-500 font-medium">Delete</p>
              </div>
              <div className="flex items-center gap-1">
                <MdEdit className="text-primary-moderateBlue" size="20px" />
                <p className="text-primary-moderateBlue font-medium">Edit</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <FaReply className="text-primary-moderateBlue" />
              <p className="font-medium text-primary-moderateBlue">Reply</p>
            </div>
          )}
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className="w-11/12">
          {replies.map((reply: any) => (
            <Comment
              key={reply.id}
              id={reply.id}
              avatar={reply.avatar}
              username={reply.username}
              date={reply.date}
              content={
                <span>
                  {reply.replyingTo && (
                    <span className="text-primary-moderateBlue font-medium">
                      @{reply.replyingTo}
                    </span>
                  )}{" "}
                  {reply.content}
                </span>
              }
              score={reply.score}
              replies={reply.replies}
            />
          ))}
        </div>
      )}
    </div>
  );
};
