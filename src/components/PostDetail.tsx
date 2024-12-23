import type { SimplePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "@/components/PostUserAvatar";
import ActionBar from "@/components/ActionBar";
import Avatar from "@/components/Avatar";
import { useFullPost } from "@/hooks/post";

type Props = {
  post: SimplePost;
};

const PostDetail = ({ post }: Props) => {
  const { id, username, userImage, image } = post;
  const { post: data, postComment } = useFullPost(id);
  const comments = data?.comments;

  return (
    <section className={"flex w-full h-full "}>
      <div className={"relative basis-3/5"}>
        <Image
          className={"object-cover"}
          src={image}
          alt={`photo by ${username}`}
          fill
          sizes="650px"
          priority
        />
      </div>
      <div className={"w-full basis-2/5 flex flex-col"}>
        <PostUserAvatar image={userImage} username={username} />
        <ul
          className={"border-t border-gray-200 h-full overflow-y-auto p-4 mb-1"}
        >
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className={"flex items-center mb-1"}>
                  <Avatar
                    image={image}
                    highlight={commentUsername === username}
                    size={"small"}
                  />
                  <div className={"ml-2"}>
                    <span className={"font-bold mr-1"}>{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              ),
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
};
export default PostDetail;
