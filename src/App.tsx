import { Comment } from "./components/Comment";
import { CounterProvider } from "./components/CommentContext";
import { WriteComment } from "./components/write-comment/WriteComment";

function App() {
  return (
    <CounterProvider>
      <main className="w-11/12 h-screen lg:w-4/5 mx-auto flex flex-col">
        <section className="flex-[80%] overflow-auto">
          <Comment />
          <Comment />
          <Comment />
        </section>
        <section className="flex-[20%] my-4">
          <WriteComment />
        </section>
      </main>
    </CounterProvider>
  );
}

export default App;
