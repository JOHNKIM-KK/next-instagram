"use client";

import type { ProfileUser } from "@/model/authUser";
import { Button } from "@/components/ui/Button";
import { useMe } from "@/hooks/me";

type Props = {
  user: ProfileUser;
};
const FollowButton = ({ user }: Props) => {
  const { username } = user;
  const { user: LoggedInUser } = useMe();

  const showButton = LoggedInUser && LoggedInUser.username !== username;
  const following =
    LoggedInUser &&
    LoggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
};

export default FollowButton;
