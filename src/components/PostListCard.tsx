"use client";

import type { SimplePost } from "@/model/post";
import Image from "next/image";
import CommentForm from "@/components/CommentForm";
import ActionBar from "@/components/ActionBar";
import { useState } from "react";
import ModalPortal from "@/components/ui/ModalPortal";
import PostModal from "@/components/PostModal";
import PostDetail from "@/components/PostDetail";
import PostUserAvatar from "@/components/PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};
const PostListCard = ({ post, priority = false }: Props) => {
  const { userImage, username, text, createdAt, likes, image } = post;

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <article className={"rounded-lg shadow-md border border-gray-200"}>
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className={"w-full object-cover aspect-square"}
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
};

export default PostListCard;
