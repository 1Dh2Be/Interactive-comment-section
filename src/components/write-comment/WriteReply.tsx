import { GetCurrentUser } from "../../utils/GetCurrentUser";
import DottedButton from "./DottedButton";
import { Form, Formik } from "formik";
import data from "../../data.json";
import { useComment } from "../CommentContext";
import { useRef } from "react";

export const WriteReply = ({
  btnText = "SEND",
  id,
  replyUsername,
  setShowReplies,
  setOpenReply,
}: {
  btnText: string;
  id: number;
  replyUsername: string;
  setShowReplies: (value: boolean) => void;
  setOpenReply: (value: boolean) => void;
}) => {
  const formikRef = useRef<any>(null);
  const { avatar, username } = GetCurrentUser(data);

  const { addReply, newId } = useComment();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formikRef.current?.submitForm();
    }
  };

  return (
    <div className="p-4 rounded-md relative z-0 bg-white h-full">
      <Formik
        innerRef={formikRef}
        initialValues={{ comment: "" }}
        onSubmit={(values, actions) => {
          addReply((id = id), {
            username: username,
            id: newId(),
            avatar: avatar,
            content: values.comment,
            score: 0,
            date: "Just Now",
            replyingTo: replyUsername,
          });
          actions.setSubmitting(false);
          actions.resetForm();
          setShowReplies(true);
          setOpenReply(false);
        }}
      >
        {(props) => (
          <Form className="w-full h-full flex flex-col gap-4">
            <textarea
              className="w-full h-[60%] border rounded-md px-5 pt-3 outline-none"
              name="comment"
              placeholder="Add a comment..."
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.comment}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-between">
              <img className="w-9 h-9" src={avatar} alt="Avatar icon" />
              <DottedButton text={btnText} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
