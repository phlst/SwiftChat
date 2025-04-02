"use server";
import { cookies } from "next/headers";
import { Client, Account, ID } from "node-appwrite";
import { redirect } from "next/navigation";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_APPWRITE_SECRET as string;

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}

function createAdminClient() {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createSessionClient() {
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (session) {
    client.setSession(session.value);
  }
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (isString(email) && isString(password) && isString(name)) {
      const { account } = await createAdminClient();
      const user = await account.create(ID.unique(), email, password, name);
      await logInUser(formData);
      console.log("User created successfully:", user);
      return { success: true };
    } else {
      console.error("Invalid form data");
      return { success: false, error: "Invalid form data" };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error };
  }
}

export async function logInUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const { account } = createAdminClient();
    const password = formData.get("password");
    if (isString(email) && isString(password)) {
      const cookieStore = await cookies();
      const session = await account.createEmailPasswordSession(email, password);
      cookieStore.set("session", session.secret);
      console.log("User logged in successfully:", session);
      redirect("/messenger");
    } else {
      console.error("Invalid form data");
      return { success: false, error: "Invalid form data" };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, error };
  }
}

export async function logInGoogle() {}

export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return { success: true, user };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { success: false, error };
  }
}

export async function logoutUser() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    const cookieStore = cookies();
    (await cookieStore).delete("session");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }
}
