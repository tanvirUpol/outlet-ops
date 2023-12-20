"use client"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";
import Loading from "../loading";
// import { signIn } from "next-auth/react"

const VerifyCode = () => {
  const router = useRouter();
  const [vcode, setVcode] = useState("")
  const [user,setUser] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading,setLoading] = useState(false)

    // Retrieve user data from localStorage
    
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if(!storedUserData){
      router.push('/', { scroll: false })
    }
  
    setUser(storedUserData ? JSON.parse(storedUserData) : null)
    // console.log(storedUserData);
  }, [])
  
    

  // Parse the stored data back to an object
  // const user = storedUserData ? JSON.parse(storedUserData) : null;

  // console.log(user);
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    if(!vcode){
      setError("Type verification code!")
      return
    }
    // console.log(vcode);

    // console.log(email, password);

    setLoading(true)

    try {

      const res  = await signIn("credentials", {
        email: user.email,
        vcode,
        redirect: false
      })

      if(res?.error){
        setError("Invalid code")
        setLoading(false)
        return
      }

      router.replace("dashboard")
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
    }
  }


  if(!user){
    return <Loading/>
  }

  return (
    <div className="grid place-items-center h-screen container">
      <div className="shadow-md p-5 rounded-lg border-t-4 border-teal-500 w-[310px] sm:w-[500px]">
        <h1 className="text-xl font-bold my-4" >Enter Verification Code</h1>
        <h1 className="text-sm font-bold my-4" >Sent to: {user?.email}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* <input onChange={e=> setName(e.target.value)} type="text" value={name} placeholder="Name" /> */}
          <input className="w-full appearance-none" onChange={e=> setVcode(e.target.value)} type="number" value={vcode} placeholder="verification code" />
          {/* <input className="w-full" onChange={e=> setPassword(e.target.value)} type="password" value={password} placeholder="Password" /> */}
          <button className="bg-teal-600 text-white py-2 font-bold rounded cursor-pointer">{loading? "Loading..." : "Verify"}</button>
          { error &&
          <div>
            <p className="bg-rose-200 px-3 py-4 rounded text-rose-600 font-medium border border-red-600">{error}</p>
          </div>

          }

          {/* <Link className="text-sm font-medium" href={"/register"}>
            Dont have an account? <span className="underline text-teal-500">Register</span>
          </Link> */}
        </form>
        
      </div>
    </div>
  )
}

export default VerifyCode