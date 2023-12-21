// import UnderConst from "@/components/underCons";
import Image from "next/image";
import { RiMapPinLine } from "react-icons/ri";

const page = () => {
    return (
        <main className="text-center h-[80dvh] flex justify-center items-center" >
        <Image
            src="/build.svg"
            width={320}
            height={320}
            // className="w-96"
            alt="under cons"
        />
    </main>
    )
}

export default page