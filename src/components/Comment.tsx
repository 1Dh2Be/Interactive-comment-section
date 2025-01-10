import userAvatar from "../assets/images/avatars/image-maxblagun.png";
import data from "../data.json";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useCounter } from "./CommentContext";

export const Comment = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="h-64 rounded-xl bg-white mt-4 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10">
          <img
            className="w-full h-full"
            src={userAvatar}
            alt="User avatar image"
          />
        </div>
        <h2 className="text-neutral-darkBlue font-medium">maxblagun</h2>
        <span className="text-neutral-grayishBlue">2 weeks ago</span>
      </div>

      <p>{data.comments[0]?.content}</p>

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
    </div>
  );
};
