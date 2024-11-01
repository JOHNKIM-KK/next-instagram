import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { addBookmark, removeBookmark } from "@/service/user";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id) //
      .then((res) => NextResponse.json(res)) //
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
