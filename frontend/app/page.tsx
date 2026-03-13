"use client"

import Link from "next/link"

export default function Home(){

  return(

    <div style={container}>

      <div style={card}>

        <h1 style={title}>Vendor Management System</h1>

        <p style={subtitle}>
          Manage your products easily with our vendor dashboard
        </p>

        <div style={buttonContainer}>

          <Link href="/register" style={registerBtn}>
            Register
          </Link>

          <Link href="/login" style={loginBtn}>
            Login
          </Link>

        </div>

      </div>

    </div>

  )
}

const container = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#f4f6f9",
  fontFamily:"Arial"
}

const card = {
  background:"white",
  padding:"40px",
  borderRadius:"10px",
  boxShadow:"0 4px 12px rgba(0,0,0,0.1)",
  textAlign:"center",
  width:"350px"
}

const title = {
  marginBottom:"10px"
}

const subtitle = {
  color:"#666",
  marginBottom:"25px"
}

const buttonContainer = {
  display:"flex",
  flexDirection:"column",
  gap:"12px"
}

const registerBtn = {
  background:"#2c7be5",
  color:"white",
  padding:"10px",
  borderRadius:"6px",
  textDecoration:"none"
}

const loginBtn = {
  background:"#27ae60",
  color:"white",
  padding:"10px",
  borderRadius:"6px",
  textDecoration:"none"
}
