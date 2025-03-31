"use server";

import { signIn } from "@/app/auth";

export async function signInGoogle() {
  await signIn("google");
}
