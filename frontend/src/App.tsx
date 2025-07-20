import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import ProductsPage from "./pages/Products"
import CartPage from "./pages/Cart"
import Home from "./pages/Home"
import Navbar, { Footer } from "./components/Navbar"


function App() {
  return (
    <div className="min-h-screen bg-[#f6e9f7] flex flex-col">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
