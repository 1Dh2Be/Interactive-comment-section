import { GetCurrentUser } from "../../utils/GetCurrentUser";
import DottedButton from "./DottedButton";
import { Form, Formik } from "formik";
import data from "../../data.json";

export const WriteComment = () => {
  const { avatar } = GetCurrentUser(data);

  return (
    <div className="p-4 rounded-md relative z-0 bg-white h-full">
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
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
            />
            <div className="flex justify-between">
              <img className="w-9 h-9" src={avatar} alt="Avatar icon" />
              <DottedButton />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
