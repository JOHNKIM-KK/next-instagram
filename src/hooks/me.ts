import useSWR from "swr";
import type { HomeUser } from "@/model/authUser";

const updateBookmarks = async (postId: string, bookmark: boolean) => {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
};

export const useMe = () => {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = (postId: string, bookmark: boolean) => {
    if (!user) return;

    const bookmarks = user.bookmarks;
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((id) => id !== postId),
    };

    return mutate(updateBookmarks(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { user, isLoading, error, setBookmark };
};
