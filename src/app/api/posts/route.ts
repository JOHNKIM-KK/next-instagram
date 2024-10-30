import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getFollowedPostsOf } from "@/service/posts";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getFollowedPostsOf(user.username).then((data) =>
    NextResponse.json(data),
  );
}
