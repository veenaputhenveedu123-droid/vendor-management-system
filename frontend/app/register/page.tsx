"use client"

import { useState } from "react"

export default function Register() {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [message,setMessage] = useState("")

  const handleSubmit = async (e:any)=>{
    e.preventDefault()

    try{

      const res = await fetch("http://127.0.0.1:8000/api/register/",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          password
        })
      })

      if(res.ok){
        setMessage("Registration Successful")
        setUsername("")
        setPassword("")
      }
      else{
        setMessage("Registration Failed")
      }

    }
    catch(error){
      setMessage("Server Error")
    }
  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Vendor Registration
        </h2>

        {message && (
          <p className="text-center text-sm text-green-600 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm mb-1">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <a href="/login" className="text-blue-600 ml-1">
            Login
          </a>
        </p>

      </div>

    </div>
  )
}