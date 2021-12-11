import { fridge } from "fridge-next";
import { useAuthContext } from "../../../components/AuthProvider";

import Layout from "../../../components/Layout";
import Login from "../../../components/Login";
import Reply from "../../../components/Reply";
import ReplyForm from "../../../components/ReplyForm";

export default function Topic({ topic, replies }) {
  const { loading, user } = useAuthContext();

  return (
    <Layout>
      <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        {topic.title}
      </h2>
      <ul role="list" className="divide-y divide-gray-200">
        <li>
          <Reply
            author={topic.author}
            date={topic.date_created}
            body={topic.body}
          />
        </li>
        {replies.map((reply) => (
          <Reply
            key={reply.id}
            author={reply.author}
            date={reply.date_created}
            body={reply.body}
          />
        ))}
        {!loading && (
          <li>
            {user ? <ReplyForm author={user} topic={topic} /> : <Login />}
          </li>
        )}
      </ul>
    </Layout>
  );
}
export async function getStaticProps(ctx) {
  const { id } = ctx.params;

  const [topic, replies] = await Promise.all([
    fridge(`content/topic/${id}`),
    fridge(`content/reply?topic=${id}`),
  ]);

  return {
    props: { topic, replies },
  };
}

export async function getStaticPaths() {
  const topics = await fridge("content/topic");

  return {
    paths: topics.map((topic) => ({
      params: { id: topic.id, slug: topic.slug },
    })),
    fallback: "blocking",
  };
}
