import LoginForm from "@/components/LoginForm";

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/option";

export default async function Home(){
  
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <div>
      <LoginForm/>
    </div>
  )
}
