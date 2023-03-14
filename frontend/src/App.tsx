import { Routes, Route } from "react-router-dom"
import Start from './Pages/Start'
import Home from './Pages/Home'
import TransfersPage from './Pages/Transfers'
import CustomersPage from "./Pages/Customers"
import Navigation from './Components/Navigation'
import CustomerHistory from "./Pages/CustomerHistory"


const App: React.FC = () => (
   <Routes>
      <Route element={<Navigation />} >
         <Route path='/home' element={<Home />} />
         <Route path="customers" element={<CustomersPage />} />
         <Route path="transfers" element={<TransfersPage />} />
         <Route path="customers/:id" element={<CustomerHistory />} />
      </Route>
      <Route path='/' element={<Start />} />
      <Route path="*" element={<h1> NOT FOUND 404 </h1>} />
   </Routes>
)

export default App
