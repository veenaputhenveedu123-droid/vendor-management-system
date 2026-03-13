import Link from "next/link"

export default function Home(){
  return(

    <div>

      <h1>Vendor Management System</h1>

      <Link href="/register">Register</Link>
        < br/>
        <Link href="/login">Login</Link>

    </div>

  )
}