import React from "react"
import { Link, Outlet } from "react-router-dom"
import "./Navigation.css"

const links = [
   {
      title: "Home",
      href: "/home"
   },
   {
      title: "Customers",
      href: "/customers"
   },
   {
      title: "Transfers",
      href: "/transfers"
   }
]

const Navigation: React.FC = () => (
   <>
      <nav>
         <ul>
            {links.map((link) => (
               <li key={link.title}>
                  <Link to={link.href}>{link.title}</Link>
               </li>
            ))}
         </ul>
      </nav>
      <Outlet />
   </>
)

export default Navigation