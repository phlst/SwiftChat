"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function ProtectedRoutes({
  children,
  user,
}: {
  children: React.ReactNode;
  user: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (user === "") {
      router.push("/");
    }
  }, [router, user]);

  return <>{children}</>;
}

export default ProtectedRoutes;
