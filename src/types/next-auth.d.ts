import type { AuthUser } from "@/model/authUser";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
