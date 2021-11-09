import { fridge } from "fridge-next";

import Layout from "../../../components/Layout";

export default function Topic({ topic, replies }) {
  return (
    <Layout>
      <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        {topic.title}
      </h2>
      <p className="mt-3 text-base text-gray-500">{topic.body}</p>
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
