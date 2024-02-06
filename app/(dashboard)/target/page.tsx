import { PiTargetDuotone } from "react-icons/pi"
import { headers } from "next/headers"
import TargetTables from "@/components/TargetTables"


// const headersList = headers();
// const cookie = headersList.get('cookie');


async function getTargetData() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/target", {
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

const Target = async () => {



  const targetData = await getTargetData()

  // console.log(targetData);

  
  return (
    <div className="w-full p-4 "> {/* Add ml-16 for the margin */}
        {/* Your main content goes here */}
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <PiTargetDuotone className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Target</h1>
        </div>
        <TargetTables data={targetData} />
   
        {/* Add more content as needed */}
      </div>
  )
}

export default Target