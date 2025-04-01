"use server";
import { Client, Account, ID, OAuthProvider } from "appwrite";
import { cookies } from "next/headers";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("67eada88000c043ff1cf"); // Your project ID

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
      cookies().set("session", user.secret, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      console.log("User logged in successfully:", user);
    } else {
      console.error("Invalid form data");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export async function googleLogIn() {
  account.createOAuth2Session(
    OAuthProvider.Google,
    "http://localhost:3000/messenger",
    "http://localhost:3000/fail"
  );
}
