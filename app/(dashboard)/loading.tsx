import { CgSpinnerTwo } from "react-icons/cg";

export default function Loading() {
  return (
    <main className="text-center h-screen flex justify-center items-center" >
        <CgSpinnerTwo className="animate-spin w-8 h-8" />
    </main>
  )
}
