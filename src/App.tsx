import { Comment } from "./components/Comment/Comment";
import { useComment } from "./components/CommentContext";
import { WriteComment } from "./components/write-comment/WriteComment";

function App() {
  const { comments } = useComment();

  return (
    <main className="w-11/12 h-screen lg:w-4/5 mx-auto flex flex-col">
      <section className="flex-[80%] overflow-auto">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              avatar={comment.avatar}
              username={comment.username}
              date={comment.date}
              content={comment.content}
              score={comment.score}
              replies={comment.replies || []}
            />
          );
        })}
      </section>
      <section className="flex-[20%] my-4">
        <WriteComment />
      </section>
    </main>
  );
}

export default App;
