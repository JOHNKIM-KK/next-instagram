import useSWR, { useSWRConfig } from "swr";
import type { Comment, FullPost } from "@/model/post";

const addComment = async (id: string, comment: string) => {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
};

export const useFullPost = (postId: string) => {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: gloablMutate } = useSWRConfig();

  const postComment = (comment: Comment) => {
    if (!post) return;

    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { post, isLoading, error, postComment };
};
