import { Routes, Route } from "react-router-dom"
import Start from './Pages/Start'
import Home from './Pages/Home'
import Customers from './Pages/Customers'
import Transfers from './Pages/Transfers'
import Navigation from './Components/Navigation'
import './App.css'


const App: React.FC = () => (
   <>
      <Navigation />
      <Routes>
         <Route path='/start' element={<Start />} />
         <Route path='/' element={<Home />} />
         <Route path="customers" element={<Customers />} />
         <Route path="transfers" element={<Transfers />} />
         <Route path="*" element={<h1> NOT FOUND 404 </h1>} />
      </Routes>
   </>
)

export default App
