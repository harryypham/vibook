import Link from "next/link"
import React from "react"

import { queryRandomBooks } from "@/api/database"

const Dashboard = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl'>Dashboard</h1>
      <p>
        Nothing yet. Return to{" "}
        <Link
          href='/'
          className='underline'
        >
          Homepage
        </Link>
      </p>
    </div>
  )
}

export default Dashboard
