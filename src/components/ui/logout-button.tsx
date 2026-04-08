"use client";

import { logout } from "@/lib/supabase/auth-actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button variant="secondary" type="submit">
        Sign out
      </Button>
    </form>
  );
}
