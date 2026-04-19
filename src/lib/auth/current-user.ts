import { createClient } from "@/lib/supabase/server";

export type SystemRolle = "mitglied" | "trainer" | "admin";

export type CurrentUser = {
  id: string;
  email: string;
  display_name: string | null;
  rolle: SystemRolle;
};

const DUMMY_USER: CurrentUser = {
  id: "00000000-0000-0000-0000-000000000000",
  email: "dev@vctl.local",
  display_name: "Dev Admin",
  rolle: "admin",
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (process.env.NEXT_PUBLIC_DEV_DUMMY_AUTH === "true") {
    return DUMMY_USER;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, display_name, rolle")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return {
    id: user.id,
    email: profile.email,
    display_name: profile.display_name,
    rolle: profile.rolle as SystemRolle,
  };
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || (user.rolle !== "admin" && user.rolle !== "trainer")) {
    throw new Error("Unauthorized");
  }
  return user;
}
