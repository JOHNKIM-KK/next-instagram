import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NewPost } from "@/components/NewPost";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};

const newPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("auth/signin");
  }
  return <NewPost user={session.user} />;
};

export default newPage;
