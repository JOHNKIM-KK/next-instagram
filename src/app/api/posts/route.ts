import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { createPost, getFollowedPostsOf } from "@/service/posts";
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

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await request.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return new Response("Missing text or file", { status: 400 });
  }

  return createPost(user.id, text, file).then((data) =>
    NextResponse.json(data),
  );
}
