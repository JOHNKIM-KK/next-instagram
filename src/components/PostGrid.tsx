import useSWR from "swr";
import GridSpinner from "@/components/GridSpinner";
import type { SimplePost } from "@/model/post";
import PostGridCard from "@/components/PostGridCard";

type Props = {
  username: string;
  query: string;
};
const PostGrid = ({ username, query }: Props) => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>(
    `/api/users/${username}/${query}`,
  );

  return (
    <div className={"w-full text-center"}>
      {isLoading && <GridSpinner />}
      <ul className={"grid grid-cols-3 gap-4 py-4 px-8"}>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default PostGrid;
