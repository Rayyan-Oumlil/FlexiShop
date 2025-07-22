import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import ProductsPage from "./pages/Products"
import CartPage from "./pages/Cart"
import Home from "./pages/Home"
import Navbar, { Footer } from "./components/Navbar"
import AboutUs from "./pages/AboutUs"
import Careers from "./pages/Careers"
import Partner from "./pages/Partner"
import ContactUs from "./pages/ContactUs"
import AccountManagement from "./pages/AccountManagement"
import CancelOrder from "./pages/CancelOrder"
import Support from "./pages/Support"
import FAQ from "./pages/FAQ"
import Favorites from "./pages/Favorites"
import Blog from "./pages/Blog"
import BlogArticle from "./pages/BlogArticle"
import ProductDetail from "./pages/ProductDetail"
import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";

function App() {
  return (
    <div className="min-h-screen bg-[#f6e9f7] flex flex-col">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/cancel-order" element={<CancelOrder />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
