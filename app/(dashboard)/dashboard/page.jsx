import Dashboard from "@/components/Dashboard";
import { headers } from "next/headers"


// const headersList = headers();
// const cookie = headersList.get('cookie');


async function getStoreLevelData() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/storeLevel", {
    // headers: {
    //   'Cookie': cookie
    // },
    headers:new Headers(headers()),
    next: {
      revalidate: 60
    },
    method: "GET",
    
  })
  return res.json()
}


async function getSameStoreData() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/sameStore", {
    next: {
      revalidate: 60
    },
    method: "GET",
    
  })
  return res.json()
}



export default async function Home() {
  const data = await getStoreLevelData()
  const sameStoreData = await getSameStoreData()
  // console.log(data[0]);

  return (
    <Dashboard data={data} sameStoreData={sameStoreData} />
  )
}
