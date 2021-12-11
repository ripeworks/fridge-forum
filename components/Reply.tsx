import { FridgeImage } from "fridge-next";

type Props = {
  author: {
    id: string;
    name: string;
    avatar?: { url: string }[];
  };
  date: string;
  body: string;
};
export default function Reply({ author, date, body }: Props) {
  return (
    <div className="flex items-start space-x-4 py-5 px-4">
      <div className="flex-shrink-0">
        <FridgeImage
          src={author.avatar}
          alt={author.name}
          className="inline-block h-10 w-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between space-x-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {author.name}
            </p>
          </div>
          <time className="whitespace-nowrap text-sm text-gray-500">
            {date}
          </time>
        </div>
        <p className="mt-3 text-base text-gray-500">{body}</p>
      </div>
    </div>
  );
}
