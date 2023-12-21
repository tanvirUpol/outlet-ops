"use server"

import Dashboard from "@/components/Dashboard";
import { headers } from "next/headers"


const headersList = headers();
const cookie = headersList.get('cookie');


async function getStoreLevelData() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/storeLevel", {
    headers: {
      'Cookie': cookie
    },
    next: {
      revalidate: 60
    },
    method: "GET",
    
  })
  return res.json()
}


export default async function Home() {
  const data = await getStoreLevelData()
  // console.log(data[0]);

  return (
    <Dashboard data={data} />
  )
}
