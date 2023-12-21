import Image from "next/image"
import Link from "next/link"

export default function UnderConst() {
    return (
        <main className="text-center h-screen flex justify-center items-center" >
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
