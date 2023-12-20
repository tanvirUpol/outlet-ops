"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';

// import { signIn } from "next-auth/react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // console.log();

    if (!email || !password) {
      setError("All fields are necessary!")
      return
    }

    // console.log(email, password);



    // try {
    //   const res  = await signIn("credentials", {
    //     email,
    //     password,
    //     redirect: false
    //   })

    //   if(res.error){
    //     setError("Invalid credentials")
    //     setLoading(false)
    //     return
    //   }

    //   router.replace("dashboard")
    //   setLoading(false)

    // } catch (error) {
    //   setLoading(false)
    // }



    try {
      console.log(email,password);
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const json = await res.json()
      // console.log(json);

      if (res.ok) {
        console.log("Logged in!");
        console.log(json);
        // Save the user data in localStorage
        localStorage.setItem('user', JSON.stringify(json))
        setEmail("")
        setPassword("")
        setError("")
        setLoading(false)
        router.push('/verify', { scroll: false })

      } else {
        console.log("submission failed");
        toast.error('Login Attempt Failed!')
        setLoading(false)
        // setEmail("")
        // setError("")
        setError(json.message)
      }

    } catch (error) {
      console.log("registration failed with:", error);
      setLoading(false)

    }
  }

  return (
    <div className="grid place-items-center h-screen container">
      <div className="shadow-md p-5 rounded-lg border-t-4 border-teal-500 w-[300px] sm:w-[500px]">
        <h1 className="text-xl font-bold my-4" >Login Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* <input onChange={e=> setName(e.target.value)} type="text" value={name} placeholder="Name" /> */}
          <input className="w-full" onChange={e => setEmail(e.target.value)} type="text" value={email} placeholder="Email" />
          <input className="w-full" onChange={e => setPassword(e.target.value)} type="password" value={password} placeholder="Password" />
          <button className="bg-teal-600 text-white py-2 font-bold rounded cursor-pointer">{loading ? "Loading..." : "Login"}</button>
          {error &&
            <div>
              <p className="bg-rose-50 px-3 py-4 rounded text-rose-600 font-medium border border-red-600/50 border-dashed">{error}</p>
            </div>

          }

          {/* <Link className="text-sm font-medium" href={"/register"}>
            Dont have an account? <span className="underline text-teal-500">Register</span>
          </Link> */}
        </form>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default LoginForm