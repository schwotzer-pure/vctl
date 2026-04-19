import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Im Dev-Dummy-Modus ist kein Session-Refresh nötig.
  if (process.env.NEXT_PUBLIC_DEV_DUMMY_AUTH === "true") return;
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
