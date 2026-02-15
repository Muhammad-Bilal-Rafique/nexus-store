"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react"; // Added Suspense
import { Loader2 } from "lucide-react";

// 1. The Logic Component (Inside)
function AuthCheckContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const finalDestination = searchParams.get("next") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace(finalDestination);
      }
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, session, router, finalDestination]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg-secondary gap-4">
      <Loader2 className="animate-spin text-nexus-color w-10 h-10" />
      <p className="text-gray-500 font-medium">Verifying access...</p>
    </div>
  );
}

// 2. The Main Component (The Wrapper)
export default function AuthCheck() {
  return (
    // This Suspense boundary satisfies the build error
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <AuthCheckContent />
    </Suspense>
  );
}