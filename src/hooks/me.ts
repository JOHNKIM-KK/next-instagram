import useSWR from "swr";
import type { HomeUser } from "@/model/authUser";
import { useCallback } from "react";

const updateBookmarks = async (postId: string, bookmark: boolean) => {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
};

const updateFollow = async (targetId: string, follow: boolean) => {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
};

export const useMe = () => {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
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
    },
    [user, mutate],
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), {
        populateCache: false,
      });
    },
    [mutate],
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
};
