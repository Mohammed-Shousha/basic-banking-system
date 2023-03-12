import React from "react"
import "./Navigation.css"
import { Link, Outlet } from "react-router-dom"


const Navigation: React.FC = () => {

   const links = [
      {
         title: "Home",
         href: "/"
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

   return (
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
}

export default Navigation