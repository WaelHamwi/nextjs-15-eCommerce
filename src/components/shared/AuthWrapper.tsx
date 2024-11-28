import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth";


type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    const currentUrl = window.location.pathname;
    if (!session && currentUrl !== "/auth") {
      router.push("/auth/login");
    }
  }, [session, status, router]);



  return <>{children}</>;
};

export default AuthWrapper;
