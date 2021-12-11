import { useState } from "react";
import { FridgeImage } from "fridge-next";
import Fridge from "fridge";
import { useAuthContext } from "./AuthProvider";

const fridge = new Fridge({
  fridgeId: process.env.NEXT_PUBLIC_FRIDGE_ID,
});

type Props = {
  author: any;
  topic: any;
};

export default function ReplyForm({ author, topic }: Props) {
  const { user, getToken } = useAuthContext();
  const [reply, setReply] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const token = getToken();
    const res = await fridge.post(
      "/content/reply",
      {
        active: true,
        body: reply,
        topic: [topic.id],
        author: [user.id],
      },
      { token }
    );

    await fridge.put(
      `/content/topic/${topic.id}`,
      {
        replies: [...(topic.replies || []), res.id],
      },
      { token }
    );

    setReply("");
  }

  return (
    <div className="flex items-start space-x-4 py-5 px-4">
      <div className="flex-shrink-0">
        <FridgeImage
          src={author.avatar}
          alt={author.name}
          className="inline-block h-10 w-10 rounded-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={onSubmit} className="relative">
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="py-2" aria-hidden="true">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
