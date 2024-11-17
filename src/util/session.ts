import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { AuthUser } from "@/model/authUser";

export const withSessionUser = async (
  handler: (user: AuthUser) => Promise<Response>,
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return handler(user);
};

// test
