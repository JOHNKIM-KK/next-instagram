// @flow
import * as React from "react";
import type { AuthUser } from "@/model/authUser";
import Avatar from "@/components/Avatar";

type Props = {
  user: AuthUser;
};
const SideBar = ({ user: { name, username, image } }: Props) => {
  return (
    <>
      <div className={"flex items-center"}>
        {image && <Avatar image={image} />}
        <div className={"ml-4"}>
          <p className={"font-bold"}>{username}</p>
          <p className={"text-lg text-neutral-500 leading-4"}>{name}</p>
        </div>
      </div>
      <p className={"text-sm text-neutral-500 mt-8"}>
        About · Help · Press · API · Jobs · Privacy · Terms · Location ·
        Language
      </p>
      <p className={"font-bold text-sm mt-8 text-neutral-500"}>
        @Copyright INSTAGRAM from META
      </p>
    </>
  );
};

export default SideBar;
