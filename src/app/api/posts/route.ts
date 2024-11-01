import { type NextRequest, NextResponse } from "next/server";
import { createPost, getFollowedPostsOf } from "@/service/posts";
import { withSessionUser } from "@/util/session";

export async function GET() {
  return withSessionUser(async (user) =>
    getFollowedPostsOf(user.username).then((data) => NextResponse.json(data)),
  );
}

export async function POST(request: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await request.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Missing text or file", { status: 400 });
    }

    return createPost(user.id, text, file).then((data) =>
      NextResponse.json(data),
    );
  });
}
