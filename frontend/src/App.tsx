import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import ProductsPage from "./pages/Products"
import CartPage from "./pages/Cart"
import Navbar from "./components/Navbar"


function App() {
  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
