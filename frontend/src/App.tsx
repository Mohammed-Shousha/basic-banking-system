import { Routes, Route } from "react-router-dom"
import Start from './Pages/Start'
import Home from './Pages/Home'
import Transfers from './Pages/Transfers'
import Navigation from './Components/Navigation'
import CustomersPage from "./Pages/Customers"
import CustomerHistory from "./Pages/CustomerHistory"
import './App.css'


const App: React.FC = () => (
   <>
      <Routes>
         <Route element={<Navigation />} >
            <Route path='/' element={<Home />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="customers/:id" element={<CustomerHistory />} />
         </Route>
         <Route path='/start' element={<Start />} />
         <Route path="*" element={<h1> NOT FOUND 404 </h1>} />
      </Routes>
   </>
)

export default App
