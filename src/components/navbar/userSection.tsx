import { getAuthUser, isAuthenticated } from "@/lib/authFunctions";
import UserMenu from "./userMenu";
import GuestMenu from "./guestMenu";

export default async function UserSection(){
  const loggedIn = await isAuthenticated();
  const user = await getAuthUser();

  if(!loggedIn){
    return <GuestMenu />
    
  }

  return <UserMenu user={user}/>
} 