"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { createUser, getCurrentUser } from "../lib/db/appwrite";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  selectIsLoggedIn,
  selectSession,
  setSession,
  setUser,
} from "../store/authSlice/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
  const session = useSelector((state: RootState) => selectSession(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      if (session || isLoggedIn) {
        router.push("/messenger");
      } else {
        const { success, user } = await getCurrentUser();
        if (success && user) {
          dispatch(setUser(user));
          dispatch(setSession(user.$id));
          router.push("/messenger");
        }
      }
    };

    checkSession();
  }, [router, session, isLoggedIn, dispatch]);

  const handleRegistration = async (formData: FormData) => {
    await createUser(formData);
    // The server action (createUser) internally calls logInUser which has the redirect logic
  };

  return (
    <div className="w-screen flex justify-center items-center h-screen bg-zinc-800">
      <div className="md:h-[70%] md:w-[70%] h-full w-full flex rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full md:w-[50%] h-full bg-white flex flex-col justify-center p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
            <p className="text-gray-500">Create a new account to get started</p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleRegistration(formData);
            }}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <form>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign up with Google</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-[50%] h-full relative">
          <Image
            src="/images/LoginBackground.jpeg"
            fill={true}
            alt="backgroundImage"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Join Us</h1>
            <p className="text-lg text-center mb-6">
              Create an account and start your journey with us today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
