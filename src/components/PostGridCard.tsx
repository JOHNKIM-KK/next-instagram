import type { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "@/components/ui/ModalPortal";
import PostModal from "@/components/PostModal";
import PostDetail from "@/components/PostDetail";
import { signIn, useSession } from "next-auth/react";

type Props = {
  post: SimplePost;
  priority: boolean;
};
const PostGridCard = ({ post, priority }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { image, username } = post;
  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };
  return (
    <div className={"relative w-full aspect-square"}>
      <Image
        className={"object-cover"}
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes={"650px"}
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
};

export default PostGridCard;
