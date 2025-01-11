import { Comment } from "./components/Comment";
import { CounterProvider } from "./components/CommentContext";
import { WriteComment } from "./components/write-comment/WriteComment";
import data from "./data.json";
import { GetUserComment } from "./utils/GetUserComment";

function App() {
  return (
    <CounterProvider>
      <main className="w-11/12 h-screen lg:w-4/5 mx-auto flex flex-col">
        <section className="flex-[80%] overflow-auto">
          {data.comments.map((comment) => {
            const { avatar, username, content, date, replies, score, id } =
              GetUserComment(comment);
            return (
              <Comment
                key={id}
                id={id}
                avatar={avatar}
                username={username}
                date={date}
                content={content}
                score={score}
                replies={replies || []}
              />
            );
          })}
        </section>
        <section className="flex-[20%] my-4">
          <WriteComment />
        </section>
      </main>
    </CounterProvider>
  );
}

export default App;
