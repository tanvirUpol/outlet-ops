import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
    return (
        <main className="text-center flex flex-col justify-center items-center h-full gap-2">
            <Image
                src="/404.svg"
                width={320}
                height={320}
                className="w-96"
                alt="Excel Image"
            />
            <p className="mt-4 text-2xl" >We could not find the page you were looking for.</p>
            <p className="mt-4 text-xl">Go back to the <Link className="underline" href="/">Dashboard</Link>.</p>
        </main>
    )
}