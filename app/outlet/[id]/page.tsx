import OutletInfo from "@/components/OutletInfo";
import { notFound } from "next/navigation";
import { BiSolidStore } from "react-icons/bi";


export async function generateStaticParams(){
    const res = await fetch(process.env.NEXTAUTH_URL + "/api/storeLevel")

    const data = await res.json()

    

    return data.map((item:any) =>(
        {
            id: item.outlet_code
        }
    ))
}

async function getData(id:string) {
    // console.log(id);
    
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/catLevel/${id}`, {
        next: {
            revalidate: 60
        }
    })

    if(!res.ok){
        notFound()
    }
    return res.json()
}


const page   = async ({ params }: { params: { id: string } }) => {
    const outletData = await getData(params.id)

    // console.log(outletData);

    return (
       <OutletInfo outletData={outletData} />
    )
}

export default page