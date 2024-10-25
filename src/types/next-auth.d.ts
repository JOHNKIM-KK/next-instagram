import type { User } from "@/model/user";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
