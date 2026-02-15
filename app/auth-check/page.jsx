"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AuthCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the original page they wanted to visit (if any), or default to home
  const finalDestination = searchParams.get("next") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.replace("/admin"); // Boss goes to Dashboard
      } else {
        router.replace(finalDestination); // Users go to Home (or where they were going)
      }
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, session, router, finalDestination]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg-secondary gap-4">
      <Loader2 className="animate-spin text-nexus-color w-10 h-10" />
    </div>
  );
}