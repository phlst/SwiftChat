"use server";
import { Client, Account, ID } from "node-appwrite";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;
const API_KEY = process.env.NEXT_APPWRITE_API_KEY as string;

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

function createSession() {
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

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
      const user = await account.createEmailPasswordSession(email, password);
      console.log("User logged in successfully:", user);
    } else {
      console.error("Invalid form data");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// export async function logInGoogle() {}
