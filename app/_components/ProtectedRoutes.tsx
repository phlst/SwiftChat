"use client";
import React from "react";
import { useRouter } from "next/navigation";

function ProtectedRoutes({
  children,
  user,
}: {
  children: React.ReactNode;
  user: string;
}) {
  const router = useRouter();

  React.useEffect(() => {
    if (user === "") {
      router.push("/");
    }
  }, [user, router]);

  if (user === "") {
    return null; // Render nothing if user is not authenticated
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
