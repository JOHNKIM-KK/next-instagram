"use client";

import useSWR from "swr";
import type { DetailUser } from "@/model/user";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { ScrollableBar } from "@/components/ui/ScrollableBar";

const FollowingBar = () => {
  const { data, isLoading: loading } = useSWR<DetailUser>("/api/me");
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];

  return (
    <section
      className={
        "w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0"
      }
    >
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className={"flex flex-col items-center w-20"}
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p
                className={
                  "w-full text-sm text-center text-ellipsis overflow-hidden"
                }
              >
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
};

export default FollowingBar;
