import { UserSearch } from "@/components/UserSearch";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

const searchPage = () => {
  return <UserSearch />;
};

export default searchPage;
