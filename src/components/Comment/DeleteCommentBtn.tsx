import { FaTrash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useComment } from "../CommentContext";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { anim } from "../../utils/Anim";

interface DeleteCommentBtnProps {
  id: number;
}

export const DeleteCommentBtn = ({ id }: DeleteCommentBtnProps) => {
  const { deleteComment } = useComment();

  const [isOpen, setIsOpen] = useState(false);

  const handleCommentDeletion = () => {
    setIsOpen(false);

    setTimeout(() => {
      deleteComment(id);
    }, 500);
  };

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <FaTrash className="text-red-500" size="16px" />
        <p className="text-red-500 font-medium">Delete</p>
      </div>
      <Modal
        isOpen={isOpen}
        onDelete={handleCommentDeletion}
        onClickOutside={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Modal = ({
  isOpen,
  onClose,
  onDelete,
  onClickOutside,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onClickOutside: () => void;
}) => {
  const ModalVariants = {
    initial: {
      scale: 0,
      rotate: -20,
      x: "-50%",
      y: "-50%",
    },
    animate: {
      scale: 1,
      rotate: 0,
      x: "-50%",
      y: "-50%",
    },
    exit: {
      y: "-1000%",
      scale: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClickOutside}
          className="bg-slate-900/20 backdrop-blur-[2px] p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            {...anim({ variants: ModalVariants })}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-20 top-1/2 left-1/2 bg-white min-h-[340px] h-[35%] w-11/12 shadow-2xl rounded-xl flex flex-col justify-center items-center gap-6"
          >
            <IoIosWarning className="w-20 h-20 bg-red-300/25 rounded-full p-3 text-red-400" />
            <h1 className="text-2xl font-bold">Delete Comment</h1>
            <p className="relative -top-4 text-center w-4/5 text-lg text-zinc-900">
              You're going to delete the comment permanently, are you sure ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="bg-gray-400/20 text-gray-600 font-medium rounded-[40px] text-lg py-3 px-7"
              >
                No, Keep It.
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500/95 text-white font-medium rounded-[40px] text-lg py-3 px-7"
              >
                Yes, Delete!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
