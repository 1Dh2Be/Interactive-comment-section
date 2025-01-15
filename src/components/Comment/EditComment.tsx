import { MdEdit } from "react-icons/md";
import { Form, Formik } from "formik";
import { useComment } from "../CommentContext";

interface EditComentProp {
  noText?: boolean;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const EditComment: React.FC<EditComentProp> = ({
  noText,
  isEditing,
  setIsEditing,
}) => {
  const handleEditClick = () => {
    setIsEditing(true);
    console.log(isEditing);
  };

  return (
    <button
      className="flex items-center gap-1"
      onClick={handleEditClick}
      disabled={isEditing}
    >
      <MdEdit className="text-primary-moderateBlue" size="20px" />
      {!noText && <p className="text-primary-moderateBlue font-medium">Edit</p>}
    </button>
  );
};

export const CommentTextEdit = ({
  id,
  onSubmit,
}: {
  id: number;
  onSubmit: (newText: string) => void;
}) => {
  const { retrieveCommentText } = useComment();
  const commentContent = retrieveCommentText(id);

  return (
    <Formik
      initialValues={{
        text: commentContent || "",
      }}
      onSubmit={(values, actions) => {
        onSubmit(values.text);
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
          />
        </Form>
      )}
    </Formik>
  );
};
