"use server";
import { cookies } from "next/headers";
import { Client, Account, ID } from "node-appwrite";

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
    } else {
      console.error("Invalid form data");
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function logInUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const { account } = createAdminClient();
    const password = formData.get("password");
    if (isString(email) && isString(password)) {
      const cookieStore = await cookies();
      const user = await account.createEmailPasswordSession(email, password);
      cookieStore.set("session", user.secret);
      console.log("User logged in successfully:", user);
    } else {
      console.error("Invalid form data");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export async function logInGoogle() {}
