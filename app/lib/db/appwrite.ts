"use server";
import { cookies } from "next/headers";
import { Client, Account, ID, Databases, Query } from "node-appwrite";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_APPWRITE_SECRET as string;

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}

const userClient = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const databases = new Databases(userClient);

function createAdminClient() {
  const adminClient = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

  return {
    get account() {
      return new Account(adminClient);
    },
  };
}

export async function createSessionClient() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (session) {
    userClient.setSession(session.value);
  }
  return {
    get account() {
      return new Account(userClient);
    },
  };
}

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (isString(email) && isString(password) && isString(name)) {
      const { account } = createAdminClient();
      await account.create(ID.unique(), email, password, name);
      const loginResult = await logInUser(formData);
      const uniqueId = ID.unique();

      await databases.createDocument(
        "messenger",
        "67ef817500333ae9c136",
        uniqueId,
        {
          name: name,
          email: email,
        }
      );

      return { success: true, redirect: loginResult.redirect };
    } else {
      return { success: false, error: "Invalid form data" };
    }
  } catch (error) {
    return { success: false, error };
  }
}

export async function searchUsersByPrefix(prefix: string) {
  try {
    const response = await databases.listDocuments(
      "messenger",
      "67ef817500333ae9c136",
      [Query.startsWith("name", prefix)]
    );
    return response.documents.map((doc) => ({
      name: doc.name,
      email: doc.email,
      avatar: doc.avatar_url,
    }));
  } catch (error) {
    console.log(error);
    return [];
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
      return { success: true, redirect: "/messenger" };
    } else {
      return { success: false, error: "Invalid form data" };
    }
  } catch (error) {
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
    return { success: false, error };
  }
}
