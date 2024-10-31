"use client";

import type { ProfileUser } from "@/model/authUser";
import { Button } from "@/components/ui/Button";
import { useMe } from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
// import revalidateProfileUser from "@/action/action";

type Props = {
  user: ProfileUser;
};
const FollowButton = ({ user }: Props) => {
  const { username } = user;
  const { user: LoggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const isUpdating = isPending || isFetching;

  const showButton = LoggedInUser && LoggedInUser.username !== username;
  const following =
    LoggedInUser &&
    LoggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    // revalidateProfileUser(username);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className={"relative"}>
          {isUpdating && (
            <div
              className={
                "absolute z-20 inset-0 flex justify-center items-center"
              }
            >
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "Unfollow"}
          />
        </div>
      )}
    </>
  );
};

export default FollowButton;
