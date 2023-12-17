import OutletInfo from "@/components/OutletInfo";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
    const res = await fetch(process.env.NEXTAUTH_URL + "/api/storeLevel")
    const data = await res.json()

    return data.map((item: any) => (
        {
            id: item.outlet_code
        }
    ))
}

async function getData(id: string) {

    const res = await fetch(process.env.NEXTAUTH_URL + `/api/catLevel/${id}`, {
        next: {
            revalidate: 60
        }
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}


const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { outletData, benchOutletData } = await getData(id)

    return (<>

        {outletData?.length > 0 && <OutletInfo outletData={outletData} benchOutletData={benchOutletData} />}

    </>
    )
}

export default page