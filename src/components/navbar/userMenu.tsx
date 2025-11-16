"use client";

import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,  DropdownMenuShortcut,  DropdownMenuTrigger } from "../ui/dropdown-menu";
import logOut from "@/actions/logout";

export default function UserMenu({ user }: { user: { name: string ,email:string} }){

  const logoutAction = async () => {
    try {
      await logOut();
      
    } catch (error:unknown) {
      console.error("Logout failed", error);
      
    }
  }
  console.log("user data is: ",user);
  // const getUserInitials = (name:string) => {
  //   return name
  //     .split(" ")
  //     .map((word:string) => word.charAt(0))
  //     .join("")
  //     .toUpperCase()
  //     .slice(0, 2);
  // }

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {user.name}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>{user.email}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuShortcut/>
        <DropdownMenuItem onClick={logoutAction}>
          <LogOutIcon/>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}