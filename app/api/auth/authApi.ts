"use server";

import { signIn } from "@/app/auth";

export async function signInGoogle() {
  await signIn("google");
}

export async function signInFacebook() {
  await signIn("facebook");
}

export async function signInGithub() {
  await signIn("github");
}
