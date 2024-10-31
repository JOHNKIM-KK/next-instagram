import useSWR from "swr";
import type { Comment, SimplePost } from "@/model/post";

const updateLike = async (id: string, like: boolean) => {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
};

const addComment = async (id: string, comment: string) => {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
};

export const usePosts = () => {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const postComment = (post: SimplePost, comment: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike, postComment };
};