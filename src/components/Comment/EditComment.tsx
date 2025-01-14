import { MdEdit } from "react-icons/md";

export const EditComment = () => {
  return (
    <div className="flex items-center gap-1">
      <MdEdit className="text-primary-moderateBlue" size="20px" />
      <p className="text-primary-moderateBlue font-medium">Edit</p>
    </div>
  );
};
