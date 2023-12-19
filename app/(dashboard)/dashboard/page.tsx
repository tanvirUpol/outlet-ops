import Dashboard from "@/components/Dashboard";

async function getStoreLevelData() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/storeLevel", {
    next: {
      revalidate: 60
    }
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
