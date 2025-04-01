"use server";
import { Client, Account, ID, OAuthProvider } from "node-appwrite";

// Initialize the Appwrite client
const client = new Client();

const ENDPOINT = process.env.PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.PUBLIC_APPWRITE_PROJECT;
const API_KEY = process.env.APPWRITE_API_KEY;

client
  .setEndpoint(ENDPOINT) // Your Appwrite Endpoint
  .setKey(API_KEY)
  .setProject(PROJECT_ID); // Your project ID

const account = new Account(client);

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (isString(email) && isString(password) && isString(name)) {
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
