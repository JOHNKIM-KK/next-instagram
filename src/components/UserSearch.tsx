"use client";

import { useState } from "react";
import useSWR from "swr";
import type { SearchUser } from "@/model/authUser";
import GridSpinner from "@/components/GridSpinner";
import { UserCard } from "@/components/UserCard";
import useDebounce from "@/hooks/debounce";

export const UserSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const debounceKeyword = useDebounce(keyword, 500);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debounceKeyword}`);

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={"w-full max-w-2xl my-4 flex flex-col items-center"}>
      <form className={"w-full mb-4"} onSubmit={onsubmit}>
        <input
          className={"w-full text-xl p-3 outline-none border border-gray-400"}
          type="text"
          autoFocus
          placeholder={"Search for a username or name"}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>Something went wrong</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found</p>}
      <ul className={"w-full p-4"}>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
};
