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
  return user === "" ? router.push("/") : <>{children}</>;
}

export default ProtectedRoutes;
