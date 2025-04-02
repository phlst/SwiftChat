"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store/store";
import {
  selectIsLoggedIn,
  selectSession,
  setSession,
  setUser,
} from "../store/authSlice/auth";
import { getCurrentUser } from "../lib/db/appwrite";

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export default function useAuth(options: UseAuthOptions = {}) {
  const {
    requireAuth = false,
    redirectTo = "/",
    redirectIfFound = false,
  } = options;
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
  const session = useSelector((state: RootState) => selectSession(state));

  useEffect(() => {
    // If no session is required, or there's already a session, do nothing
    if (!requireAuth && !redirectIfFound) return;

    // If we're requiring auth and there's no session, redirect to login
    if (requireAuth && !isLoggedIn && !session) {
      router.push(redirectTo);
      return;
    }

    // If we're redirecting when a session is found and there is one, redirect
    if (redirectIfFound && (isLoggedIn || session)) {
      router.push(redirectTo);
      return;
    }

    // Check for a valid session when component mounts
    const fetchUser = async () => {
      const { success, user } = await getCurrentUser();
      if (success && user) {
        dispatch(setUser(user));
        dispatch(setSession(user.$id)); // or appropriate session ID

        if (redirectIfFound) {
          router.push(redirectTo);
        }
      } else if (requireAuth) {
        router.push(redirectTo);
      }
    };

    fetchUser();
  }, [
    requireAuth,
    redirectIfFound,
    redirectTo,
    isLoggedIn,
    session,
    router,
    dispatch,
  ]);

  return { isLoggedIn, session };
}
