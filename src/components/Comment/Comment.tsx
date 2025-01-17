import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import { useRef, useState } from "react";
import { CommentInterface } from "../../utils/GetUserComment";
import { GetCurrentUser } from "../../utils/GetCurrentUser";
import data from "../../data.json";
import { DeleteCommentBtn } from "./DeleteCommentBtn";
import { EditComment } from "./EditComment";
import { anim } from "../../utils/Anim";
import { AnimatePresence, motion } from "motion/react";
import { useComment } from "../CommentContext";
import { Form, Formik } from "formik";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { WriteReply } from "../write-comment/WriteReply";

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
  const [userVote, setUserVote] = useState<number | undefined>(undefined);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const updateVote = (vote: number) => {
    if (userVote !== vote) {
      setUserVote(vote);
      setCount((prevCount) => prevCount + vote);
    }
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
    initial: { x: "100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
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
            <div className="flex items-center gap-2">
              <img className="w-9 h-9" src={avatar} alt="User avatar" />
              <h2 className="text-neutral-darkBlue font-medium">{username}</h2>
              {CurrentUser.username === username && (
                <span className="bg-primary-moderateBlue text-white text-sm px-1">
                  you
                </span>
              )}
              <div className="flex gap-2 ml-auto">
                <DeleteCommentBtn noText id={id} />
                <EditComment
                  noText
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                />
              </div>
            </div>
            <Formik
              innerRef={formikRef}
              initialValues={{ text: content }}
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
                  onClick={() => updateVote(1)}
                  className={`cursor-pointer hover:bg-primary-moderateBlue/50 hover:rounded-md ${
                    userVote === 1
                      ? "bg-primary-moderateBlue/50 rounded-md text-primary-lightGrayishBlue"
                      : "text-primary-lightGrayishBlue"
                  } p-[2px]`}
                  size="16px"
                />
                <span className="text-primary-moderateBlue font-bold">
                  {count}
                </span>
                <FaMinus
                  onClick={() => updateVote(-1)}
                  className={`cursor-pointer hover:bg-primary-moderateBlue/50 hover:rounded-md ${
                    userVote === -1
                      ? "bg-primary-moderateBlue/50 rounded-md text-primary-lightGrayishBlue"
                      : "text-primary-lightGrayishBlue"
                  } p-[2px]`}
                  size="16px"
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
            <div className="flex items-center gap-2">
              <img className="w-9 h-9" src={avatar} alt="User avatar" />
              <h2 className="text-neutral-darkBlue font-medium">{username}</h2>
              {CurrentUser.username === username && (
                <span className="bg-primary-moderateBlue text-white text-sm px-1">
                  you
                </span>
              )}
              <span className="text-neutral-grayishBlue text-sm">{date}</span>
            </div>
            <p>
              {replyingTo && (
                <span className="text-primary-moderateBlue font-medium">
                  @{replyingTo}{" "}
                </span>
              )}
              {content}
            </p>
            <div className="flex justify-between items-center">
              <div className="w-20 h-8 rounded-lg bg-primary-lightGrayishBlue/30 flex justify-between items-center px-2">
                <FaPlus
                  onClick={() => updateVote(1)}
                  className={`cursor-pointer hover:bg-primary-moderateBlue/50 hover:rounded-md ${
                    userVote === 1
                      ? "bg-primary-moderateBlue/50 rounded-md text-primary-lightGrayishBlue"
                      : "text-primary-lightGrayishBlue"
                  } p-[2px]`}
                  size="16px"
                />
                <span className="text-primary-moderateBlue font-bold">
                  {count}
                </span>
                <FaMinus
                  onClick={() => updateVote(-1)}
                  className={`cursor-pointer hover:bg-primary-moderateBlue/50 hover:rounded-md ${
                    userVote === -1
                      ? "bg-primary-moderateBlue/50 rounded-md text-primary-lightGrayishBlue"
                      : "text-primary-lightGrayishBlue"
                  } p-[2px]`}
                  size="16px"
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
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => setOpenReply(true)}
                >
                  <FaReply className="text-primary-moderateBlue" />
                  <p className="font-medium text-primary-moderateBlue">Reply</p>
                </div>
              )}
            </div>
            {replies && replies.length > 0 && (
              <>
                <div className="border-t-2" />
                <div
                  className="flex items-center gap-2 px-2 cursor-pointer"
                  onClick={() => setShowReplies(!showReplies)}
                >
                  <FiMessageSquare />
                  <p className="text-black">See replies ({replies.length})</p>
                  <motion.span
                    initial="initial"
                    animate={showReplies ? "animate" : "exit"}
                    variants={{
                      initial: { rotate: 0 },
                      animate: { rotate: 180 },
                    }}
                  >
                    <IoIosArrowUp />
                  </motion.span>
                </div>
              </>
            )}
          </div>
        )}
        <div className="w-full my-2">
          {openReply && (
            <WriteReply
              id={id}
              replyUsername={username}
              btnText="REPLY"
              setOpenReply={setOpenReply}
              setShowReplies={setShowReplies}
            />
          )}
        </div>
        {replies && replies.length > 0 && showReplies && (
          <div className="w-11/12">
            {replies.map((reply) => (
              <Comment key={reply.id} {...reply} />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
