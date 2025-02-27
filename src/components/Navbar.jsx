import { Bell } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className="px-5 py-3 shadow-sm w-full z-10">
      <nav className="flex items-center justify-end">
        <Link to="/notifications">
          <Bell />
        </Link>
      </nav>
    </header>
  )
}

export default Navbar