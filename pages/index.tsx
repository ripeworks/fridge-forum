import Link from "next/link";
import { fridge } from "fridge-next";

import Layout from "../components/Layout";

export default function Index({ topics }) {
  return (
    <Layout>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/t/${topic.slug}/${topic.id}`}>
                <a className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">
                            {topic.title}
                          </p>
                          <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                            in {topic.category.name}
                          </p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>{topic.replies?.length ?? 0} Replies</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const topics = await fridge("content/topic");

  return {
    props: { topics },
  };
}
