import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import Signin from "@/components/Signin";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin or Login to Instagram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const SignPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className={"flex justify-center mt-24"}>
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
};

export default SignPage;
