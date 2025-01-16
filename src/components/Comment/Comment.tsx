import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { useRef, useState } from "react";
import { CommentInterface } from "../../utils/GetUserComment";
import { GetCurrentUser } from "../../utils/GetCurrentUser";
import data from "../../data.json";
import { DeleteCommentBtn } from "./DeleteCommentBtn";
import { EditComment } from "./EditComment";
import { anim } from "../../utils/Anim";
import { AnimatePresence, motion } from "motion/react";
import { WriteComment } from "../write-comment/WriteComment";
import { useComment } from "../CommentContext";
import { Form, Formik } from "formik";

export const Comment = ({
  id,
  avatar,
  username,
  date,
  content,
  score,
  replies,
  replyingTo,
}: CommentInterface) => {
  const formikRef = useRef<any>(null);
  const { updateComment } = useComment();
  const [count, setCount] = useState<number>(score);
  const [openReply, setOpenReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => {
    setCount((prevCount) => {
      if (prevCount === 0) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };

  const handleUpdate = (newText: string) => {
    updateComment(id, newText);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formikRef.current?.submitForm();
    }
  };

  const CurrentUser = GetCurrentUser(data);

  const commentVariants = {
    initial: {
      x: "100%",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        {...anim({ variants: commentVariants })}
        className="w-full flex flex-col items-end"
      >
        {isEditing ? (
          <div className="h-fit rounded-xl bg-white mt-4 p-4 flex flex-col gap-3 w-full">
            <div className="flex items-center gap-[8px]">
              <div className="w-9 h-9">
                <img
                  className="w-full h-full"
                  src={avatar}
                  alt="User avatar image"
                />
              </div>
              <h2 className="text-neutral-darkBlue font-medium">{username}</h2>
              {CurrentUser.username === username ? (
                <span className="bg-primary-moderateBlue text-white text-sm px-1">
                  you
                </span>
              ) : null}
              <div className="flex gap-2 ml-auto">
                <DeleteCommentBtn noText={true} id={id} />
                <EditComment
                  noText={true}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                />
              </div>
            </div>

            <Formik
              innerRef={formikRef}
              initialValues={{
                text: content,
              }}
              onSubmit={(values, actions) => {
                handleUpdate(values.text);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <textarea
                    name="text"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.text}
                    onKeyDown={handleKeyDown}
                    className="w-full h-[60%] border rounded-md px-5 pt-3 outline-none"
                  />
                </Form>
              )}
            </Formik>

            <div className="flex justify-between items-center">
              <div className="w-20 h-8 rounded-lg bg-primary-lightGrayishBlue/30 flex justify-between items-center px-2">
                <FaPlus
                  onClick={increment}
                  className="text-primary-lightGrayishBlue"
                  size="12px"
                />
                <span className="text-primary-moderateBlue font-bold">
                  {count}
                </span>
                <FaMinus
                  onClick={decrement}
                  className="text-primary-lightGrayishBlue"
                  size="12px"
                />
              </div>
              <button
                className="bg-primary-moderateBlue text-white px-3 py-1 rounded-md"
                onClick={() => formikRef.current?.submitForm()}
              >
                UPDATE
              </button>
            </div>
          </div>
        ) : (
          <div className="h-fit rounded-xl bg-white mt-4 p-4 flex flex-col gap-3 w-full">
            <div className="flex items-center gap-[8px]">
              <div className="w-9 h-9">
                <img
                  className="w-full h-full"
                  src={avatar}
                  alt="User avatar image"
                />
              </div>
              <h2 className="text-neutral-darkBlue font-medium">{username}</h2>
              {CurrentUser.username === username ? (
                <span className="bg-primary-moderateBlue text-white text-sm px-1">
                  you
                </span>
              ) : null}
              <span className="text-neutral-grayishBlue text-sm">{date}</span>
            </div>

            {replyingTo ? (
              <p>
                <span className="text-primary-moderateBlue font-medium">
                  {replyingTo + " "}
                </span>
                {content}
              </p>
            ) : (
              <p>{content}</p>
            )}

            <div className="flex justify-between items-center">
              <div className="w-20 h-8 rounded-lg bg-primary-lightGrayishBlue/30 flex justify-between items-center px-2">
                <FaPlus
                  onClick={increment}
                  className="text-primary-lightGrayishBlue"
                  size="12px"
                />
                <span className="text-primary-moderateBlue font-bold">
                  {count}
                </span>
                <FaMinus
                  onClick={decrement}
                  className="text-primary-lightGrayishBlue"
                  size="12px"
                />
              </div>
              {CurrentUser.username === username ? (
                <div className="flex gap-3">
                  <DeleteCommentBtn id={id} />
                  <EditComment
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                  />
                </div>
              ) : (
                <div
                  className="flex gap-3 items-center"
                  onClick={() => setOpenReply(true)}
                >
                  <FaReply className="text-primary-moderateBlue" />
                  <p className="font-medium text-primary-moderateBlue">Reply</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-full my-2">
          {openReply ? <WriteComment btnText="REPLY" /> : null}
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
                content={reply.content}
                score={reply.score}
                replies={reply.replies}
                replyingTo={reply.replyingTo}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
