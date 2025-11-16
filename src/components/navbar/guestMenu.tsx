"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function GuestMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <User />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push("/signin")}>
          Sign in / Sign up
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
