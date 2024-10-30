import Avatar from "@/components/Avatar";

type Props = {
  image: string;
  username: string;
};

const PostUserAvatar = ({ image, username }: Props) => {
  return (
    <div className={"flex items-center p-2"}>
      <Avatar image={image} highlight size={"medium"} />
      <span className={"text-gray-900 font-bold ml-2"}>{username}</span>
    </div>
  );
};
export default PostUserAvatar;
