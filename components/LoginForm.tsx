"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';

// import { signIn } from "next-auth/react"

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!email || !password) {
      setError("All fields are necessary!")
      return
    }


    try {
      console.log(email, password);
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
      <div className="shadow-md p-5 rounded-lg border-t-4 border-slate-600 w-[300px] sm:w-[500px]">
        <h1 className="text-xl font-bold my-4" >Sign In to your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* <input onChange={e=> setName(e.target.value)} type="text" value={name} placeholder="Name" /> */}
          <input className="w-full" onChange={e => setEmail(e.target.value)} type="text" value={email} placeholder="Email" />
          <div className="relative">

            <input
              className="w-full"
              onChange={e => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
          <button className="bg-slate-600 text-white py-2 font-bold rounded cursor-pointer">
            <p>
              {loading ? "Loading..." : "Login"}
            </p>
          </button>
          {error &&
            <div>
              <p className="bg-rose-50 px-3 py-4 rounded text-rose-600 font-medium border border-red-600/50 border-dashed">{error}</p>
            </div>

          }

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